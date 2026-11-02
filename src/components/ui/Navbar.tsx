"use client";

import { useState } from "react";
import { SectionId } from "@/types";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  activeSection: SectionId;
}

const NAV_ITEMS: { id: SectionId; label: string; number: string }[] = [
  { id: "hero", label: "Contact Zero", number: "00" },
  { id: "about", label: "Surface", number: "01" },
  { id: "skills", label: "Ecosystem", number: "02" },
  { id: "projects", label: "Depths", number: "03" },
  { id: "research", label: "Unknown", number: "04" },
  { id: "contact", label: "Return", number: "05" },
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => scrollToSection("hero")}
          className="group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <span className="font-mono text-xs text-[#9595B0] tracking-widest block uppercase">
            ABYSS // PORTFOLIO
          </span>
          <span className="text-sm font-semibold tracking-wider text-white group-hover:text-white/80 transition-colors uppercase">
            {PERSONAL_INFO.name}.
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 glass-panel px-4 py-2 rounded-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "text-black bg-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "text-[#9595B0] hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Connect action on desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={PERSONAL_INFO.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#9595B0] hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>GH</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <div className="w-[1px] h-3 bg-white/10" />
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Connect
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-2 p-6 glass-panel rounded-2xl border border-white/10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono tracking-wider uppercase transition-colors ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "text-[#9595B0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-60">{item.number}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9595B0]">
            <span>VIT Vellore · 2024–2029</span>
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
