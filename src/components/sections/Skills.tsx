"use client";

import { SKILL_GROUPS } from "@/data/portfolio-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-14">
        {/* Header */}
        <div className="max-w-xl space-y-3 pointer-events-auto">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.06]">
            Technical <br />
            <span className="text-hero-gradient font-medium">Disciplines.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A6A6AE] font-normal leading-[1.65]">
            Core machine learning architectures, computer vision pipelines, creative full-stack development, and decentralized ledgers.
          </p>
        </div>

        {/* 4 Clean Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pointer-events-auto">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="border-t border-white/[0.12] pt-5 space-y-4 group"
            >
              <div className="space-y-1.5">
                <h3 className="font-heading text-base sm:text-lg font-medium text-white">
                  {group.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#A6A6AE] leading-relaxed font-normal">
                  {group.description}
                </p>
              </div>

              {/* Minimal Monochrome Tags: Halfcircle (Pill) under Gently Glassy */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs tracking-mono-label px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#A6A6AE] hover:text-white hover:border-white/[0.24] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
