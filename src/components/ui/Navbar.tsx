"use client";

import { useState } from "react";
import { SectionId } from "@/types";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: SectionId;
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
          className="group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white transition-opacity"
        >
          <div className="flex items-center space-x-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-white uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs text-white/30 hidden sm:inline">/</span>
            <span className="text-xs text-[#A6A6AE] hidden sm:inline font-mono">
              VIT Vellore
            </span>
          </div>
        </button>

        {/* Desktop Navigation: Refined Obsidian Glass with small corner radius */}
        <nav className="hidden md:flex items-center space-x-1 obsidian-nav px-3 py-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-black bg-white font-medium"
                    : "text-[#A6A6AE] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <span>{item.label}</span>
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
            className="text-xs font-mono text-[#A6A6AE] hover:text-white transition-colors flex items-center space-x-1"
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
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-mono tracking-wider uppercase transition-colors ${
                    isActive
                      ? "bg-white text-black font-medium"
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
              className="text-white hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
