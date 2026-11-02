"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function AbyssalParticles({ count = 75 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scatter particles in a volume around the camera and jellyfish
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;

      sc[i] = Math.random() * 0.8 + 0.3;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    // Slow, subtle upward abyssal marine snow drift
    for (let i = 0; i < count; i++) {
      const yIdx = i * 3 + 1;
      positions[yIdx] += delta * 0.08 * scales[i];
      if (positions[yIdx] > 7) {
        positions[yIdx] = -7;
      }

      // Gentle horizontal sway
      const xIdx = i * 3 + 0;
      positions[xIdx] += Math.sin(state.clock.elapsedTime * 0.4 + i) * delta * 0.02;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#B5B5C8"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
