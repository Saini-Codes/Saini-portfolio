import React from 'react';
import { BookOpen, Award, Compass, Star } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About: React.FC = () => {
  const education = portfolioData.education[0];

  const focusAreas = [
    'Full-Stack Web Development',
    'Artificial Intelligence & Machine Learning',
    'Research & Cybersecurity',
    'AI-Powered Application Development',
  ];

  return (
    <section id="about" className="w-full py-20 px-6 lg:px-8 border-t border-brand-border/40 bg-brand-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-brand-primary tracking-tight">
            About Me
          </h2>
          <div className="h-1 w-12 bg-brand-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-heading font-semibold text-xl md:text-2xl text-brand-primary flex items-center gap-2">
              <Compass className="text-brand-accent" size={20} />
              My Journey
            </h3>

            <p className="font-sans text-brand-text-muted leading-relaxed">
              I am an MCA student at {education.institution}, focused on full-stack development,
              Artificial Intelligence, Machine Learning, and practical software engineering.
              I enjoy turning ideas into useful applications with clean interfaces and reliable systems.
            </p>

            <p className="font-sans text-brand-text-muted leading-relaxed">
              My work includes SmartHire, an AI-powered recruitment platform, an online tutor discovery
              platform with an AI chatbot, and research on CGAN-based trace augmentation for ML-KEM.
              These projects have helped me combine software development with AI/ML and research-oriented problem solving.
            </p>

            <p className="font-sans text-brand-text-muted leading-relaxed">
              I am particularly interested in building practical products, learning emerging technologies,
              and applying AI to real-world problems.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-xl font-mono text-xs text-green-400 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-zinc-500 border-b border-zinc-900 pb-2 select-none">
                <span className="text-[10px] uppercase font-bold tracking-wide flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  &nbsp;Saini's Bash Terminal
                </span>
                <span className="text-[9px] text-zinc-600">v1.0.0</span>
              </div>

              <div className="space-y-1 text-zinc-300">
                <p className="text-green-500 font-bold">&gt; Welcome to Saini Paul's interactive portfolio CLI.</p>
                <p className="text-zinc-500">
                  Explore projects, resume information, and GitHub from the terminal.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
                  <span>visitor@saini:~$</span>
                  <span className="bg-green-500 w-1.5 h-3.5 animate-pulse" />
                </div>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('toggle-terminal'))}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-bold text-[11px] uppercase tracking-wide cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  Launch Terminal CLI
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-brand-card border border-brand-border/60 shadow-lg">
              <h3 className="font-heading font-semibold text-lg text-brand-primary mb-4 flex items-center gap-2">
                <BookOpen className="text-brand-accent" size={18} />
                Education
              </h3>

              <div className="space-y-2">
                <h4 className="font-heading font-bold text-sm md:text-base text-brand-text">
                  {education.institution}
                </h4>
                <p className="text-xs text-brand-accent font-semibold uppercase tracking-wider">
                  {education.degree} — {education.specialization}
                </p>
                <div className="flex justify-between items-center text-xs text-brand-text-muted pt-1">
                  <span>{education.duration}</span>
                  <span className="bg-brand-border/60 px-2 py-0.5 rounded font-mono font-medium">
                    CGPA: {education.gpa}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-card border border-brand-border/60 shadow-lg">
              <h3 className="font-heading font-semibold text-lg text-brand-primary mb-4 flex items-center gap-2">
                <Award className="text-brand-accent" size={18} />
                Focus Areas
              </h3>

              <ul className="space-y-3.5 text-sm text-brand-text-muted">
                {focusAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2.5">
                    <Star size={16} className="text-brand-accent mt-0.5 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
