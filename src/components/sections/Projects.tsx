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
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
              Selected <br />
              <span className="text-editorial-silver font-normal">Systems.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A6A6AE] font-light leading-relaxed">
              Engineering solutions in neural classification, verifiable credentials, telemetry, and interactive platforms.
            </p>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg border border-white/[0.10] bg-white/[0.02]">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  activeFilter === opt
                    ? "bg-white text-black font-medium"
                    : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.04]"
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
                  {/* Category */}
                  <div className="text-xs font-mono text-[#A6A6AE] uppercase tracking-wider">
                    {project.category}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-normal text-white group-hover:text-white transition-colors flex items-start justify-between">
                      <span className="leading-snug">{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white shrink-0 ml-2 mt-1" />
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A6A6AE] font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Architecture */}
                  {project.architecture && (
                    <div className="pt-1">
                      <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.08] text-white/80">
                        {project.architecture}
                      </span>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.02] text-[#A6A6AE] border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with clean GitHub link */}
                <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-white/50 group-hover:text-white transition-colors">
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
                      <GithubIcon className="w-3.5 h-3.5" />
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
