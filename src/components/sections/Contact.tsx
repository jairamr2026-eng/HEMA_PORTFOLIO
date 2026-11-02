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
      <div className="max-w-7xl mx-auto w-full space-y-12 flex-1 flex flex-col justify-center">
        {/* Section Header: Space Grotesk, Weight 500 */}
        <div className="max-w-xl space-y-3 pointer-events-auto">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.06]">
            Get in <br />
            <span className="text-hero-gradient font-medium">Touch.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A6A6AE] font-normal leading-[1.65]">
            Open for technical inquiries, research collaboration in machine learning and computer vision, and engineering opportunities.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pointer-events-auto">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email One-Click Copy */}
            <div className="p-4 rounded-lg bg-white/[0.025] border border-white/[0.10] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#A6A6AE]" />
                <span className="font-mono text-xs tracking-mono-label text-white select-all">
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
                  <Check className="w-4 h-4 text-cyan-300" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Profiles: IBM Plex Mono */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.22] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <GithubIcon className="w-4 h-4 text-[#A6A6AE] group-hover:text-white transition-colors" />
                  <span className="font-mono text-xs tracking-mono-label text-white">GitHub</span>
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
                  <span className="font-mono text-xs tracking-mono-label text-white">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-white" />
              </a>
            </div>

            {/* Location Tag */}
            <div className="pt-1 font-mono text-xs tracking-mono-label text-white/40">
              Vellore, Tamil Nadu, India
            </div>
          </div>

          {/* Right Column: Clean Minimal Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-xl bg-white/[0.02] border border-white/[0.10]">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-2.5">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mx-auto text-cyan-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading text-base text-white font-medium">Message Sent</h4>
                  <p className="font-sans text-xs text-[#A6A6AE] max-w-sm mx-auto font-normal leading-relaxed">
                    Thank you. I have received your message and will reply shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="font-mono text-xs tracking-mono-label text-white/50 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs tracking-mono-label text-[#A6A6AE] uppercase block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full font-sans px-3.5 py-2.5 rounded-md bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs tracking-mono-label text-[#A6A6AE] uppercase block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full font-sans px-3.5 py-2.5 rounded-md bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs tracking-mono-label text-[#A6A6AE] uppercase block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message or collaboration idea..."
                      className="w-full font-sans px-3.5 py-2.5 rounded-md bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-2.5 text-xs font-mono tracking-mono-label uppercase cursor-pointer mt-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Clean Minimal Footer: IBM Plex Mono */}
      <footer className="mt-14 pt-6 border-t border-white/[0.08] max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono tracking-mono-label text-[#A6A6AE] pointer-events-auto">
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">{PERSONAL_INFO.name}</span>
          <span className="text-white/20">·</span>
          <span>{PERSONAL_INFO.institution}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
}
