"use client";

import { RESEARCH_INTERESTS } from "@/data/portfolio-data";

export function Research() {
  return (
    <section
      id="research"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Header */}
        <div className="max-w-2xl space-y-4 pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#A6A6AE] tracking-[0.2em] uppercase">
              04 // RESEARCH
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="font-mono text-xs text-white/40">THE UNKNOWN</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
            Research Directions <br />
            <span className="text-editorial-silver">&amp; Active Inquiries.</span>
          </h2>

          <p className="text-base text-[#A6A6AE] font-light leading-relaxed">
            Genuine exploration areas in computer vision, deep feature extraction, and verifiable decentralized ledgers under academic study at VIT Vellore.
          </p>
        </div>

        {/* Refined Editorial Research Layout with Hairline Dividers */}
        <div className="divide-y divide-white/[0.10] border-y border-white/[0.10] pointer-events-auto">
          {RESEARCH_INTERESTS.map((item, idx) => (
            <div
              key={item.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
            >
              {/* Index & Area */}
              <div className="lg:col-span-3 space-y-1">
                <span className="font-mono text-xs text-white/40 block">
                  0{idx + 1}
                </span>
                <span className="font-mono text-xs text-[#A6A6AE] uppercase tracking-wider block">
                  {item.area}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A6A6AE] font-light leading-relaxed">
                  {item.summary}
                </p>
                <div className="text-xs font-mono text-white/70 pt-1">
                  <span className="text-white/40 uppercase tracking-wider mr-2">Investigation Scope:</span>
                  {item.focus}
                </div>
              </div>

              {/* Tags */}
              <div className="lg:col-span-3 flex flex-wrap gap-1.5 pt-1 lg:justify-end">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.025] border border-white/[0.07] text-[#A6A6AE]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note on Research Integrity */}
        <div className="pt-2 max-w-2xl text-xs font-mono text-white/40 leading-relaxed pointer-events-auto">
          Academic investigations are conducted in coordination with the School of Computer Science and Engineering (SCOPE), VIT Vellore.
        </div>
      </div>
    </section>
  );
}
