"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Mail, Send, ArrowUp, CheckCircle, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-24 pb-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16 flex-1 flex flex-col justify-center">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-[#9595B0] uppercase tracking-widest">
              05 // RETURN TO THE SURFACE
            </span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-light tracking-tighter text-white">
            Initiate <br />
            <span className="text-gradient-silver">First Contact.</span>
          </h2>

          {/* Central Philosophy Quote as specified */}
          <blockquote className="border-l-2 border-white/30 pl-4 py-1 italic text-lg sm:text-xl text-white/90 font-light">
            &ldquo;{PERSONAL_INFO.quote}&rdquo;
          </blockquote>
        </div>

        {/* Contact Layout: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pointer-events-auto">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm text-[#9595B0] leading-relaxed font-light">
              Open to collaborative research in deep learning, algorithmic development, high-performance visual systems, and innovative engineering challenges.
            </p>

            <div className="space-y-3">
              {/* Email direct copy box */}
              <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#B5B5C8]" />
                  <span className="font-mono text-xs text-white select-all">
                    {PERSONAL_INFO.links.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Verified Profiles */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all flex items-center space-x-3 group"
                >
                  <GithubIcon className="w-4 h-4 text-[#B5B5C8] group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <span className="font-mono text-xs text-white block">GitHub</span>
                    <span className="text-[10px] text-[#9595B0]">@hemanathan-r</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all flex items-center space-x-3 group"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#B5B5C8] group-hover:text-white transition-colors" />
                  <div className="text-left">
                    <span className="font-mono text-xs text-white block">LinkedIn</span>
                    <span className="text-[10px] text-[#9595B0]">/in/hemanathan-r</span>
                  </div>
                </a>
              </div>

              {/* Institution badge */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.015] text-xs font-mono text-[#9595B0] space-y-1">
                <div className="text-white font-medium">Vellore Institute of Technology</div>
                <div>School of Computer Science &amp; Engineering</div>
                <div className="text-white/40">Vellore, Tamil Nadu, India</div>
              </div>
            </div>
          </div>

          {/* Right Column: Monochromatic Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mx-auto text-white">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl text-white font-light">Transmission Received</h4>
                  <p className="text-xs text-[#9595B0] max-w-sm mx-auto font-light leading-relaxed">
                    Thank you for reaching out. Your dispatch has been logged and I will respond to your transmission promptly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white underline pt-2"
                  >
                    Send another dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#9595B0] uppercase tracking-wider block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#9595B0] uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@domain.edu"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#9595B0] uppercase tracking-wider block">
                      Subject / Research Inquiry
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Collaborative exploration on hybrid visual models"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#9595B0] uppercase tracking-wider block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details of your inquiry, prospective collaboration, or technical problem space..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full glass-button-primary py-3 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>Transmit Dispatch</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <footer className="mt-16 pt-8 border-t border-white/10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9595B0] pointer-events-auto">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">{PERSONAL_INFO.name}</span>
          <span className="text-white/30">/</span>
          <span>Integrated M.Tech CSE · VIT Vellore</span>
        </div>

        <div className="flex items-center space-x-6">
          <span>Obsidian Monochrome Aesthetic</span>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-white hover:text-white/70 transition-colors"
          >
            <span>Surface</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
