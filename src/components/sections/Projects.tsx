"use client";

import { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolio-data";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  activeProjectId?: string | null;
}

export function Projects({ onSelectProject, activeProjectId }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterOptions = ["All", "AI & Vision", "Web3", "Full-Stack"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "AI & Vision") return p.category.includes("AI") || p.category.includes("Vision");
    if (activeFilter === "Web3") return p.category.includes("Blockchain") || p.category.includes("Web3");
    if (activeFilter === "Full-Stack") return p.category.includes("Full-Stack");
    return true;
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
          <div className="max-w-xl space-y-3">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.06]">
              Selected <br />
              <span className="text-hero-gradient font-medium">Systems.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#A6A6AE] font-normal leading-[1.65]">
              Engineering solutions in neural classification, verifiable credentials, telemetry, and interactive platforms.
            </p>
          </div>

          {/* Minimal Filter Tabs: Halfcircle Pill with Modern Sans Typography */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] backdrop-blur-md">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-all cursor-pointer ${
                  activeFilter === opt
                    ? "bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                    : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Project Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
          {filteredProjects.map((project) => {
            const isSelected = activeProjectId === project.id;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`obsidian-card p-6 sm:p-7 flex flex-col justify-between cursor-pointer group ${
                  isSelected ? "border-white/40 bg-white/[0.08]" : ""
                }`}
              >
                <div className="space-y-4">
                  {/* Category: Modern Sans */}
                  <div className="font-sans text-xs tracking-wider text-[#A6A6AE] uppercase font-semibold">
                    {project.category}
                  </div>

                  {/* Title & Description: Space Grotesk Title, Inter Body */}
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg sm:text-xl font-medium text-white group-hover:text-white transition-colors flex items-start justify-between">
                      <span className="leading-snug">{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white shrink-0 ml-2 mt-1" />
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#A6A6AE] font-normal leading-[1.65] line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Architecture: Halfcircle (Pill) with Modern Sans Typography */}
                  {project.architecture && (
                    <div className="pt-1">
                      <span className="inline-block font-sans text-xs sm:text-[13px] font-medium px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.10] text-white/90">
                        {project.architecture}
                      </span>
                    </div>
                  )}

                  {/* Technologies: Halfcircle (Pill) with Modern Sans Typography */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-sans text-xs sm:text-[13px] font-medium px-3.5 py-1 rounded-full bg-white/[0.03] text-white/80 border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with clean GitHub link */}
                <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between font-sans text-sm font-medium">
                  <span className="text-white/60 group-hover:text-white transition-colors">
                    Inspect Architecture
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded text-white/40 hover:text-white transition-colors"
                      aria-label="View source repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
