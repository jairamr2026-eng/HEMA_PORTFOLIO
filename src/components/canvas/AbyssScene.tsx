"use client";

import { Suspense, useRef, useState, useEffect } from "react";
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

// Subtle camera parallax controller
function CameraParallax() {
  useFrame((state, delta) => {
    // Gentle camera sway based on smoothed pointer
    const targetCamX = pointerState.x * 0.25;
    const targetCamY = pointerState.y * 0.18;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, delta * 1.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, delta * 1.5);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// Non-WebGL or Loading Fallback
function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black text-white/50 pointer-events-none">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border border-white/20 border-t-white rounded-full animate-spin mx-auto" />
        <p className="font-mono text-xs tracking-widest uppercase">Initializing Deep Ecosystem...</p>
      </div>
    </div>
  );
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
      <div className="fixed inset-0 bg-black -z-10 flex items-center justify-center text-white/40">
        <p className="font-mono text-xs tracking-widest uppercase">3D Acceleration Unavailable · Minimal Mode Active</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <Canvas
        className="w-full h-full pointer-events-auto"
        camera={{ position: [0, 0, 6.8], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 2]} // Performance: limit DPR to 2 max
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
      >
        {/* Soft, restrained monochromatic lighting */}
        <ambientLight intensity={0.9} color="#FFFFFF" />
        
        {/* Pure white rim light from above-back to illuminate translucent bell ridges */}
        <directionalLight position={[0, 5, -3]} intensity={2.8} color="#FFFFFF" />
        
        {/* Subtle front fill light */}
        <directionalLight position={[3, 2, 4]} intensity={1.1} color="#E0E0EC" />
        
        {/* Soft underside bounce light */}
        <pointLight position={[0, -4, 2]} intensity={0.6} color="#888899" />

        <CameraParallax />

        <Suspense fallback={null}>
          <Jellyfish onSelectProject={onSelectProject} activeProjectId={activeProjectId} />
          <AbyssalParticles count={80} />
        </Suspense>
      </Canvas>
    </div>
  );
}
