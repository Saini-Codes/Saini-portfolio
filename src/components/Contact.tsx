import React, { useState, useRef } from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import {
  GithubIcon as Github,
  LinkedinIcon as Linkedin,
  LeetcodeIcon as Leetcode,
} from './BrandIcons';
import { portfolioData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  };

  return (
    <section id="contact" className="w-full py-20 px-6 lg:px-8 border-t border-brand-border/40 bg-brand-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold">
            LET&apos;S CONNECT
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight mt-2">
            Get In Touch
          </h2>
          <div className="h-1 w-16 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="mb-16 text-center relative flex justify-center">
          <a
            href={`mailto:${portfolioData.socials.email}`}
            className="group relative inline-block text-decoration-none cursor-pointer py-8 px-4 select-none w-full max-w-4xl"
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
          >
            <div
              className="font-mihir font-black text-[2.2rem] sm:text-6xl md:text-[5.5rem] leading-[0.95] tracking-tight uppercase text-transparent transition-all duration-300 group-hover:scale-[1.01]"
              style={{
                WebkitTextStroke: '2px var(--brand-primary)',
                color: isHovered ? 'var(--brand-primary)' : 'transparent',
                fontStretch: '122%',
                fontWeight: 850,
              }}
            >
              <div>LET&apos;S BUILD</div>
              <div className="flex items-center justify-center gap-3">
                <span>SOMETHING REAL</span>
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-4 text-brand-accent"
                  style={{ WebkitTextStroke: '0px' }}
                >
                  →
                </span>
              </div>
            </div>
          </a>
        </div>

        <span
          ref={tooltipRef}
          className="fixed top-0 left-0 z-50 pointer-events-none -translate-x-1/2 -translate-y-12"
        >
          <span
            className={`inline-block px-3.5 py-1.5 rounded-full bg-brand-primary text-brand-bg text-[11px] font-mono font-bold tracking-widest uppercase shadow-2xl transition-all duration-200 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            ✉ Email Me
          </span>
        </span>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="sm:col-span-2 lg:col-span-4 p-6 rounded-2xl bg-brand-card/80 border border-brand-border hover:border-brand-accent/40 shadow-xl transition-all duration-300 group flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="p-4 rounded-xl bg-brand-accent-glow text-brand-accent border border-brand-accent/20 group-hover:scale-105 transition-transform duration-300">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-mono font-semibold uppercase text-brand-accent tracking-wider">
                  Email Address
                </p>
                <h4 className="font-heading font-bold text-lg md:text-xl text-brand-primary mt-1 select-all">
                  {portfolioData.socials.email}
                </h4>
              </div>
            </div>

            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-brand-primary text-brand-bg font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              Email Me Directly
              <ExternalLink size={13} />
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-brand-card/85 border border-brand-border hover:border-brand-accent/40 shadow-lg transition-all duration-300 group flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Linkedin size={20} />
              </div>
              <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-wider">Professional</span>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase text-brand-text-muted mt-4">LinkedIn</p>
              <h4 className="font-heading font-bold text-base text-brand-primary mt-1 truncate">
                Saini Paul
              </h4>
            </div>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-4 px-4 py-2 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-card text-brand-text hover:text-brand-accent font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              Connect On LinkedIn
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-brand-card/85 border border-brand-border hover:border-brand-accent/40 shadow-lg transition-all duration-300 group flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-zinc-800 text-white border border-zinc-700 group-hover:scale-105 transition-transform duration-300">
                <Github size={20} />
              </div>
              <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-wider">Codebase</span>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase text-brand-text-muted mt-4">GitHub</p>
              <h4 className="font-heading font-bold text-base text-brand-primary mt-1 truncate">
                Saini-Codes
              </h4>
            </div>
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="mt-4 px-4 py-2 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-card text-brand-text hover:text-brand-accent font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              Explore Repositories
              <ExternalLink size={11} />
            </a>
          </div>

          {portfolioData.socials.leetcode && (
            <div className="p-6 rounded-2xl bg-brand-card/85 border border-brand-border hover:border-brand-accent/40 shadow-lg transition-all duration-300 group flex flex-col justify-between h-48">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Leetcode size={20} />
                </div>
                <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-wider">Problem Solving</span>
              </div>
              <div>
                <p className="text-xs font-mono font-semibold uppercase text-brand-text-muted mt-4">LeetCode</p>
                <h4 className="font-heading font-bold text-base text-brand-primary mt-1 truncate">
                  SainiPaul
                </h4>
              </div>
              <a
                href={portfolioData.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-4 py-2 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-card text-brand-text hover:text-brand-accent font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                View Profile
                <ExternalLink size={11} />
              </a>
            </div>
          )}
        </div>

        <div className="mt-12 p-5 rounded-2xl bg-brand-card/40 border border-brand-border/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <MapPin className="text-brand-accent shrink-0" size={18} />
            <p className="text-xs md:text-sm text-brand-text-muted">
              Based in <span className="text-brand-primary font-semibold">{portfolioData.location}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <p className="text-xs text-brand-text-muted">
              Open to software, full-stack, and AI/ML opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
