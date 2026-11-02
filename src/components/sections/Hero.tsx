"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-24 pb-16 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Content Area */}
        <div className="lg:col-span-7 space-y-8 pointer-events-auto">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-xs text-[#9595B0] tracking-widest uppercase">
              ABYSSAL EXPEDITION // 2024–2029
            </span>
          </div>

          {/* Brand Name */}
          <div className="space-y-2">
            <h2 className="font-mono text-sm sm:text-base tracking-[0.25em] text-[#B5B5C8] uppercase font-light">
              HEMANATHAN.
            </h2>

            {/* Large Heading */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter text-white leading-[0.92]">
              Exploring <br />
              <span className="text-gradient-silver font-normal">the Unknown.</span>
            </h1>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#9595B0] max-w-xl font-light leading-relaxed">
            Building intelligent systems and creating meaningful digital experiences at the intersection of technology and imagination.
          </p>

          {/* Academic Info Badge */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel max-w-md border border-white/10 space-y-1.5">
            <div className="font-mono text-xs uppercase tracking-wider text-white font-medium flex items-center justify-between">
              <span>Integrated M.Tech CSE</span>
              <span className="text-[#9595B0]">2024–2029</span>
            </div>
            <div className="font-mono text-xs text-[#9595B0]">
              VIT Vellore · SCOPE (School of Computer Science & Engineering)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="glass-button-primary px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest flex items-center space-x-2 group cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="glass-button px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-white/90 hover:text-white cursor-pointer"
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
          className="flex items-center space-x-2 text-xs font-mono text-[#9595B0] hover:text-white transition-colors uppercase tracking-widest"
        >
          <span>Descend deeper</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
        <span className="text-white/20">|</span>
        <span className="text-[11px] font-mono text-white/40 tracking-wider">
          Curated Monochromatic Ecosystem
        </span>
      </div>
    </section>
  );
}
