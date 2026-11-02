"use client";

import { useState, useEffect, useRef } from "react";
import { pointerState } from "@/hooks/usePointerTracking";

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export function WaterDisturbance() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100, currentX: -100, currentY: -100 });
  const animFrameRef = useRef<number | null>(null);

  // 1. Listen for clicks on empty space to spawn underwater ripples
  useEffect(() => {
    let nextId = 1;

    const handleWindowClick = (e: MouseEvent) => {
      // Check if target is interactive (buttons, links, inputs, cards)
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("input") ||
        target?.closest("textarea") ||
        target?.closest(".obsidian-card") ||
        target?.closest("[role='dialog']")
      ) {
        return; // Don't trigger background water ripples on UI elements
      }

      const newRipple: Ripple = {
        id: nextId++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setRipples((prev) => [...prev.slice(-5), newRipple]); // keep max 6 active
    };

    window.addEventListener("click", handleWindowClick);

    // Auto-clean old ripples every 1 second
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setRipples((prev) => prev.filter((r) => now - r.timestamp < 1000));
    }, 500);

    return () => {
      window.removeEventListener("click", handleWindowClick);
      clearInterval(cleanupInterval);
    };
  }, []);

  // 2. Smoothly track cursor for faint localized water disturbance
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    const updateCursorWake = () => {
      const p = posRef.current;
      p.currentX += (p.x - p.currentX) * 0.12;
      p.currentY += (p.y - p.currentY) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(updateCursorWake);
    };

    animFrameRef.current = requestAnimationFrame(updateCursorWake);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* Localized fluid water wake trailing the cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 -ml-28 -mt-28 w-56 h-56 rounded-full opacity-60 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(110, 165, 255, 0.055) 0%, rgba(140, 120, 255, 0.02) 45%, transparent 70%)",
          filter: "blur(14px)",
          willChange: "transform",
        }}
      />

      {/* Expanding circular underwater ripples on clicking empty water space */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        >
          {/* Outer primary water wave */}
          <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/30 animate-water-ring-1" />
          {/* Inner secondary water wave */}
          <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/20 animate-water-ring-2" />
          {/* Subtle luminous water core */}
          <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 animate-water-core" />
        </div>
      ))}
    </div>
  );
}
