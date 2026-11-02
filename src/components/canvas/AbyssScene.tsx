"use client";

import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Jellyfish } from "./Jellyfish";
import { SmallJellyfishSwarm } from "./SmallJellyfishSwarm";
import { SmallFishSchool } from "./SmallFishSchool";
import { AbyssalParticles } from "./Particles";
import { OceanAtmosphere } from "./OceanAtmosphere";
import { Project } from "@/data/portfolio-data";

interface AbyssSceneProps {
  onSelectProject?: (project: Project) => void;
  activeProjectId?: string | null;
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
    return <div className="fixed inset-0 bg-[#010308] -z-10" />;
  }

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 bg-[#010308] -z-10 flex items-center justify-center text-white/30">
        <p className="font-sans text-sm font-medium tracking-wide uppercase text-white/50">Deep Ocean Minimal Display Active</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#010309]">
      <Canvas
        className="w-full h-full pointer-events-auto"
        camera={{ position: [0, 0, 6.8], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.75]} // Smooth performance across standard and high-DPI displays
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
        onCreated={({ scene }) => {
          // Soft atmospheric deep-ocean fog: dark indigo-navy dissolving objects naturally with depth
          scene.fog = new THREE.FogExp2(0x020614, 0.046);
        }}
      >
        {/* Ambient oceanic fill: deep blue-violet tone */}
        <ambientLight intensity={0.46} color="#0D1E3A" />

        {/* Sunlight filtering from surface above: angled pale ice-blue key light */}
        <directionalLight position={[-1.5, 6.0, 2.5]} intensity={1.15} color="#D7E8FF" />

        {/* Back rim light for the thin bell membrane, fringes, and ridges */}
        <directionalLight position={[0.5, 5.0, -3.5]} intensity={2.6} color="#C4DBFF" />

        {/* Soft front fill with a gentle silver-indigo tone */}
        <directionalLight position={[2.5, 1.5, 3.5]} intensity={0.65} color="#E8EEFC" />

        {/* Underside abyssal fill suggests reflected light from deep ocean floor */}
        <pointLight position={[0, -4.0, 1.8]} intensity={0.85} distance={10} decay={2} color="#1E325A" />

        <Suspense fallback={null}>
          {/* Deep Ocean procedural caustics, god rays & atmospheric background quad */}
          <OceanAtmosphere />

          {/* Delicate Small Upward-Drifting Jellyfish Swarm (autonomous upward propulsion) */}
          <SmallJellyfishSwarm />

          {/* Small Deep-Sea Fish School (cruises naturally, ignores cursor) */}
          <SmallFishSchool />

          {/* Primary Interactive 3D Jellyfish (the only entity that responds to cursor movement) */}
          <Jellyfish onSelectProject={onSelectProject} activeProjectId={activeProjectId} />

          {/* Multi-tier Marine Dust, Micro-Bubbles & Bioluminescent Plankton */}
          <AbyssalParticles count={180} />
        </Suspense>
      </Canvas>
    </div>
  );
}
