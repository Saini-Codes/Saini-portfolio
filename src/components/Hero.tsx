import React, { useEffect, useRef } from 'react';
import { m, useInView, animate } from 'framer-motion';
import {
  FileText,
  ArrowRight,
  Mail,
} from 'lucide-react';
import {
  GithubIcon as Github,
  LinkedinIcon as Linkedin,
  LeetcodeIcon as Leetcode,
} from './BrandIcons';
import { portfolioData } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

const CountUpNumber: React.FC<{
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}> = ({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(nodeRef, {
    once: true,
    margin: '-50px',
  });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;

      if (!node) return;

      const controls = animate(0, value, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(latest) {
          node.textContent =
            prefix +
            latest.toFixed(decimals) +
            suffix;
        },
      });

      return () => controls.stop();
    }
  }, [
    isInView,
    value,
    decimals,
    prefix,
    suffix,
  ]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const heroRef =
    React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const finePointer = window.matchMedia(
      '(pointer: fine)'
    ).matches;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced || !finePointer) return;

    const chars =
      hero.querySelectorAll('.kinetic-char');

    if (!chars.length) return;

    let raf: number | null = null;

    let mx = 0;
    let my = 0;

    const RADIUS = 220;

    const update = () => {
      raf = null;

      chars.forEach((node) => {
        const ch = node as HTMLElement;

        const r = ch.getBoundingClientRect();

        const charCenterX =
          r.left + r.width / 2;

        const charCenterY =
          r.top + r.height / 2;

        const d = Math.hypot(
          mx - charCenterX,
          my - charCenterY
        );

        const t = Math.max(
          0,
          1 - d / RADIUS
        );

        if (t > 0.01) {
          const wght = (
            850 - 330 * t
          ).toFixed(0);

          const wdth = (
            125 - 45 * t
          ).toFixed(1);

          ch.style.fontVariationSettings =
            `'wght' ${wght}, 'wdth' ${wdth}`;
        } else {
          ch.style.fontVariationSettings =
            '';
        }
      });
    };

    const handlePointerMove = (
      e: PointerEvent
    ) => {
      mx = e.clientX;
      my = e.clientY;

      if (raf === null) {
        raf = requestAnimationFrame(update);
      }
    };

    const handlePointerLeave = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }

      chars.forEach((node) => {
        (
          node as HTMLElement
        ).style.fontVariationSettings = '';
      });
    };

    hero.addEventListener(
      'pointermove',
      handlePointerMove
    );

    hero.addEventListener(
      'pointerleave',
      handlePointerLeave
    );

    return () => {
      hero.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      hero.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );

      if (raf !== null) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  const handleScrollToProjects = () => {
    const el =
      document.querySelector('#projects');

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const education =
    portfolioData.education[0];

  return (
    <section
      ref={heroRef}
      className="w-full min-h-screen flex items-center justify-center pt-28 pb-16 px-6 lg:px-8 bg-brand-bg"
    >
      <div className="max-w-7xl w-full mx-auto">

        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >

          {/* =========================
              LEFT COLUMN
          ========================== */}

          <div className="lg:col-span-7 space-y-8">

            <div className="space-y-4">

              {/* Subtitle */}

              <m.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-accent-glow text-xs font-semibold text-brand-accent tracking-wider uppercase"
              >
                <span>
                  Software & AI Engineering
                </span>
              </m.div>

              {/* =========================
                  NAME
              ========================== */}

              <m.h1
                variants={itemVariants}
                className="font-mihir font-black tracking-tight uppercase leading-[0.88] select-none"
                style={{
                  fontStretch: '125%',
                  fontWeight: 850,
                  fontSize:
                    'clamp(2.4rem, 7.5vw, 5.2rem)',
                }}
              >

                {/* SAINI */}

                <span className="block overflow-hidden pb-1 -mb-1 whitespace-nowrap text-brand-primary">
                  {'SAINI'.split('').map(
                    (char, i) => (
                      <span
                        key={i}
                        className="kinetic-char inline-block"
                        style={{
                          fontVariationSettings:
                            "'wght' 850, 'wdth' 125",
                          willChange:
                            'font-variation-settings',
                        }}
                      >
                        {char}
                      </span>
                    )
                  )}
                </span>

                {/* PAUL */}

                <span className="block overflow-hidden pb-1 -mb-1 text-brand-accent whitespace-nowrap">
                  {'PAUL'.split('').map(
                    (char, i) => (
                      <span
                        key={i}
                        className="kinetic-char inline-block"
                        style={{
                          fontVariationSettings:
                            "'wght' 850, 'wdth' 125",
                          willChange:
                            'font-variation-settings',
                        }}
                      >
                        {char}
                      </span>
                    )
                  )}
                </span>

              </m.h1>

              {/* Bio */}

              <m.p
                variants={itemVariants}
                className="text-sm md:text-base text-brand-text-muted max-w-xl leading-relaxed font-sans"
              >
                {portfolioData.bio}
              </m.p>

              {/* Status Badge */}

              <m.div
                variants={itemVariants}
                className="pt-2"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 w-fit select-none">

                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>

                  <span className="text-green-400 text-xs font-medium">
                    Open to Opportunities · 2027
                  </span>

                </div>
              </m.div>

            </div>

            {/* =========================
                SPECIFICATIONS
            ========================== */}

            <m.div
              variants={itemVariants}
              className="border-t border-brand-border/60"
            >

              <table className="w-full text-left font-sans text-xs md:text-sm text-brand-text border-collapse">

                <tbody>

                  {/* Education */}

                  <tr className="border-b border-brand-border/40">

                    <td className="py-3 font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400 uppercase w-28 md:w-36">
                      Education
                    </td>

                    <td className="py-3 text-brand-primary font-medium">

                      {education.degree}

                      <br />

                      <span className="text-xs text-brand-text-muted">
                        {education.institution}
                      </span>

                    </td>

                  </tr>

                  {/* CGPA */}

                  <tr className="border-b border-brand-border/40">

                    <td className="py-3 font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400 uppercase">
                      CGPA
                    </td>

                    <td className="py-3 text-brand-primary font-medium font-mono">
                      {education.gpa || 'N/A'} / 10
                    </td>

                  </tr>

                  {/* Projects */}

                  <tr className="border-b border-brand-border/40">

                    <td className="py-3 font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400 uppercase">
                      Featured Projects
                    </td>

                    <td className="py-3 text-brand-primary font-medium">

                      <div className="flex flex-wrap gap-2 mt-1">

                        {portfolioData.projects
                          .slice(0, 4)
                          .map((project) => (
                            <a
                              href="#projects"
                              key={project.id}
                              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-brand-accent/10 text-brand-accent border border-brand-accent/20 hover:bg-brand-accent/20 hover:border-brand-accent/40 transition-all cursor-pointer"
                            >
                              {project.title}
                            </a>
                          ))}

                      </div>

                    </td>

                  </tr>

                  {/* Languages */}

                  <tr className="border-b border-brand-border/40">

                    <td className="py-3 font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400 uppercase">
                      Languages
                    </td>

                    <td className="py-3 text-brand-primary font-medium font-mono text-xs text-brand-accent">
                      {portfolioData.skills.languages
                        .slice(0, 4)
                        .join(' · ')}
                    </td>

                  </tr>

                  {/* Location */}

                  <tr className="border-b border-brand-border/40">

                    <td className="py-3 font-mono text-[10px] tracking-wider text-gray-600 dark:text-gray-400 uppercase">
                      Location
                    </td>

                    <td className="py-3 text-brand-primary font-medium">
                      {portfolioData.location}
                    </td>

                  </tr>

                </tbody>

              </table>

            </m.div>

            {/* =========================
                STATS
            ========================== */}

            <m.div
              variants={itemVariants}
              className="flex flex-row items-center justify-between gap-3 md:gap-6 py-5 border-y border-brand-border/40 my-6 w-full"
            >

              {/* Projects */}

              <div className="flex-1 flex flex-col gap-1">

                <div className="text-2xl md:text-3xl font-bold text-brand-accent font-mono leading-none">
                  <CountUpNumber
                    value={3}
                    suffix="+"
                  />
                </div>

                <div className="text-[10px] tracking-widest text-brand-text-muted mt-1 uppercase font-mono leading-tight">
                  PROJECTS
                  <br />
                  BUILT
                </div>

              </div>

              <div className="w-px h-8 bg-brand-border shrink-0" />

              {/* Git Commits */}

              <div className="flex-1 flex flex-col gap-1">

                <div className="text-2xl md:text-3xl font-bold text-brand-accent font-mono leading-none">
                  <CountUpNumber
                    value={70}
                    suffix="+"
                  />
                </div>

                <div className="text-[10px] tracking-widest text-brand-text-muted mt-1 uppercase font-mono leading-tight">
                  GIT
                  <br />
                  COMMITS
                </div>

              </div>

              <div className="w-px h-8 bg-brand-border shrink-0" />

              {/* Pull Requests */}

              <div className="flex-1 flex flex-col gap-1">

                <div className="text-2xl md:text-3xl font-bold text-brand-accent font-mono leading-none">
                  <CountUpNumber
                    value={4}
                    suffix="+"
                  />
                </div>

                <div className="text-[10px] tracking-widest text-brand-text-muted mt-1 uppercase font-mono leading-tight">
                  Repositories
                </div>

              </div>

              <div className="w-px h-8 bg-brand-border shrink-0" />

              {/* CGPA */}

              <div className="flex-1 flex flex-col gap-1">

                <div className="text-2xl md:text-3xl font-bold text-brand-accent font-mono leading-none">
                  <CountUpNumber
                    value={Number(
                      education.gpa || 0
                    )}
                    decimals={2}
                  />
                </div>

                <div className="text-[10px] tracking-widest text-brand-text-muted mt-1 uppercase font-mono leading-tight">
                  CGPA
                </div>

              </div>

            </m.div>

            {/* =========================
                CTA BUTTONS
            ========================== */}

            <m.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >

              {/* View Work */}

              <button
                onClick={
                  handleScrollToProjects
                }
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-brand-primary text-brand-bg font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                View My Work
                <ArrowRight size={14} />
              </button>

              {/* Resume */}

              <a
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();

                  document
                    .querySelector('#resume')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-brand-border bg-brand-card/50 hover:bg-brand-card hover:border-brand-accent/50 text-brand-text font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >

                <FileText
                  size={14}
                  className="text-brand-accent"
                />

                Preview Resume

              </a>

              {/* =========================
                  SOCIAL LINKS
              ========================== */}

              <div className="flex flex-wrap items-center gap-3 pl-0 sm:pl-4 border-l border-none sm:border-brand-border text-brand-text-muted">

                {/* GitHub */}

                <div className="relative group">

                  <a
                    href={
                      portfolioData.socials.github
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand-accent transition-colors block"
                    aria-label="GitHub Profile"
                  >
                    <Github size={18} />
                  </a>

                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-30">
                    GitHub
                  </span>

                </div>

                {/* LinkedIn */}

                <div className="relative group">

                  <a
                    href={
                      portfolioData.socials.linkedin
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand-accent transition-colors block"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={18} />
                  </a>

                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-30">
                    LinkedIn
                  </span>

                </div>

                {/* LeetCode */}

                {portfolioData.socials
                  .leetcode && (
                  <div className="relative group">

                    <a
                      href={
                        portfolioData.socials
                          .leetcode
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-brand-accent transition-colors block"
                      aria-label="LeetCode Profile"
                    >
                      <Leetcode size={18} />
                    </a>

                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-30">
                      LeetCode
                    </span>

                  </div>
                )}

                {/* Email */}

                <div className="relative group">

                  <a
                    href={`mailto:${portfolioData.socials.email}`}
                    className="hover:text-brand-accent transition-colors block"
                    aria-label="Send Email"
                  >
                    <Mail size={18} />
                  </a>

                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md z-30">
                    Email
                  </span>

                </div>

              </div>

            </m.div>

          </div>

          {/* =========================
              RIGHT COLUMN
          ========================== */}

          <div className="lg:col-span-5 flex items-end justify-center mt-8 lg:mt-0">

            <m.div
              variants={itemVariants}
              className="relative w-full flex items-end justify-center h-[400px] md:h-[560px] overflow-visible"
            >

              {/* Ambient backdrop texture */}

              <div
                className="absolute w-80 h-80 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, var(--color-brand-accent, rgba(234,88,12,0.15)) 1px, transparent 1px)',
                  backgroundSize:
                    '20px 20px',
                }}
              />

              {/* Soft ambient glow */}

              <div className="absolute w-72 h-72 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/15 blur-[70px] pointer-events-none" />

              {/* Ring */}

              <div className="absolute w-80 h-80 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-brand-border/40 rounded-full pointer-events-none" />

              {/* Profile Photo */}

              <img
                src="/placeholders/hero.png"
                alt="Saini Paul Profile"
                className="relative z-10 max-h-full w-auto object-contain"
              />

            </m.div>

          </div>

        </m.div>

      </div>
    </section>
  );
};

export default Hero;