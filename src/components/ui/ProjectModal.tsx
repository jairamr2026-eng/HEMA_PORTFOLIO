"use client";

import { useEffect } from "react";
import { Project } from "@/data/portfolio-data";
import { X, ExternalLink, Check } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#080d1a] border border-white/[0.14] rounded-xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto z-10 shadow-[0_8px_32px_rgba(0,0,0,0.85)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#A6A6AE] uppercase">
              {project.category}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-medium tracking-[-0.025em] text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white rounded-md hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-5">
          <p className="font-sans text-sm sm:text-base text-[#A6A6AE] leading-[1.65] font-normal">
            {project.description}
          </p>

          {/* Architecture Tag: Halfcircle Pill with Modern Sans Typography */}
          {project.architecture && (
            <div className="p-2.5 px-5 rounded-full border border-white/[0.10] bg-white/[0.03] backdrop-blur-md flex items-center space-x-3 text-sm font-sans font-medium">
              <span className="text-white/50 uppercase">Architecture:</span>
              <span className="text-white font-medium">{project.architecture}</span>
            </div>
          )}

          {/* Key Engineering Details */}
          <div className="space-y-2.5">
            <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-white/60 block font-semibold">
              System Details
            </span>
            <div className="space-y-2.5 bg-black/40 p-4 rounded-2xl border border-white/[0.06]">
              {project.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 font-sans text-xs sm:text-sm text-[#A6A6AE] font-normal">
                  <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack: Halfcircle Pills with Modern Sans Typography */}
          <div className="space-y-2">
            <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-white/60 block font-semibold">
              Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-sans text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.10] text-white/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions: Halfcircle Pills with Modern Sans Typography */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-5 py-2.5 text-sm font-sans font-medium flex items-center space-x-2 rounded-full"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repository</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-2.5 text-sm font-sans font-medium flex items-center space-x-1.5 rounded-full"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-sm font-sans font-medium text-white/50 hover:text-white px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
