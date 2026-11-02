"use client";

import { ArrowRight, ArrowDown } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-28 pb-16 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Editorial Content Area */}
        <div className="lg:col-span-7 space-y-8 pointer-events-auto">
          {/* Subtle Label / Eyebrow */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#A6A6AE] tracking-[0.2em] uppercase">
              ABYSS // 2024–2029
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <span className="font-mono text-xs text-white/50 tracking-wider">
              SCOPE
            </span>
          </div>

          {/* Heading Block */}
          <div className="space-y-3">
            <h2 className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#A6A6AE] uppercase font-normal">
              {PERSONAL_INFO.name}
            </h2>

            {/* Oversized Editorial Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[0.94]">
              Exploring <br />
              <span className="text-editorial-silver font-normal">the Unknown.</span>
            </h1>
          </div>

          {/* Minimal Supporting Description */}
          <p className="text-base sm:text-lg text-[#A6A6AE] max-w-xl font-light leading-relaxed">
            {PERSONAL_INFO.subheadline}
          </p>

          {/* Academic Pedigree Banner: Restrained hairline aesthetic */}
          <div className="pt-2">
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2.5 px-4 rounded-lg bg-white/[0.025] border border-white/[0.10] text-xs font-mono text-[#A6A6AE]">
              <span className="text-white font-medium">{PERSONAL_INFO.degree}</span>
              <span className="hidden sm:inline text-white/20">/</span>
              <span>{PERSONAL_INFO.institution}</span>
              <span className="hidden sm:inline text-white/20">/</span>
              <span className="text-white/60">{PERSONAL_INFO.timeline}</span>
            </div>
          </div>

          {/* Two Clear Calls to Action */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary px-6 py-3 text-xs font-mono tracking-wider uppercase flex items-center space-x-2 cursor-pointer group"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary px-6 py-3 text-xs font-mono tracking-wider uppercase cursor-pointer"
            >
              Let&apos;s Connect
            </button>
          </div>
        </div>

        {/* Right side: 3D canvas is visible in the background, smoothly positioned */}
        <div className="hidden lg:block lg:col-span-5 h-[500px]" />
      </div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 flex items-center space-x-3 pointer-events-auto">
        <button
          onClick={() => scrollTo("about")}
          className="flex items-center space-x-2 text-xs font-mono text-[#A6A6AE] hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
        >
          <span>Descend deeper</span>
          <ArrowDown className="w-3 h-3 animate-bounce opacity-70" />
        </button>
        <span className="text-white/20">|</span>
        <span className="text-[11px] font-mono text-white/40 tracking-wider">
          Obsidian Monochromatic Space
        </span>
      </div>
    </section>
  );
}
