"use client";

import { PERSONAL_INFO } from "@/data/portfolio-data";
import { ArrowDownRight } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Negative space reserved for 3D creature drifting on left-center */}
        <div className="hidden lg:block lg:col-span-5 h-[450px]" />

        {/* Right side: Elegant text-led editorial layout */}
        <div className="lg:col-span-7 space-y-10 pointer-events-auto">
          {/* Section Marker */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#A6A6AE] tracking-[0.2em] uppercase">
              01 // ABOUT
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="font-mono text-xs text-white/40">BENEATH THE SURFACE</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.08]">
              Architecting Intelligence. <br />
              <span className="text-editorial-silver">Engineering Clarity.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#A6A6AE] leading-relaxed max-w-2xl font-light">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Hairline Divider */}
          <div className="w-full h-[1px] bg-white/[0.08]" />

          {/* Academic Pedigree & Focus Areas: Clean typographic layout without heavy boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 block">
                Academic Background
              </span>
              <h3 className="text-base font-normal text-white">
                {PERSONAL_INFO.degree}
              </h3>
              <p className="text-xs text-[#A6A6AE] leading-relaxed">
                Vellore Institute of Technology (VIT), Vellore
                <br />
                School of Computer Science and Engineering (SCOPE)
              </p>
              <div className="font-mono text-[11px] text-white/40 pt-1">
                2024 — 2029 · Tamil Nadu, India
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 block">
                Core Exploration Areas
              </span>
              <ul className="space-y-2 text-xs text-[#A6A6AE]">
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Hybrid Neural Networks &amp; Vision Transformers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Fine-Grained Texture &amp; Textile Pattern Forensics</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Decentralized Credential Verification &amp; Web3</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Quantized Edge Telemetry &amp; Habitat Sensing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
