"use client";

import { RESEARCH_TOPICS } from "@/data/portfolio-data";
import { Compass, BookOpen, GitBranch, ArrowRight } from "lucide-react";

export function Research() {
  return (
    <section
      id="research"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3 pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#9595B0] uppercase tracking-widest">
              04 // THE UNKNOWN
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white">
            Research Directions <br />
            <span className="text-gradient-silver">&amp; Experimentation.</span>
          </h2>
          <p className="text-base text-[#9595B0] font-light">
            Investigating foundational questions in deep feature fusion, privacy-preserving credential schemas, and resource-constrained edge inference.
          </p>
        </div>

        {/* Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
          {RESEARCH_TOPICS.map((topic, idx) => (
            <div
              key={topic.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 space-y-5"
            >
              {/* Header badge & status */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#9595B0] uppercase tracking-wider flex items-center space-x-2">
                  <Compass className="w-3.5 h-3.5 text-[#B5B5C8]" />
                  <span>{topic.area}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-white/20 bg-white/5 text-white">
                  {topic.status}
                </span>
              </div>

              {/* Title & Summary */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-light text-white leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9595B0] leading-relaxed font-light">
                  {topic.summary}
                </p>
              </div>

              {/* Methodology & Impact */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="font-mono text-[11px] text-white/70 uppercase tracking-wider block">
                    Methodology &amp; Formulation
                  </span>
                  <p className="text-[#9595B0]">{topic.methodology}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="font-mono text-[11px] text-white/70 uppercase tracking-wider block">
                    Target Impact
                  </span>
                  <p className="text-[#9595B0]">{topic.impact}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note on Research Integrity */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] max-w-3xl pointer-events-auto flex items-start space-x-4">
          <BookOpen className="w-5 h-5 text-[#B5B5C8] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#9595B0]">
            <span className="font-mono uppercase tracking-wider text-white block">
              Academic Experimentation &amp; SCOPE Laboratory Focus
            </span>
            <p>
              Conducted in active collaboration with faculty mentorship and peer researchers at the School of Computer Science and Engineering (SCOPE), VIT Vellore. Ongoing preprint submissions and benchmark codebases are archived periodically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
