"use client";

import { useState } from "react";
import { PROJECTS, Project } from "@/data/portfolio-data";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  activeProjectId?: string | null;
}

export function Projects({ onSelectProject, activeProjectId }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Deep Learning", "Web3", "IoT & Cloud", "Systems"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Deep Learning") return p.category.includes("Deep Learning") || p.category.includes("Vision");
    if (filter === "Web3") return p.category.includes("Web3") || p.category.includes("Blockchain");
    if (filter === "IoT & Cloud") return p.category.includes("Cloud") || p.category.includes("IoT");
    if (filter === "Systems") return p.category.includes("Full Stack") || p.category.includes("Productivity");
    return true;
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs text-[#9595B0] uppercase tracking-widest">
                03 // DISCOVER THE DEPTHS
              </span>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white">
              Selected Projects <br />
              <span className="text-gradient-silver">&amp; Architectures.</span>
            </h2>
            <p className="text-base text-[#9595B0] font-light">
              Interactive implementations exploring deep feature extraction, tamper-proof credentials, and real-time sensory pipelines.
            </p>
          </div>

          {/* Interactive 3D Hotspot Hint */}
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10 flex items-center space-x-3 text-xs font-mono text-[#B5B5C8]">
            <Sparkles className="w-4 h-4 text-white animate-pulse shrink-0" />
            <span>Interactive creature hotspots synchronized with project depths</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? "bg-white text-black font-medium"
                  : "bg-white/5 text-[#9595B0] border border-white/10 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProjectId === project.id;
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`glass-panel p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? "border-white bg-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                    : "border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
                }`}
              >
                <div className="space-y-4">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#9595B0]">
                    <span className="uppercase tracking-wider">{project.category}</span>
                    <span className="text-white/40">{project.period}</span>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-white transition-colors flex items-start justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white shrink-0 ml-2 mt-1" />
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9595B0] font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Metric Badge */}
                  {project.metrics && (
                    <div className="inline-block px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-white/90">
                      {project.metrics}
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-[#9595B0] border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-white/40">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#9595B0] group-hover:text-white transition-colors flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Inspect Architecture</span>
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="View repository"
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
