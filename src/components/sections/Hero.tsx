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
        <div className="lg:col-span-7 space-y-7 pointer-events-auto">
          {/* Subtle Status / Topic Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/[0.035] border border-white/[0.10] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="font-sans text-xs sm:text-sm font-medium text-white/75 tracking-wide">
              Exploring the Unknown
            </span>
          </div>

          {/* Hero Heading: Hi! I am Hemanathan. Inspired by Minimalist Editorial Style */}
          <h1
            aria-label="Hi! I am Hemanathan."
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-bold tracking-[-0.035em] text-white leading-[0.93] select-none"
          >
            <div className="flex items-baseline">
              <span>H</span>
              <span className="relative inline-block mx-[0.01em]">
                ı
                <span
                  className="absolute top-[0.06em] left-1/2 -translate-x-1/2 w-[0.16em] h-[0.16em] rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.95)]"
                  aria-hidden="true"
                />
              </span>
              <span
                className="relative inline-block w-[0.20em] h-[0.72em] ml-[0.04em]"
                aria-hidden="true"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[0.16em] h-[0.48em] bg-white rounded-[0.06em]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[0.16em] h-[0.16em] rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.95)]" />
              </span>
            </div>
            <div>I am</div>
            <div className="flex items-baseline whitespace-nowrap">
              <span className="text-hero-gradient font-bold">Hemanathan</span>
              <span
                className="inline-block w-[0.16em] h-[0.16em] rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.95)] ml-[0.04em]"
                aria-hidden="true"
              />
            </div>
          </h1>

          {/* Body Text: Inter, Weight 400, Soft Silver-Grey with Refined Line Height */}
          <p className="font-sans text-base sm:text-lg text-[#A6A6AE] max-w-lg font-normal leading-[1.65]">
            Building intelligent systems and digital experiences at the intersection of machine learning and interaction design.
          </p>

          {/* Action Buttons: Halfcircle (Pill) Curvature with Modern Sans Typography */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="btn-primary px-8 py-3.5 text-sm sm:text-base font-sans font-medium flex items-center space-x-2.5 cursor-pointer group rounded-full"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-secondary px-8 py-3.5 text-sm sm:text-base font-sans font-medium cursor-pointer rounded-full"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Right side: 3D Canvas Space */}
        <div className="hidden lg:block lg:col-span-5 h-[500px]" />
      </div>

      {/* Subtle Bottom Scroll Cue: Modern Sans */}
      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 pointer-events-auto">
        <button
          onClick={() => scrollTo("about")}
          className="flex items-center space-x-2 text-sm font-sans font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>Descend</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce opacity-70" />
        </button>
      </div>
    </section>
  );
}
