"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { pointerState } from "@/hooks/usePointerTracking";

// Vertex shader for the deep ocean background quad
const oceanVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

// Fragment shader: multi-layered deep ocean background with caustics and light rays
const oceanFragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  // Simplex-like noise helper
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                   dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
               mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                   dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
  }

  // Realistic animated underwater caustic pattern
  float causticPattern(vec2 uv, float t) {
    vec2 p = uv * 3.8;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.007;

    for (int n = 0; n < 3; n++) {
      float tOffset = t * (0.42 - (0.12 / float(n + 1)));
      i = p + vec2(cos(tOffset - i.x) + sin(tOffset + i.y), sin(tOffset - i.y) + cos(tOffset + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + tOffset) / inten), p.y / (cos(i.y + tOffset) / inten)));
    }
    c /= 3.0;
    c = 1.15 - pow(clamp(c, 0.0, 1.0), 1.35);
    return clamp(pow(abs(c), 7.0), 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.45;

    // 1. Base deep-ocean gradient: abyssal navy-black to dark midnight indigo
    // Top is closer to surface light; bottom descends into pitch abyss
    vec3 deepAbyss = vec3(0.003, 0.006, 0.018);       // #010205
    vec3 midOcean  = vec3(0.012, 0.028, 0.065);       // #030711
    vec3 upperOcean = vec3(0.024, 0.055, 0.115);      // #060e1d
    vec3 surfaceWash = vec3(0.045, 0.095, 0.185);     // #0b182f

    // Vertical gradient with slight curvature
    float depthFactor = uv.y + sin(uv.x * 2.0 + time * 0.2) * 0.04;
    vec3 baseColor = mix(deepAbyss, midOcean, smoothstep(0.0, 0.45, depthFactor));
    baseColor = mix(baseColor, upperOcean, smoothstep(0.4, 0.85, depthFactor));
    baseColor = mix(baseColor, surfaceWash, smoothstep(0.8, 1.15, depthFactor));

    // 2. Slow moving blue and violet light washes (oceanic water currents)
    float wash1 = sin(uv.x * 2.4 - uv.y * 1.8 + time * 0.5) * 0.5 + 0.5;
    float wash2 = cos(uv.x * 1.6 + uv.y * 2.2 - time * 0.35) * 0.5 + 0.5;
    vec3 violetWash = vec3(0.028, 0.018, 0.055) * wash1 * smoothstep(0.15, 0.9, uv.y);
    vec3 cyanWash = vec3(0.015, 0.042, 0.075) * wash2 * smoothstep(0.3, 1.0, uv.y);
    baseColor += violetWash + cyanWash;

    // 3. Slanted animated god rays (sunlight filtering from surface)
    // Angled at ~-35 degrees from top-right to bottom-left
    vec2 rayCoords = vec2(uv.x * 1.8 - uv.y * 0.75, uv.y);
    float rays = sin(rayCoords.x * 5.0 + sin(rayCoords.x * 2.0 + time * 0.4) * 1.2);
    rays += sin(rayCoords.x * 8.5 - time * 0.6) * 0.6;
    rays += sin(rayCoords.x * 14.0 + time * 0.8) * 0.3;
    rays = clamp(rays * 0.5 + 0.5, 0.0, 1.0);
    // Attenuate rays: stronger near top, fade into deep abyss
    float rayIntensity = pow(rays, 2.2) * smoothstep(-0.1, 1.0, uv.y) * 0.09;
    vec3 rayColor = vec3(0.45, 0.68, 0.95) * rayIntensity;
    baseColor += rayColor;

    // 4. Subtle moving caustic patterns across the background
    vec2 causticUv1 = uv + vec2(time * 0.015, -time * 0.01);
    vec2 causticUv2 = uv * 1.25 + vec2(-time * 0.018, time * 0.012) + 0.5;
    float c1 = causticPattern(causticUv1, time);
    float c2 = causticPattern(causticUv2, time * 0.9 + 1.5);
    float caustics = (c1 * 0.65 + c2 * 0.35);
    // Fade caustics with depth so bottom is darker
    caustics *= smoothstep(0.1, 0.95, uv.y) * 0.085;
    vec3 causticColor = vec3(0.55, 0.78, 1.0) * caustics;
    baseColor += causticColor;

    // 5. Subtle cursor water wash influence
    vec2 pointerUv = uPointer * 0.5 + 0.5;
    float distToCursor = length(uv - pointerUv);
    float cursorGlow = smoothstep(0.45, 0.0, distToCursor) * 0.025;
    baseColor += vec3(0.2, 0.45, 0.85) * cursorGlow;

    // 6. Natural soft vignette to maintain dark elegant perimeter
    float vignette = 1.0 - length((uv - 0.5) * 1.15);
    vignette = clamp(vignette, 0.4, 1.0);
    baseColor *= vignette;

    gl_FragColor = vec4(baseColor, 1.0);
  }
`;

// Volumetric Light Beams component: angled planes casting soft ethereal light shafts
function VolumetricLightBeams() {
  const groupRef = useRef<THREE.Group>(null);

  const beams = useMemo(() => {
    return [
      { pos: [-2.5, 4.2, -4.5] as [number, number, number], rot: [-0.15, 0.2, -0.42] as [number, number, number], scale: [2.8, 11, 1] as [number, number, number], speed: 0.28, phase: 0 },
      { pos: [1.2, 4.8, -3.8] as [number, number, number], rot: [-0.12, 0.15, -0.38] as [number, number, number], scale: [3.4, 12, 1] as [number, number, number], speed: 0.32, phase: 2.1 },
      { pos: [4.5, 4.0, -5.0] as [number, number, number], rot: [-0.18, 0.1, -0.45] as [number, number, number], scale: [2.5, 10, 1] as [number, number, number], speed: 0.24, phase: 4.3 },
    ];
  }, []);

  const beamMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uPhase: { value: 0 },
        uColor: { value: new THREE.Color("#4a7ebd") }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uPhase;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          // Soft beam profile: bright top, fading downwards, soft edges
          float horizontalEdge = sin(vUv.x * 3.1415926);
          float verticalFade = pow(1.0 - vUv.y, 1.8);
          float shimmer = sin(uTime * 0.8 + uPhase + vUv.y * 3.0) * 0.15 + 0.85;
          float alpha = horizontalEdge * verticalFade * shimmer * 0.055;
          gl_FragColor = vec4(uColor, alpha);
        }
      `
    });
  }, []);

  useFrame((state) => {
    beamMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group ref={groupRef}>
      {beams.map((b, i) => (
        <mesh
          key={i}
          position={b.pos}
          rotation={b.rot}
          scale={b.scale}
          material={beamMaterial}
        >
          <planeGeometry args={[1, 1, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}

export function OceanAtmosphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPointer.value.set(pointerState.x, pointerState.y);
    }
  });

  return (
    <group>
      {/* Deep Ocean Backplane: Positioned far behind the scene, covering viewport frustum */}
      <mesh ref={meshRef} position={[0, 0, -8]} scale={[32, 22, 1]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={oceanVertexShader}
          fragmentShader={oceanFragmentShader}
          uniforms={uniforms}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>

      {/* Volumetric god rays drifting through the deep water */}
      <VolumetricLightBeams />
    </group>
  );
}
