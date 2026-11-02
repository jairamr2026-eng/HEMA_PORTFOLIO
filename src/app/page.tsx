"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Contact } from "@/components/sections/Contact";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { useScrollStory } from "@/hooks/useScrollStory";
import { usePointerTracking } from "@/hooks/usePointerTracking";
import { Project } from "@/data/portfolio-data";

// Dynamically import Three.js canvas with ssr: false to prevent hydration errors
const AbyssScene = dynamic(
  () => import("@/components/canvas/AbyssScene").then((mod) => mod.AbyssScene),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black -z-10" />,
  }
);

export default function Home() {
  const { activeSection } = useScrollStory();
  usePointerTracking();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <main className="relative bg-black text-white min-h-screen selection:bg-white/20 selection:text-white">
      {/* 3D Abyss Canvas (Full screen fixed background with responsive jellyfish) */}
      <AbyssScene
        onSelectProject={handleSelectProject}
        activeProjectId={selectedProject?.id || null}
      />

      {/* Persistent Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Content Stream across 6 continuous sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects
          onSelectProject={handleSelectProject}
          activeProjectId={selectedProject?.id || null}
        />
        <Research />
        <Contact />
      </div>

      {/* Detailed Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
