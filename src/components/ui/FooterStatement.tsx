"use client";

import { useState, useRef, useEffect } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// 12 subtle deep-sea bioluminescent particles surrounding the statement
const PARTICLES = [
  { id: 1, top: "15%", left: "18%", size: 3, delay: "0s", duration: "7s" },
  { id: 2, top: "28%", left: "82%", size: 2, delay: "1.4s", duration: "8.5s" },
  { id: 3, top: "72%", left: "24%", size: 3.5, delay: "2.8s", duration: "6.8s" },
  { id: 4, top: "80%", left: "76%", size: 2.5, delay: "0.8s", duration: "9s" },
  { id: 5, top: "45%", left: "10%", size: 2, delay: "3.2s", duration: "7.8s" },
  { id: 6, top: "35%", left: "90%", size: 3, delay: "1.9s", duration: "8s" },
  { id: 7, top: "85%", left: "48%", size: 2, delay: "2.1s", duration: "7.2s" },
  { id: 8, top: "18%", left: "54%", size: 2.5, delay: "4.0s", duration: "8.8s" },
  { id: 9, top: "60%", left: "88%", size: 1.8, delay: "0.5s", duration: "6.5s" },
  { id: 10, top: "52%", left: "14%", size: 2.2, delay: "3.7s", duration: "9.2s" },
  { id: 11, top: "78%", left: "34%", size: 2, delay: "1.1s", duration: "7.6s" },
  { id: 12, top: "22%", left: "68%", size: 2.8, delay: "2.5s", duration: "8.2s" },
];

export function FooterStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const rippleCounter = useRef(1);

  // Scroll reveal observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Soft water ripple on click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentId = rippleCounter.current++;

    setRipples((prev) => [...prev, { id: currentId, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== currentId));
    }, 1500);
  };

  // Subtle cursor tilt response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    setMouseOffset({
      x: Math.max(-1, Math.min(1, normalizedX)),
      y: Math.max(-1, Math.min(1, normalizedY)),
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <section
      id="closing-statement"
      ref={containerRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen py-36 sm:py-48 px-6 sm:px-12 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer select-none pointer-events-auto border-t border-white/[0.04]"
      aria-label="Closing philosophical statement"
    >
      {/* Subtle underwater light glow behind the text */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className={`w-[85vw] max-w-4xl h-48 sm:h-64 rounded-full bg-gradient-to-r from-sky-500/10 via-indigo-400/15 to-purple-400/10 blur-3xl transition-opacity duration-1000 ${
            isHovered ? "opacity-90 scale-105" : "opacity-50 scale-100"
          }`}
          style={{
            transform: `translate3d(${mouseOffset.x * 18}px, ${mouseOffset.y * 14}px, 0)`,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease",
          }}
        />
      </div>

      {/* Floating microscopic bioluminescent ocean particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-sky-200/40 shadow-[0_0_8px_rgba(180,215,255,0.7)] animate-particle-ambient"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Interactive Water Ripples on Click */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full border border-sky-300/45 animate-statement-ripple -z-5"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "320px",
            height: "320px",
            boxShadow: "0 0 24px rgba(130, 190, 255, 0.25)",
          }}
          aria-hidden="true"
        />
      ))}

      {/* The Oversized Didone Serif Statement Container */}
      <div
        className={`relative max-w-7xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 8}px, 0) rotateX(${-mouseOffset.y * 2.5}deg) rotateY(${mouseOffset.x * 3.5}deg)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          perspective: 1000,
        }}
      >
        <blockquote className="m-0 p-0">
          <p className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-normal tracking-tight sm:tracking-[-0.02em] leading-[1.25] sm:leading-none text-center text-ethereal-statement animate-statement-wave">
            <span className="inline-block sm:inline">Something is better&nbsp;</span>
            <span className="inline-block sm:inline">than nothing.</span>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
