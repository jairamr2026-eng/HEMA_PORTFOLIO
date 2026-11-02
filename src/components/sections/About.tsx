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
          {/* Section Heading: Space Grotesk, Weight 500 */}
          <div className="space-y-4">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.06]">
              Architecting Intelligence. <br />
              <span className="text-hero-gradient font-medium">Engineering Clarity.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#A6A6AE] leading-[1.65] max-w-2xl font-normal">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          <div className="w-full h-[1px] bg-white/[0.08]" />

          {/* Academic Background & Focus Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-1">
            <div className="space-y-2">
              <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-white/60 block font-semibold">
                Institution
              </span>
              <h3 className="font-heading text-base sm:text-lg font-medium text-white">
                Vellore Institute of Technology
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A6A6AE] leading-relaxed font-normal">
                School of Computer Science &amp; Engineering
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-white/60 block font-semibold">
                Core Focus
              </span>
              <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#A6A6AE] font-normal">
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-cyan-300/70 shrink-0 mt-0.5" />
                  <span>Computer Vision &amp; Vision Transformers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-cyan-300/70 shrink-0 mt-0.5" />
                  <span>Deep Neural Network Architectures</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-cyan-300/70 shrink-0 mt-0.5" />
                  <span>Decentralized Verification &amp; Web3</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowDownRight className="w-3.5 h-3.5 text-cyan-300/70 shrink-0 mt-0.5" />
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
