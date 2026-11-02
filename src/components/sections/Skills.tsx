"use client";

import { SKILL_GROUPS } from "@/data/portfolio-data";
import { Terminal, Layers, Eye, Globe, ShieldCheck } from "lucide-react";

const CATEGORY_ICONS = [Terminal, Layers, Eye, Globe, ShieldCheck];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3 pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#9595B0] uppercase tracking-widest">
              02 // THE ECOSYSTEM
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white">
            Technical Foundations <br />
            <span className="text-gradient-silver">&amp; Tooling.</span>
          </h2>
          <p className="text-base text-[#9595B0] font-light">
            A cohesive stack spanning core systems programming, neural network architectures, computer vision pipelines, and verifiable decentralized ledgers.
          </p>
        </div>

        {/* Minimal Typographic Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
          {SKILL_GROUPS.map((group, gIdx) => {
            const Icon = CATEGORY_ICONS[gIdx % CATEGORY_ICONS.length];
            return (
              <div
                key={group.title}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4 text-[#B5B5C8] group-hover:text-white transition-colors" />
                      <h3 className="font-mono text-xs uppercase tracking-widest text-white font-medium">
                        {group.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-white/40">
                      0{gIdx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-[#9595B0] font-light">
                    {group.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all duration-200 ${
                          skill.highlight
                            ? "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                            : "bg-white/[0.03] text-[#9595B0] border border-white/5 hover:text-white hover:border-white/15"
                        }`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Stack Tier 0{gIdx + 1}</span>
                  <span className="text-white/60">Production Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
