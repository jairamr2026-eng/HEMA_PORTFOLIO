"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Mail, ArrowUpRight, ArrowUp, Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.links.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 pb-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 flex-1 flex flex-col justify-center">
        {/* Section Header */}
        <div className="max-w-3xl space-y-5 pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#A6A6AE] tracking-[0.2em] uppercase">
              05 // CONTACT
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="font-mono text-xs text-white/40">RETURN TO THE SURFACE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
            Initiate Contact.
          </h2>

          {/* Required Tagline */}
          <blockquote className="border-l-2 border-white/25 pl-4 py-1 italic text-lg sm:text-xl text-[#A6A6AE] font-light">
            &ldquo;{PERSONAL_INFO.quote}&rdquo;
          </blockquote>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pointer-events-auto">
          {/* Left Column: Direct Inquiries and Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm text-[#A6A6AE] leading-relaxed font-light">
              Available for technical inquiries, research collaboration in deep learning and computer vision, and engineering opportunities.
            </p>

            <div className="space-y-3">
              {/* Email One-Click Copy */}
              <div className="p-4 rounded-lg bg-white/[0.025] border border-white/[0.10] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#A6A6AE]" />
                  <span className="font-mono text-xs text-white select-all">
                    {PERSONAL_INFO.links.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Profiles */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.22] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <GithubIcon className="w-4 h-4 text-[#A6A6AE] group-hover:text-white transition-colors" />
                    <span className="font-mono text-xs text-white">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-white" />
                </a>

                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.22] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <LinkedinIcon className="w-4 h-4 text-[#A6A6AE] group-hover:text-white transition-colors" />
                    <span className="font-mono text-xs text-white">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-white" />
                </a>
              </div>

              {/* Academic Location */}
              <div className="pt-2 text-xs font-mono text-white/40 space-y-1">
                <div>VIT Vellore · SCOPE</div>
                <div>Vellore, Tamil Nadu, India</div>
              </div>
            </div>
          </div>

          {/* Right Column: Restrained Minimal Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.10]">
              {formSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mx-auto text-white">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg text-white font-normal">Transmission Received</h4>
                  <p className="text-xs text-[#A6A6AE] max-w-sm mx-auto font-light leading-relaxed">
                    Thank you. Your dispatch has been logged and I will respond to your transmission promptly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="font-mono text-xs text-white/50 hover:text-white underline pt-2 cursor-pointer"
                  >
                    Send another dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#A6A6AE] uppercase tracking-wider block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-md bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#A6A6AE] uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-md bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#A6A6AE] uppercase tracking-wider block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details of your inquiry, collaboration, or project scope..."
                      className="w-full px-3.5 py-2.5 rounded-md bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-2.5 text-xs font-mono uppercase tracking-widest cursor-pointer mt-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-white/[0.08] max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A6A6AE] pointer-events-auto">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">{PERSONAL_INFO.name}</span>
          <span className="text-white/20">/</span>
          <span>{PERSONAL_INFO.degree}</span>
          <span className="text-white/20">/</span>
          <span>{PERSONAL_INFO.institution}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span>Return to surface</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
}
