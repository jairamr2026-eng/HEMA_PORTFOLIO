"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

interface JellyfishInstanceConfig {
  id: number;
  baseX: number;
  initialY: number;
  baseZ: number;
  scale: number;
  upwardSpeed: number;
  animSpeed: number;
  swayFreq: number;
  swayAmp: number;
  pulseFreq: number;
  phaseOffset: number;
  tiltAngle: number;
  tintColor: string;
  glowColor: string;
}

// 5 delicately scaled deep-sea jellyfish distributed at varying depths and horizontal locations
const SMALL_JELLYFISH_CONFIGS: JellyfishInstanceConfig[] = [
  {
    id: 1,
    baseX: -3.2,
    initialY: -2.5,
    baseZ: -2.2,
    scale: 0.18,
    upwardSpeed: 0.42,
    animSpeed: 0.95,
    swayFreq: 0.7,
    swayAmp: 0.25,
    pulseFreq: 1.8,
    phaseOffset: 0.4,
    tiltAngle: 0.08,
    tintColor: "#A8C4E8",
    glowColor: "#4A6FA5",
  },
  {
    id: 2,
    baseX: -1.6,
    initialY: 1.2,
    baseZ: -3.4,
    scale: 0.13,
    upwardSpeed: 0.35,
    animSpeed: 0.85,
    swayFreq: 0.55,
    swayAmp: 0.2,
    pulseFreq: 1.5,
    phaseOffset: 1.9,
    tiltAngle: -0.06,
    tintColor: "#B5D0F5",
    glowColor: "#3D6298",
  },
  {
    id: 3,
    baseX: -0.4,
    initialY: -4.2,
    baseZ: -1.8,
    scale: 0.22,
    upwardSpeed: 0.52,
    animSpeed: 1.05,
    swayFreq: 0.8,
    swayAmp: 0.3,
    pulseFreq: 2.1,
    phaseOffset: 3.2,
    tiltAngle: 0.04,
    tintColor: "#9BBDE6",
    glowColor: "#4E74B0",
  },
  {
    id: 4,
    baseX: 1.8,
    initialY: -0.8,
    baseZ: -2.8,
    scale: 0.16,
    upwardSpeed: 0.38,
    animSpeed: 0.9,
    swayFreq: 0.65,
    swayAmp: 0.22,
    pulseFreq: 1.7,
    phaseOffset: 4.5,
    tiltAngle: -0.09,
    tintColor: "#C0D6F8",
    glowColor: "#5878B8",
  },
  {
    id: 5,
    baseX: 3.3,
    initialY: 2.8,
    baseZ: -2.0,
    scale: 0.2,
    upwardSpeed: 0.46,
    animSpeed: 1.0,
    swayFreq: 0.75,
    swayAmp: 0.28,
    pulseFreq: 1.9,
    phaseOffset: 5.7,
    tiltAngle: -0.05,
    tintColor: "#ABC7EB",
    glowColor: "#446AA0",
  },
];

