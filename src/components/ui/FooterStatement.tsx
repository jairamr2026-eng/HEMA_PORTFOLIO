"use client";

import { useState, useRef, useEffect, useMemo } from "react";

interface MistParticle {
  id: number;
  top: string;
  left: string;
  size: number;
  dirX: number; // outward drift direction: -1 (left) or +1 (right)
  dirY: number;
  delay: string;
  duration: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function FooterStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  // Interactive click ripple
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(1);

  // Subtle cursor tilt response
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // 20 Floating Mist Particles that organically disperse on scroll
  const mistParticles: MistParticle[] = useMemo(() => {
    return [
      { id: 1, top: "20%", left: "42%", size: 3.5, dirX: -1.2, dirY: -0.5, delay: "0s", duration: "7s" },
      { id: 2, top: "26%", left: "58%", size: 3.0, dirX: 1.1, dirY: -0.3, delay: "1.2s", duration: "8.5s" },
      { id: 3, top: "45%", left: "38%", size: 4.0, dirX: -1.4, dirY: 0.2, delay: "2.4s", duration: "7.2s" },
      { id: 4, top: "48%", left: "62%", size: 3.8, dirX: 1.5, dirY: 0.1, delay: "0.8s", duration: "8.8s" },
      { id: 5, top: "35%", left: "50%", size: 4.5, dirX: 0.2, dirY: -0.8, delay: "3.1s", duration: "6.8s" },
      { id: 6, top: "60%", left: "46%", size: 3.2, dirX: -0.8, dirY: 0.6, delay: "1.9s", duration: "9.2s" },
      { id: 7, top: "64%", left: "54%", size: 3.4, dirX: 0.9, dirY: 0.5, delay: "2.7s", duration: "8.0s" },
      { id: 8, top: "18%", left: "28%", size: 2.8, dirX: -1.8, dirY: -0.4, delay: "0.4s", duration: "7.6s" },
      { id: 9, top: "22%", left: "74%", size: 3.0, dirX: 1.7, dirY: -0.2, delay: "3.6s", duration: "8.4s" },
      { id: 10, top: "72%", left: "32%", size: 3.6, dirX: -1.6, dirY: 0.7, delay: "1.5s", duration: "7.8s" },
      { id: 11, top: "70%", left: "68%", size: 3.2, dirX: 1.6, dirY: 0.6, delay: "2.2s", duration: "8.6s" },
      { id: 12, top: "38%", left: "20%", size: 2.4, dirX: -2.0, dirY: -0.1, delay: "0.9s", duration: "9.0s" },
      { id: 13, top: "42%", left: "80%", size: 2.6, dirX: 2.0, dirY: 0.2, delay: "3.3s", duration: "7.4s" },
      { id: 14, top: "82%", left: "44%", size: 3.0, dirX: -0.9, dirY: 1.1, delay: "1.7s", duration: "8.2s" },
      { id: 15, top: "85%", left: "56%", size: 3.2, dirX: 1.0, dirY: 1.0, delay: "2.9s", duration: "7.5s" },
      { id: 16, top: "14%", left: "52%", size: 2.8, dirX: 0.4, dirY: -1.2, delay: "0.2s", duration: "8.9s" },
      { id: 17, top: "52%", left: "30%", size: 3.5, dirX: -1.7, dirY: 0.3, delay: "2.5s", duration: "8.1s" },
      { id: 18, top: "54%", left: "70%", size: 3.5, dirX: 1.8, dirY: 0.3, delay: "1.1s", duration: "7.7s" },
      { id: 19, top: "30%", left: "48%", size: 4.2, dirX: -0.3, dirY: -0.6, delay: "3.8s", duration: "8.7s" },
      { id: 20, top: "76%", left: "50%", size: 3.8, dirX: 0.3, dirY: 0.9, delay: "0.6s", duration: "9.4s" }
    ];
  }, []);

  // Track scroll progress through the footer statement section (bidirectional, smooth)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;

