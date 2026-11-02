"use client";

import { useEffect } from "react";

// Singleton ref for Three.js render loops (60/120fps with zero React re-render overhead)
export const pointerState = {
  // Current raw normalized pointer (-1 to 1)
  x: 0,
  y: 0,
  // Smoothed / damped pointer
  smoothX: 0,
  smoothY: 0,
  // Velocity for creature banking/tilting
  vx: 0,
  vy: 0,
  // Cursor activity tracking
  lastMoveTime: 0,
  isInteracting: false,
  isTouch: false,
};

export function usePointerTracking() {
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        pointerState.isTouch = true;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
        pointerState.isTouch = false;
      }

      // Normalized coordinates: -1 (left/bottom) to +1 (right/top)
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = -((clientY / window.innerHeight) * 2 - 1);

      pointerState.vx = nx - lastX;
      pointerState.vy = ny - lastY;
      lastX = nx;
      lastY = ny;

      pointerState.x = nx;
      pointerState.y = ny;
      pointerState.lastMoveTime = performance.now();
      pointerState.isInteracting = true;
    };

    const onPointerLeave = () => {
      pointerState.isInteracting = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);
}
