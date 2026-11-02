"use client";

import { useState, useRef, useEffect } from "react";
import { SectionId } from "@/types";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: SectionId;
}

interface NavRipple {
  id: number;
  navId: SectionId;
  x: number;
  y: number;
}

interface WaterDroplet {
  id: number;
  navId: SectionId;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
}

const NAV_ITEMS: { id: SectionId; label: string; index: string }[] = [
  { id: "hero", label: "Overview", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "research", label: "Research", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
];

export function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ripples, setRipples] = useState<NavRipple[]>([]);
  const [droplets, setDroplets] = useState<WaterDroplet[]>([]);
  const [distortedItem, setDistortedItem] = useState<SectionId | null>(null);

  const rippleIdRef = useRef(1);

  const handleNavClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: SectionId
  ) => {
    // 1. Smooth scroll to target section without any delay
    scrollToSection(id);

    // 2. Compute click position relative to the clicked button
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const clickY = e.clientY ? e.clientY - rect.top : rect.height / 2;

    const currentId = rippleIdRef.current++;

    // 3. Spawn expanding water ripple waves from clicked point
    setRipples((prev) => [
      ...prev,
      { id: currentId, navId: id, x: clickX, y: clickY },
    ]);

    // 4. Create 8-10 tiny radiating water droplets (splashing outward)
    const newDroplets: WaterDroplet[] = [];
    const dropletColors = ["#FFFFFF", "#D6E8FF", "#A0C4FF", "#B8B5FF"];
    const dropletCount = 9;

    for (let i = 0; i < dropletCount; i++) {
      const angle = (i / dropletCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 26 + 18;
      newDroplets.push({
        id: currentId * 100 + i,
        navId: id,
        originX: clickX,
        originY: clickY,
        targetX: clickX + Math.cos(angle) * distance,
        targetY: clickY + Math.sin(angle) * distance + (Math.random() * 6), // gentle gravity
        size: Math.random() * 2.2 + 1.8,
        color: dropletColors[i % dropletColors.length],
      });
    }

    setDroplets((prev) => [...prev, ...newDroplets]);

    // 5. Apply subtle liquid distortion to clicked item
    setDistortedItem(id);

    // 6. Clean up ripple & droplets after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== currentId));
      setDroplets((prev) => prev.filter((d) => Math.floor(d.id / 100) !== currentId));
    }, 750);

    setTimeout(() => {
      setDistortedItem((prev) => (prev === id ? null : prev));
    }, 450);
  };

  const scrollToSection = (id: SectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 lg:px-12 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => scrollToSection("hero")}
          className="group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300 transition-opacity"
        >
          <div className="flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(100,200,255,0.8)] opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-white uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs text-white/30 hidden sm:inline">/</span>
            <span className="text-xs text-[#A6A6AE] hidden sm:inline font-mono">
              VIT Vellore
            </span>
          </div>
        </button>

        {/* Desktop Navigation: Refined Obsidian Glass with Water Drop Ripple Physics */}
        <nav
          className="hidden md:flex items-center space-x-1 obsidian-nav px-3 py-1.5 relative"
          role="navigation"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isDistorted = distortedItem === item.id;
            const itemRipples = ripples.filter((r) => r.navId === item.id);
            const itemDroplets = droplets.filter((d) => d.navId === item.id);

            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer overflow-hidden ${
                  isDistorted ? "animate-water-meniscus" : ""
                } ${
                  isActive
                    ? "text-black font-semibold shadow-[0_0_18px_rgba(110,180,255,0.45),0_0_32px_rgba(160,130,255,0.25)] border border-white/40"
                    : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.06] hover:shadow-[0_0_12px_rgba(120,180,255,0.15)]"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(225, 240, 255, 0.92) 50%, rgba(210, 230, 255, 0.88) 100%)"
                    : undefined,
                }}
              >
                {/* Active Indicator: Flowing liquid water surface shimmer */}
                {isActive && (
                  <span
                    className="absolute inset-0 pointer-events-none animate-water-surface opacity-30"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(100, 180, 255, 0.6) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Expanding circular water-drop ripple waves */}
                {itemRipples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/60 animate-nav-water-ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* Tiny radiating splash micro-droplets */}
                {itemDroplets.map((drop) => (
                  <span
                    key={drop.id}
                    className="absolute pointer-events-none rounded-full animate-nav-droplet"
                    style={{
                      left: drop.originX,
                      top: drop.originY,
                      width: `${drop.size}px`,
                      height: `${drop.size}px`,
                      backgroundColor: drop.color,
                      boxShadow: `0 0 4px ${drop.color}`,
                      // Custom CSS variables for translation keyframes
                      ["--target-x" as string]: `${drop.targetX - drop.originX}px`,
                      ["--target-y" as string]: `${drop.targetY - drop.originY}px`,
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* Nav label */}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#A6A6AE] hover:text-cyan-200 transition-colors flex items-center space-x-1"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-secondary px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase cursor-pointer"
          >
            Connect
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-white/[0.06] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white/80" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-1 p-5 obsidian-nav space-y-3">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-[0_0_16px_rgba(100,180,255,0.4)]"
                      : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="opacity-50">{item.index}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#A6A6AE]">
            <span>{PERSONAL_INFO.degree}</span>
            <a
              href={`mailto:${PERSONAL_INFO.links.email}`}
              className="text-cyan-200 hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
