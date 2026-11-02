"use client";

import { useState, useRef } from "react";
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

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
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
    scrollToSection(id);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const clickY = e.clientY ? e.clientY - rect.top : rect.height / 2;
    const currentId = rippleIdRef.current++;

    // Spawn expanding water ripple
    setRipples((prev) => [
      ...prev,
      { id: currentId, navId: id, x: clickX, y: clickY },
    ]);

    // Spawn subtle water droplets
    const newDroplets: WaterDroplet[] = [];
    const dropletColors = ["#FFFFFF", "#D6E8FF", "#A0C4FF", "#B8B5FF"];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 24 + 18;
      newDroplets.push({
        id: currentId * 100 + i,
        navId: id,
        originX: clickX,
        originY: clickY,
        targetX: clickX + Math.cos(angle) * distance,
        targetY: clickY + Math.sin(angle) * distance,
        size: Math.random() * 1.8 + 1.6,
        color: dropletColors[i % dropletColors.length],
      });
    }

    setDroplets((prev) => [...prev, ...newDroplets]);
    setDistortedItem(id);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== currentId));
      setDroplets((prev) => prev.filter((d) => Math.floor(d.id / 100) !== currentId));
    }, 700);

    setTimeout(() => {
      setDistortedItem((prev) => (prev === id ? null : prev));
    }, 400);
  };

  const scrollToSection = (id: SectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-5 sm:py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Marker */}
        <button
          onClick={() => scrollToSection("hero")}
          className="group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300 transition-opacity"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(100,200,255,0.85)]" />
            <span className="font-mono text-xs sm:text-sm tracking-mono-label font-medium text-white uppercase">
              {PERSONAL_INFO.name}
            </span>
          </div>
        </button>

        {/* Increased Size Halfcircle (Pill) Navigation Bar under Gently Glassy */}
        <nav
          className="hidden md:flex items-center space-x-1.5 obsidian-nav px-4 sm:px-5 py-2.5 relative rounded-full"
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
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-mono tracking-mono-label font-medium transition-all duration-200 cursor-pointer overflow-hidden ${
                  isDistorted ? "animate-water-meniscus" : ""
                } ${
                  isActive
                    ? "text-black shadow-[0_0_18px_rgba(110,180,255,0.45)]"
                    : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.06]"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(225, 240, 255, 0.90) 100%)"
                    : undefined,
                }}
              >
                {/* Active Indicator Shimmer */}
                {isActive && (
                  <span
                    className="absolute inset-0 pointer-events-none animate-water-surface opacity-30 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(100, 180, 255, 0.6) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Water Ripple on Click */}
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

                {/* Tiny Water Droplets */}
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
                      ["--target-x" as string]: `${drop.targetX - drop.originX}px`,
                      ["--target-y" as string]: `${drop.targetY - drop.originY}px`,
                    }}
                    aria-hidden="true"
                  />
                ))}

                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA: Halfcircle (Pill) Curvature */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-mono tracking-mono-label text-[#A6A6AE] hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-secondary px-6 py-2.5 text-xs sm:text-sm font-mono tracking-mono-label uppercase cursor-pointer rounded-full"
          >
            Connect
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] focus:outline-none obsidian-nav"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white/80" />}
        </button>
      </div>

      {/* Mobile Drawer: Gently Glassy rounded */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-1 p-4 obsidian-nav space-y-2 rounded-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-mono-label uppercase transition-all ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-[0_0_12px_rgba(100,180,255,0.3)]"
                    : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
