"use client";

import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GraduationCap, MapPin, Sparkles, Binary } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Empty space for jellyfish on left-center on desktop */}
        <div className="hidden lg:block lg:col-span-5 h-[450px]" />

        {/* Right side content */}
        <div className="lg:col-span-7 space-y-8 pointer-events-auto">
          {/* Section Marker */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#9595B0] uppercase tracking-widest">
              01 // BENEATH THE SURFACE
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white leading-tight">
              Decoding Complexity. <br />
              <span className="text-gradient-silver">Engineering Clarity.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#9595B0] leading-relaxed max-w-2xl font-light">
              I am an Integrated M.Tech student at Vellore Institute of Technology, operating at the intersection of deep neural networks, computer vision, and distributed cryptographic protocols.
            </p>
          </div>

          {/* Academic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 glass-panel rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <GraduationCap className="w-4 h-4 text-[#B5B5C8]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#B5B5C8]">Education</span>
              </div>
              <h4 className="text-base text-white font-medium">Integrated M.Tech CSE</h4>
              <p className="text-xs text-[#9595B0] leading-relaxed">
                VIT Vellore · School of Computer Science & Engineering (SCOPE)
              </p>
              <div className="text-[11px] font-mono text-white/50 pt-1">2024 — 2029</div>
            </div>

            <div className="p-5 glass-panel rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center space-x-2 text-white">
                <MapPin className="w-4 h-4 text-[#B5B5C8]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#B5B5C8]">Location & Base</span>
              </div>
              <h4 className="text-base text-white font-medium">Vellore, Tamil Nadu</h4>
              <p className="text-xs text-[#9595B0] leading-relaxed">
                Active in open-source research labs and high-performance computing centers.
              </p>
              <div className="text-[11px] font-mono text-white/50 pt-1">India · UTC+5:30</div>
            </div>
          </div>

          {/* Core Philosophy & Technical Pillars */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40 block">
              Exploration Principles
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#9595B0]">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.015] hover:border-white/15 transition-colors space-y-1">
                <div className="font-mono text-xs text-white flex items-center space-x-2">
                  <Binary className="w-3.5 h-3.5 text-[#B5B5C8]" />
                  <span>01. Hybrid Architectures</span>
                </div>
                <p className="text-xs text-[#9595B0]/80">
                  Fusing inductive spatial priors of CNNs with global self-attention transformers for nuanced visual recognition.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.015] hover:border-white/15 transition-colors space-y-1">
                <div className="font-mono text-xs text-white flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B5B5C8]" />
                  <span>02. Verifiable Trust</span>
                </div>
                <p className="text-xs text-[#9595B0]/80">
                  Deploying immutable smart contracts and decentralized storage schemas that eliminate single points of failure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
