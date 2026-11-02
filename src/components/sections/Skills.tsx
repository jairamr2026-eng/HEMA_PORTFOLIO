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
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
            Technical <br />
            <span className="text-editorial-silver font-normal">Disciplines.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A6A6AE] font-light leading-relaxed">
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
              <div className="space-y-1">
                <h3 className="text-base font-normal text-white">
                  {group.title}
                </h3>
                <p className="text-xs text-[#A6A6AE] leading-relaxed font-light">
                  {group.description}
                </p>
              </div>

              {/* Minimal Monochrome Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.025] border border-white/[0.08] text-[#A6A6AE] hover:text-white hover:border-white/[0.2] transition-colors"
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
