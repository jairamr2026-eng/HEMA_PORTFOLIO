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
        <div className="lg:col-span-7 space-y-7 pointer-events-auto">
          {/* Eyebrow / Name Marker: IBM Plex Mono with 0.12em spacing */}
          <div className="flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(100,200,255,0.7)]" />
            <span className="font-mono text-xs tracking-mono-label font-medium text-[#A6A6AE] uppercase">
              {PERSONAL_INFO.name}
            </span>
          </div>

          {/* Hero Heading: Space Grotesk, Weight 500-600, Tight Letter Spacing, Subtle White-to-Cool-Blue Gradient */}
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-medium sm:font-semibold tracking-[-0.035em] text-white leading-[0.94]">
            Exploring <br />
            <span className="text-hero-gradient font-semibold">the Unknown.</span>
          </h1>

          {/* Body Text: Inter, Weight 400, Soft Silver-Grey with Refined Line Height */}
          <p className="font-sans text-base sm:text-lg text-[#A6A6AE] max-w-lg font-normal leading-[1.65]">
            {PERSONAL_INFO.subheadline}
          </p>

          {/* Academic Background: IBM Plex Mono */}
          <div className="pt-1">
            <span className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-mono tracking-mono-label text-[#A6A6AE]">
              <span className="text-white font-medium">{PERSONAL_INFO.degree}</span>
              <span className="text-white/20">·</span>
              <span>{PERSONAL_INFO.institution}</span>
            </span>
          </div>

          {/* Action Buttons: IBM Plex Mono */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary px-6 py-3 text-xs font-mono tracking-mono-label font-medium uppercase flex items-center space-x-2 cursor-pointer group"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary px-6 py-3 text-xs font-mono tracking-mono-label font-medium uppercase cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Right side: 3D Canvas Space */}
        <div className="hidden lg:block lg:col-span-5 h-[500px]" />
      </div>

      {/* Subtle Bottom Scroll Cue: IBM Plex Mono */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 pointer-events-auto">
        <button
          onClick={() => scrollTo("about")}
          className="flex items-center space-x-2 text-xs font-mono tracking-mono-label text-white/50 hover:text-white transition-colors uppercase cursor-pointer"
        >
          <span>Descend</span>
          <ArrowDown className="w-3 h-3 animate-bounce opacity-70" />
        </button>
      </div>
    </section>
  );
}
