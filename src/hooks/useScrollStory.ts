"use client";

import { useEffect, useState, useRef } from "react";
import { SectionId, SectionTarget } from "@/types";

export const SECTION_TARGETS: Record<SectionId, SectionTarget> = {
  hero: {
    id: "hero",
    x: 1.8,
    y: 0.15,
    z: 0.2,
    rotX: 0.1,
    rotY: -0.3,
    rotZ: 0.05,
    scale: 0.95
  },
  about: {
    id: "about",
    x: -1.4,
    y: -0.1,
    z: 0.0,
    rotX: 0.05,
    rotY: 0.4,
    rotZ: -0.05,
    scale: 0.9
  },
  skills: {
    id: "skills",
    x: 1.6,
    y: -0.2,
    z: -0.8,
    rotX: -0.05,
    rotY: -0.5,
    rotZ: 0.02,
    scale: 0.85
  },
  projects: {
    id: "projects",
    x: 1.2,
    y: 0.2,
    z: 0.3,
    rotX: 0.08,
    rotY: -0.25,
    rotZ: 0.0,
    scale: 0.95
  },
  research: {
    id: "research",
    x: -1.5,
    y: -0.1,
    z: 0.1,
    rotX: 0.0,
    rotY: 0.35,
    rotZ: -0.04,
    scale: 0.9
  },
  contact: {
    id: "contact",
    x: 0.0,
    y: 1.1,
    z: 0.2,
    rotX: -0.15,
    rotY: 0.0,
    rotZ: 0.0,
    scale: 0.9
  }
};

const SECTIONS_ORDER: SectionId[] = ['hero', 'about', 'skills', 'projects', 'research', 'contact'];

// Shared singleton ref for Three.js render loop without React state overhead
export const scrollProgressRef = {
  currentProgress: 0,
  activeSection: 'hero' as SectionId,
  sectionProgress: 0,
  targetConfig: SECTION_TARGETS.hero
};

export function useScrollStory() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

          // Determine current section
          const sectionElements = SECTIONS_ORDER.map(id => document.getElementById(id));
          const viewportMid = window.innerHeight * 0.45;

          let currentId: SectionId = 'hero';
          for (let i = 0; i < SECTIONS_ORDER.length; i++) {
            const el = sectionElements[i];
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
                currentId = SECTIONS_ORDER[i];
                break;
              }
            }
          }

          scrollProgressRef.currentProgress = progress;
          scrollProgressRef.activeSection = currentId;
          scrollProgressRef.targetConfig = SECTION_TARGETS[currentId];

          setActiveSection(currentId);
          setOverallProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeSection, overallProgress };
}
