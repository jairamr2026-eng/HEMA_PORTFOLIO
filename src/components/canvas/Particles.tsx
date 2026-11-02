"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function AbyssalParticles({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Disperse sparsely in a deep cylindrical volume
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      sp[i] = Math.random() * 0.05 + 0.02; // Very slow, calm drift
    }
    return [pos, sp];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      positions[yIdx] += delta * speeds[i];
      if (positions[yIdx] > 6) {
        positions[yIdx] = -6;
      }

      // Subtle horizontal oscillation
      const xIdx = i * 3 + 0;
      positions[xIdx] += Math.sin(state.clock.elapsedTime * 0.25 + i * 1.5) * delta * 0.012;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#D4D4E0"
        transparent
        opacity={0.22}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
