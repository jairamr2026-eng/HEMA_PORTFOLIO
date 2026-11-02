"use client";

import { ArrowRight, ArrowDown } from "lucide-react";

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
        {/* Left Editorial Content Area */}
        <div className="lg:col-span-7 space-y-8 pointer-events-auto">
          {/* Hero Heading: Space Grotesk, Weight 500-600, Tight Letter Spacing, Subtle White-to-Cool-Blue Gradient */}
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-medium sm:font-semibold tracking-[-0.035em] text-white leading-[0.94]">
            Exploring <br />
            <span className="text-hero-gradient font-semibold">the Unknown.</span>
          </h1>

          {/* Body Text: Inter, Weight 400, Soft Silver-Grey with Refined Line Height */}
          <p className="font-sans text-base sm:text-lg text-[#A6A6AE] max-w-lg font-normal leading-[1.65]">
            Building intelligent systems and digital experiences at the intersection of machine learning and interaction design.
          </p>

          {/* Action Buttons: Halfcircle (Pill) Curvature under Gently Glassy */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary px-7 py-3.5 text-xs font-mono tracking-mono-label font-medium uppercase flex items-center space-x-2.5 cursor-pointer group rounded-full"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary px-7 py-3.5 text-xs font-mono tracking-mono-label font-medium uppercase cursor-pointer rounded-full"
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
