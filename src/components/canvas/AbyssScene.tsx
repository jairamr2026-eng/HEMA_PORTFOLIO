"use client";

import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Jellyfish } from "./Jellyfish";
import { AbyssalParticles } from "./Particles";
import { pointerState } from "@/hooks/usePointerTracking";
import { Project } from "@/data/portfolio-data";

interface AbyssSceneProps {
  onSelectProject?: (project: Project) => void;
  activeProjectId?: string | null;
}

// Subtle camera parallax controller with restrained motion
function CameraParallax() {
  useFrame((state, delta) => {
    // Highly restrained camera sway
    const targetCamX = pointerState.x * 0.18;
    const targetCamY = pointerState.y * 0.12;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, delta * 1.2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, delta * 1.2);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function AbyssScene({ onSelectProject, activeProjectId }: AbyssSceneProps) {
  const [webglSupported, setWebglSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-black -z-10" />;
  }

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 bg-black -z-10 flex items-center justify-center text-white/30">
        <p className="font-mono text-xs tracking-widest uppercase">Minimal Display Mode Active</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <Canvas
        className="w-full h-full pointer-events-auto"
        camera={{ position: [0, 0, 6.8], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.75]} // Smooth performance across standard and high-DPI displays
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.02
        }}
      >
        {/* Soft, restrained monochromatic lighting */}
        <ambientLight intensity={0.75} color="#FFFFFF" />

        {/* Crisp white rim light to highlight translucent contours */}
        <directionalLight position={[0, 5.5, -3.2]} intensity={2.6} color="#FFFFFF" />

        {/* Soft front-angled key fill */}
        <directionalLight position={[2.8, 1.8, 3.8]} intensity={0.95} color="#E8E8F2" />

        {/* Restrained underside glow */}
        <pointLight position={[0, -3.6, 2]} intensity={0.4} color="#9E9EB2" />

        <CameraParallax />

        <Suspense fallback={null}>
          <Jellyfish onSelectProject={onSelectProject} activeProjectId={activeProjectId} />
          <AbyssalParticles count={40} />
        </Suspense>
      </Canvas>
    </div>
  );
}
