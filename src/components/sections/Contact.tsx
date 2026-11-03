"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { Mail, ArrowUpRight, Check, Copy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Contact() {
  // Contact form state
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

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 sm:py-36 z-10 pointer-events-none"
      aria-label="Contact Section"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header: Space Grotesk */}
        <div className="max-w-xl space-y-3">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.06]">
            Get in <br />
            <span className="text-hero-gradient font-medium">Touch.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A6A6AE] font-normal leading-[1.65]">
            Open for technical inquiries, research collaboration in machine learning and computer vision, and engineering opportunities.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links & Profiles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email One-Click Copy: Halfcircle (Pill) */}
            <div className="p-3.5 px-6 rounded-full bg-white/[0.03] border border-white/[0.12] backdrop-blur-md flex items-center justify-between pointer-events-auto">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#A6A6AE]" />
                <span className="font-sans text-sm sm:text-base font-medium text-white select-all">
                  {PERSONAL_INFO.links.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-full hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors cursor-pointer"
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

            {/* Profiles: GitHub & LinkedIn Pills */}
            <div className="grid grid-cols-2 gap-3 pointer-events-auto">
              <a
                href={PERSONAL_INFO.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 px-6 rounded-full bg-white/[0.025] border border-white/[0.10] hover:border-white/[0.25] backdrop-blur-md transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <GithubIcon className="w-4 h-4 text-[#A6A6AE] group-hover:text-white transition-colors" />
                  <span className="font-sans text-sm sm:text-base font-medium text-white">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-white" />
              </a>

              <a
                href={PERSONAL_INFO.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 px-6 rounded-full bg-white/[0.025] border border-white/[0.10] hover:border-white/[0.25] backdrop-blur-md transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#A6A6AE] group-hover:text-white transition-colors" />
                  <span className="font-sans text-sm sm:text-base font-medium text-white">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-white" />
              </a>
            </div>

            {/* Location Tag */}
            <div className="pt-1 font-sans text-sm text-white/50">
              Vellore, Tamil Nadu, India
            </div>
          </div>

          {/* Right Column: Clean Minimal Contact Form */}
          <div className="lg:col-span-7 pointer-events-auto">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.10] backdrop-blur-md">
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
                    className="font-sans text-sm font-medium text-white/60 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs sm:text-sm tracking-wider font-semibold text-[#A6A6AE] uppercase block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full font-sans px-4 py-2.5 rounded-full bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs sm:text-sm tracking-wider font-semibold text-[#A6A6AE] uppercase block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full font-sans px-4 py-2.5 rounded-full bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs sm:text-sm tracking-wider font-semibold text-[#A6A6AE] uppercase block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message or collaboration idea..."
                      className="w-full font-sans px-4 py-3 rounded-2xl bg-black/60 border border-white/[0.12] focus:border-white/40 text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3.5 text-sm sm:text-base font-sans font-medium cursor-pointer mt-2 rounded-full"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