          // When footer top reaches 88% of viewport, start revealing (progress = 0)
          // When footer top reaches 20% of viewport, clouds are fully parted (progress = 1)
          const startThreshold = windowH * 0.90;
          const endThreshold = windowH * 0.05;
          const rawProgress = (startThreshold - rect.top) / (startThreshold - endThreshold);
          const clamped = Math.max(0, Math.min(1, rawProgress));

          setRevealProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Soft water ripple on click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentId = rippleIdRef.current++;

    setRipples((prev) => [...prev, { id: currentId, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== currentId));
    }, 1400);
  };

  // Subtle cursor tilt response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    setMouseOffset({
      x: Math.max(-1, Math.min(1, normalizedX)),
      y: Math.max(-1, Math.min(1, normalizedY)),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Organic ease function for smooth fluid cloud separation
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const p = easeOutCubic(revealProgress);

  // Statement reveal interpolation
  const contentOpacity = revealProgress < 0.12 ? 0 : Math.min(1, (revealProgress - 0.12) / 0.68);
  const contentTranslateY = (1 - p) * 36;
  const contentBlur = Math.max(0, (1 - p) * 12);

  return (
    <section
      id="closing-statement"
      ref={sectionRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 pt-32 pb-16 z-10 overflow-hidden cursor-pointer select-none pointer-events-auto border-t border-white/[0.04]"
      aria-label="Closing philosophical statement"
    >
      {/* =========================================================================
          CINEMATIC UNDERWATER CLOUD / MIST FORMATION (FOOTER ONLY)
          Conceals the closing statement initially; parts organically on scroll
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {/* Soft Volumetric Light emerging from the parting center opening */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-5xl h-[520px] rounded-full blur-3xl transition-transform duration-500 ease-out"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(195, 230, 255, 0.42) 0%, rgba(145, 185, 250, 0.24) 34%, rgba(175, 155, 240, 0.12) 64%, transparent 80%)",
            opacity: Math.min(1, p * 1.3),
            transform: `translate(-50%, -50%) scale(${0.65 + p * 0.55})`,
          }}
        />

        {/* LEFT CLOUD MASS (Separates and glides outward to the left) */}
        <div
          className="absolute -top-12 -left-28 w-[80vw] max-w-4xl h-[130vh] transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(-${p * 68}vw, ${p * 4}vh, 0) rotate(-${p * 6}deg) scale(${1 + p * 0.15})`,
            opacity: Math.max(0.18, 0.96 - p * 0.45),
          }}
        >
          {/* Volumetric Layer 1: Deep Benthic Indigo Mist */}
          <div className="absolute inset-0 rounded-[48%] bg-gradient-to-br from-[#0c1d3b]/90 via-[#162f59]/75 to-transparent blur-[64px]" />
          {/* Volumetric Layer 2: Bioluminescent Ocean Blue Billow */}
          <div className="absolute top-[15%] left-[20%] w-[85%] h-[70%] rounded-[54%] bg-gradient-to-r from-sky-600/35 via-cyan-400/25 to-transparent blur-[48px]" />
          {/* Volumetric Layer 3: Soft Lavender / Silver Edge Highlight */}
          <div className="absolute top-[30%] left-[35%] w-[65%] h-[55%] rounded-[60%] bg-gradient-to-tr from-indigo-300/25 via-purple-300/18 to-transparent blur-[36px]" />
          {/* Volumetric Layer 4: Icy Caustic Luminescence */}
          <div className="absolute top-[40%] right-[-5%] w-[45%] h-[40%] rounded-full bg-sky-200/20 blur-[28px]" />
        </div>

        {/* RIGHT CLOUD MASS (Separates and glides outward to the right) */}
        <div
          className="absolute -top-12 -right-28 w-[80vw] max-w-4xl h-[130vh] transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${p * 68}vw, -${p * 4}vh, 0) rotate(${p * 6}deg) scale(${1 + p * 0.15})`,
            opacity: Math.max(0.18, 0.96 - p * 0.45),
          }}
        >
          {/* Volumetric Layer 1: Deep Benthic Indigo Mist */}
          <div className="absolute inset-0 rounded-[52%] bg-gradient-to-bl from-[#0c1d3b]/90 via-[#162f59]/75 to-transparent blur-[64px]" />
          {/* Volumetric Layer 2: Bioluminescent Ocean Blue Billow */}
          <div className="absolute top-[18%] right-[20%] w-[85%] h-[70%] rounded-[56%] bg-gradient-to-l from-sky-600/35 via-cyan-400/25 to-transparent blur-[48px]" />
          {/* Volumetric Layer 3: Soft Lavender / Silver Edge Highlight */}
          <div className="absolute top-[28%] right-[35%] w-[65%] h-[55%] rounded-[58%] bg-gradient-to-tl from-indigo-300/25 via-purple-300/18 to-transparent blur-[36px]" />
          {/* Volumetric Layer 4: Icy Caustic Luminescence */}
          <div className="absolute top-[42%] left-[-5%] w-[45%] h-[40%] rounded-full bg-sky-200/20 blur-[28px]" />
        </div>

        {/* Floating Marine Mist / Snow Particles (Drift outward with hydrodynamic displacement) */}
        {mistParticles.map((part) => (
          <span
            key={part.id}
            className="absolute rounded-full bg-sky-200/60 shadow-[0_0_10px_rgba(185,225,255,0.8)] animate-particle-ambient transition-transform duration-700 ease-out"
            style={{
              top: part.top,
              left: part.left,
              width: `${part.size}px`,
              height: `${part.size}px`,
              animationDelay: part.delay,
              animationDuration: part.duration,
              transform: `translate3d(${part.dirX * p * 180}px, ${part.dirY * p * 55}px, 0)`,
              opacity: Math.max(0.1, 0.85 - p * 0.4),
            }}
          />
        ))}
      </div>

      {/* =========================================================================
          REVEALED CLOSING STATEMENT CONTENT
          Emerges smoothly as the luminous clouds part outward
          ========================================================================= */}
      <div
        className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-30 transition-all duration-700 ease-out"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(${mouseOffset.x * 12}px, ${contentTranslateY + mouseOffset.y * 10}px, 0)`,
          filter: `blur(${contentBlur}px)`,
          pointerEvents: revealProgress > 0.35 ? "auto" : "none",
        }}
      >
        {/* Subtle Ambient Light Glow behind Statement */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className={`w-[85vw] max-w-4xl h-52 rounded-full bg-gradient-to-r from-sky-400/14 via-indigo-400/20 to-purple-400/14 blur-3xl transition-opacity duration-1000 ${
              isHovered ? "opacity-95 scale-105" : "opacity-75 scale-100"
            }`}
          />
        </div>

        {/* Delicate Divider Beam above statement */}
        <div className="mb-14 sm:mb-18 w-36 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Statement Water Ripples on Click */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full border border-sky-300/45 animate-statement-ripple -z-5"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "360px",
              height: "360px",
              boxShadow: "0 0 28px rgba(130, 190, 255, 0.3)",
            }}
            aria-hidden="true"
          />
        ))}

        {/* The Closing Philosophical Statement: Bodoni Moda Didone Serif */}
        <blockquote className="m-0 p-0">
          <p className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight sm:tracking-[-0.02em] leading-[1.2] sm:leading-tight text-center text-ethereal-statement animate-statement-wave">
            <span className="inline-block sm:inline">Something is better&nbsp;</span>
            <span className="inline-block sm:inline">than nothing.</span>
          </p>
        </blockquote>

        {/* Minimal Quiet Closing Copyright */}
        <div className="w-full mt-16 sm:mt-20 pt-6 pb-2 text-center border-t border-white/[0.06]">
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
            © {new Date().getFullYear()} Hemanathan · Deep Sea Abyss
          </p>
        </div>
      </div>
    </section>
  );
}
