"use client";

import { useEffect } from "react";
import { Project } from "@/data/portfolio-data";
import { X, ExternalLink, CheckCircle2, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#09090D] border border-white/20 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-[#9595B0] uppercase tracking-widest">
                {project.category}
              </span>
              <span className="text-white/20">/</span>
              <span className="font-mono text-xs text-white/40">{project.period}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          <p className="text-base text-[#B5B5C8] leading-relaxed">
            {project.description}
          </p>

          {/* Key Contributions & Engineering Architecture */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/70 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#9595B0]" />
              <span>Architectural Highlights & Innovations</span>
            </h4>
            <div className="space-y-2.5 bg-black/40 p-4 rounded-xl border border-white/5">
              {project.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm text-[#9595B0]">
                  <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics & Benchmark */}
          {project.metrics && (
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/[0.02]">
              <span className="font-mono text-xs text-[#9595B0] uppercase tracking-wider">Benchmark / Key Metric:</span>
              <span className="font-mono text-xs text-white font-semibold">{project.metrics}</span>
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-mono font-medium transition-colors"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-white/50 hover:text-white px-3 py-2 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
