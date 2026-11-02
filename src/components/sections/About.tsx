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
        {/* Negative space for 3D creature */}
        <div className="hidden lg:block lg:col-span-5 h-[450px]" />

        {/* Text-led editorial content */}
        <div className="lg:col-span-7 space-y-9 pointer-events-auto">
          {/* Section Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.08]">
              Architecting Intelligence. <br />
              <span className="text-editorial-silver font-normal">Engineering Clarity.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#A6A6AE] leading-relaxed max-w-2xl font-light">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/[0.08]" />

          {/* Academic Background & Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-1">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 block">
                Education
              </span>
              <h3 className="text-base font-normal text-white">
                {PERSONAL_INFO.degree}
              </h3>
              <p className="text-xs text-[#A6A6AE] leading-relaxed">
                Vellore Institute of Technology (VIT), Vellore
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-white/50 block">
                Core Focus
              </span>
              <ul className="space-y-2 text-xs text-[#A6A6AE]">
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Computer Vision &amp; Vision Transformers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Deep Neural Network Architectures</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Decentralized Verification &amp; Web3</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                  <span>Edge Inference &amp; Sensor Telemetry</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
