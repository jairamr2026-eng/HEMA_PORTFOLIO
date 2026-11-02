"use client";

import { RESEARCH_INTERESTS } from "@/data/portfolio-data";

export function Research() {
  return (
    <section
      id="research"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-14">
        {/* Header */}
        <div className="max-w-xl space-y-3 pointer-events-auto">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.06]">
            Research <br />
            <span className="text-hero-gradient font-medium">Directions.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A6A6AE] font-normal leading-[1.65]">
            Inquiries in computer vision, deep feature extraction, and verifiable decentralized ledgers.
          </p>
        </div>

        {/* Refined Minimal Editorial Research Rows */}
        <div className="divide-y divide-white/[0.10] border-y border-white/[0.10] pointer-events-auto">
          {RESEARCH_INTERESTS.map((item) => (
            <div
              key={item.id}
              className="py-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
            >
              {/* Discipline Area: IBM Plex Mono */}
              <div className="lg:col-span-3">
                <span className="font-mono text-xs tracking-mono-label text-[#A6A6AE] uppercase block">
                  {item.area}
                </span>
              </div>

              {/* Title & Summary: Space Grotesk Title, Inter Body */}
              <div className="lg:col-span-9 space-y-2">
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A6A6AE] font-normal leading-[1.65] max-w-3xl">
                  {item.summary}
                </p>
                <div className="font-mono text-xs tracking-mono-label text-white/60 pt-1">
                  <span className="text-white/40 uppercase mr-2">Focus:</span>
                  {item.focus}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