function SingleSmallJellyfish({
  config,
  masterScene,
  animations,
}: {
  config: JellyfishInstanceConfig;
  masterScene: THREE.Group;
  animations: THREE.AnimationClip[];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const currentY = useRef(config.initialY);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  // Clone the rigged hierarchy independently for this instance
  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(masterScene) as THREE.Group;

    // Apply translucent deep-ocean shader response to all meshes in the clone
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        if (mesh.material) {
          // Clone material so instances don't cross-contaminate opacities
          const orig = Array.isArray(mesh.material)
            ? mesh.material[0]
            : mesh.material;
          const mat = orig.clone() as THREE.MeshStandardMaterial;

          mat.transparent = true;
          mat.depthWrite = false;
          mat.side = THREE.DoubleSide;

          const name = mesh.name.toLowerCase();
          if (
            name.includes("edge") ||
            name.includes("highlight") ||
            name.includes("ridge") ||
            name.includes("fringes")
          ) {
            mat.color = new THREE.Color("#EBF3FF");
            mat.opacity = 0.82;
            mat.emissive = new THREE.Color(config.glowColor);
            mat.emissiveIntensity = 0.35;
          } else if (name.includes("canal") || name.includes("gonad")) {
            mat.color = new THREE.Color(config.tintColor);
            mat.opacity = 0.68;
            mat.emissive = new THREE.Color(config.glowColor);
            mat.emissiveIntensity = 0.4;
          } else if (name.includes("tentacle") || name.includes("arm")) {
            mat.color = new THREE.Color("#9CB6DC");
            mat.opacity = 0.52;
            mat.emissive = new THREE.Color(config.glowColor);
            mat.emissiveIntensity = 0.18;
          } else {
            // Main translucent bell
            mat.color = new THREE.Color(config.tintColor);
            mat.opacity = 0.38;
            mat.emissive = new THREE.Color(config.glowColor);
            mat.emissiveIntensity = 0.15;
            mat.roughness = 0.18;
          }

          mesh.material = mat;
        }
      }
    });

    return clone;
  }, [masterScene, config.tintColor, config.glowColor]);

  // Set up animation mixer
  useEffect(() => {
    if (!clonedScene || animations.length === 0) return;

    const mixer = new THREE.AnimationMixer(clonedScene);
    mixerRef.current = mixer;

    const swimClip =
      animations.find(
        (clip) =>
          clip.name.toLowerCase().includes("swim") ||
          clip.name.toLowerCase().includes("loop")
      ) || animations[0];

    if (swimClip) {
      const action = mixer.clipAction(swimClip);
      action.setEffectiveTimeScale(config.animSpeed);
      // Stagger animation timing so small jellyfish don't pulse synchronously
      action.time = (config.phaseOffset * 1.3) % swimClip.duration;
      action.play();
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [clonedScene, animations, config.animSpeed, config.phaseOffset]);

  // Upward motion loop with realistic propulsion stroke and lateral ocean current sway
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Update skeletal swim animation
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    const t = state.clock.getElapsedTime();
    const phaseTime = t * config.pulseFreq + config.phaseOffset;

    // Propulsion surge: jellyfish push harder during bell contraction
    const strokeSurge = Math.max(0, Math.sin(phaseTime));
    const effectiveSpeed = config.upwardSpeed * (0.75 + strokeSurge * 0.65);

    // Continuous upward travel
    currentY.current += effectiveSpeed * delta;

    // Wrap around smoothly when ascending past the top boundary
    const TOP_BOUND = 5.2;
    const BOTTOM_BOUND = -5.4;
    if (currentY.current > TOP_BOUND) {
      currentY.current = BOTTOM_BOUND;
    }

    // Gentle horizontal water current sway
    const currentX =
      config.baseX +
      Math.sin(t * config.swayFreq + config.phaseOffset) * config.swayAmp;

    // Gentle depth drift
    const currentZ =
      config.baseZ + Math.cos(t * 0.45 + config.phaseOffset) * 0.15;

    // Natural orientation: slight pitch and roll swaying with the water
    const roll = Math.sin(t * 1.1 + config.phaseOffset) * 0.08 + config.tiltAngle;
    const pitch = Math.cos(t * 0.8 + config.phaseOffset) * 0.06;

    groupRef.current.position.set(currentX, currentY.current, currentZ);
    groupRef.current.rotation.set(pitch, config.tiltAngle * 2, roll);
  });

  return (
    <group ref={groupRef} scale={config.scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function SmallJellyfishSwarm() {
  const gltf = useGLTF("/jellyfish_animated_3d.glb");

  return (
    <group name="small-jellyfish-swarm">
      {SMALL_JELLYFISH_CONFIGS.map((cfg) => (
        <SingleSmallJellyfish
          key={cfg.id}
          config={cfg}
          masterScene={gltf.scene}
          animations={gltf.animations}
        />
      ))}
    </group>
  );
}
