"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { pointerState } from "@/hooks/usePointerTracking";

interface AbyssalParticlesProps {
  count?: number; // Total count can be adapted
}

export function AbyssalParticles({ count = 180 }: AbyssalParticlesProps) {
  const dustRef = useRef<THREE.Points>(null);
  const bubblesRef = useRef<THREE.Points>(null);
  const bioRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Partition particle counts into 3 distinct natural marine layers
  const dustCount = Math.floor(count * 0.65); // ~117 fine organic marine dust
  const bubbleCount = Math.floor(count * 0.22); // ~40 rising micro-bubbles
  const bioCount = count - dustCount - bubbleCount; // ~23 bioluminescent deep-sea motes

  // 1. Marine Dust data
  const dustData = useMemo(() => {
    const positions = new Float32Array(dustCount * 3);
    const baseVelocities = new Float32Array(dustCount * 3);
    const phases = new Float32Array(dustCount);
    const scales = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      // Wide 3D dispersion throughout deep water volume
      positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1.0;

      // Slow lateral oceanic current drift (primarily rightward with slight vertical eddy)
      baseVelocities[i * 3 + 0] = (Math.random() * 0.04 + 0.015) * (Math.random() > 0.3 ? 1 : -0.5);
      baseVelocities[i * 3 + 1] = (Math.random() - 0.4) * 0.02;
      baseVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

      phases[i] = Math.random() * Math.PI * 2;
      scales[i] = Math.random() * 0.6 + 0.4;
    }

    return { positions, baseVelocities, phases, scales };
  }, [dustCount]);

  // 2. Rising Micro-Bubbles data
  const bubbleData = useMemo(() => {
    const positions = new Float32Array(bubbleCount * 3);
    const riseSpeeds = new Float32Array(bubbleCount);
    const wobbleFreqs = new Float32Array(bubbleCount);
    const wobbleAmps = new Float32Array(bubbleCount);

    for (let i = 0; i < bubbleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.5;

      // Buoyant rise: upward motion with gentle varied speeds
      riseSpeeds[i] = Math.random() * 0.18 + 0.12;
      wobbleFreqs[i] = Math.random() * 1.5 + 1.2;
      wobbleAmps[i] = Math.random() * 0.016 + 0.008;
    }

    return { positions, riseSpeeds, wobbleFreqs, wobbleAmps };
  }, [bubbleCount]);

  // 3. Bioluminescent deep motes data
  const bioData = useMemo(() => {
    const positions = new Float32Array(bioCount * 3);
    const pulseRates = new Float32Array(bioCount);
    const pulsePhases = new Float32Array(bioCount);

    for (let i = 0; i < bioCount; i++) {
      // Concentrated closer to the jellyfish's natural swimming volume
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10 + 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      pulseRates[i] = Math.random() * 1.2 + 0.8;
      pulsePhases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, pulseRates, pulsePhases };
  }, [bioCount]);

  // Fluid impulse offsets applied by cursor water displacement
  const dustDisplacements = useRef(new Float32Array(dustCount * 2));

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const clampedDelta = Math.min(delta, 0.05);

    // Compute cursor position in approximate 3D world plane (at z = 0)
    const cursorWorldX = pointerState.x * (viewport.width / 2);
    const cursorWorldY = pointerState.y * (viewport.height / 2);

    // Subtle group-level parallax with cursor
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointerState.x * 0.25,
        clampedDelta * 2.0
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        pointerState.y * 0.18,
        clampedDelta * 2.0
      );
    }

    // A. Update Marine Dust
    if (dustRef.current) {
      const pos = dustRef.current.geometry.attributes.position.array as Float32Array;
      const disp = dustDisplacements.current;

      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        // Underwater turbulence + constant current drift
        const phase = dustData.phases[i];
        const driftX = dustData.baseVelocities[i3 + 0] + Math.sin(time * 0.35 + phase) * 0.008;
        const driftY = dustData.baseVelocities[i3 + 1] + Math.cos(time * 0.45 + phase) * 0.006;
        const driftZ = dustData.baseVelocities[i3 + 2];

        // Cursor water disturbance: if cursor approaches particle, push away smoothly
        const dx = pos[i3 + 0] - cursorWorldX;
        const dy = pos[i3 + 1] - cursorWorldY;
        const distSq = dx * dx + dy * dy;
        const repulsionRadiusSq = 4.8; // ~2.2 world units

        if (distSq < repulsionRadiusSq && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1.0 - dist / 2.2) * 0.8;
          // Fluid push + slight tangential swirl
          disp[i2 + 0] += (dx / dist) * force * clampedDelta * 1.8 - (dy / dist) * force * clampedDelta * 0.6;
          disp[i2 + 1] += (dy / dist) * force * clampedDelta * 1.8 + (dx / dist) * force * clampedDelta * 0.6;
        }

        // Viscous fluid dampening of displacement
        disp[i2 + 0] = THREE.MathUtils.lerp(disp[i2 + 0], 0, clampedDelta * 2.4);
        disp[i2 + 1] = THREE.MathUtils.lerp(disp[i2 + 1], 0, clampedDelta * 2.4);

        pos[i3 + 0] += (driftX + disp[i2 + 0]) * clampedDelta * 10;
        pos[i3 + 1] += (driftY + disp[i2 + 1]) * clampedDelta * 10;
        pos[i3 + 2] += driftZ * clampedDelta * 10;

        // Seamless bounding volume wraps
        if (pos[i3 + 0] > 8.5) pos[i3 + 0] = -8.5;
        if (pos[i3 + 0] < -8.5) pos[i3 + 0] = 8.5;
        if (pos[i3 + 1] > 7.5) pos[i3 + 1] = -7.5;
        if (pos[i3 + 1] < -7.5) pos[i3 + 1] = 7.5;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // B. Update Rising Micro-Bubbles
    if (bubblesRef.current) {
      const pos = bubblesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < bubbleCount; i++) {
        const i3 = i * 3;
        // Rise upward with buoyancy
        pos[i3 + 1] += bubbleData.riseSpeeds[i] * clampedDelta * 3.2;

        // Sinusoidal wobble as bubbles rise through water
        const wobble = Math.sin(time * bubbleData.wobbleFreqs[i] + i) * bubbleData.wobbleAmps[i];
        pos[i3 + 0] += wobble;

        // Wrap from surface back to abyssal depths
        if (pos[i3 + 1] > 7.2) {
          pos[i3 + 1] = -7.2;
          pos[i3 + 0] = (Math.random() - 0.5) * 14;
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // C. Update Bioluminescent Motes
    if (bioRef.current) {
      const pos = bioRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < bioCount; i++) {
        const i3 = i * 3;
        // Slow floating swirl
        pos[i3 + 0] += Math.sin(time * 0.2 + bioData.pulsePhases[i]) * clampedDelta * 0.15;
        pos[i3 + 1] += Math.cos(time * 0.25 + bioData.pulsePhases[i]) * clampedDelta * 0.12;
      }
      bioRef.current.geometry.attributes.position.needsUpdate = true;

      // Gentle pulsating glow for bioluminescent motes
      const bioMat = bioRef.current.material as THREE.PointsMaterial;
      if (bioMat) {
        bioMat.opacity = 0.35 + Math.sin(time * 1.4) * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Marine Dust / Organic snow: very tiny, subtle, silver-grey translucent specks */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustData.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#C6CFDF"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Rising Micro-Bubbles: slightly larger, icy-blue translucent specks */}
      <points ref={bubblesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bubbleData.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#E1EEFF"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 3. Bioluminescent Deep Plankton: gentle pulsating cyan-violet glow */}
      <points ref={bioRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bioData.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.052}
          color="#8BA8F8"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
