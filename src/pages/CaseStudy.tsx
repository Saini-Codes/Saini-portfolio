import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, ListChecks, HelpCircle, Milestone, FolderTree, BookOpen, Layers } from 'lucide-react';
import { GithubIcon as Github } from '../components/BrandIcons';
import { portfolioData } from '../data/portfolioData';

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the requested project
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-brand-bg">
        <h2 className="font-heading font-bold text-3xl text-brand-primary mb-4">
          Project Not Found
        </h2>
        <p className="text-brand-text-muted mb-8 text-center font-sans">
          The case study you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-brand-primary text-brand-bg font-semibold text-sm transition-opacity hover:opacity-90 flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-24 px-6 max-w-4xl mx-auto bg-brand-bg text-brand-text">
      {/* Back Link */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand-text-muted hover:text-brand-accent transition-colors mb-8 cursor-pointer uppercase"
      >
        <ArrowLeft size={14} />
        Back to Home
      </button>

      {/* Header Info */}
      <div className="space-y-4 mb-10">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border border-brand-accent/30 bg-brand-accent-glow text-brand-accent font-mono">
          {project.category} Case Study
        </span>
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-brand-primary tracking-tight leading-tight uppercase">
          {project.title}
        </h1>
        <p className="font-sans text-sm md:text-base text-brand-text-muted max-w-3xl leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Main Cover Banner */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden border border-brand-border bg-brand-card shadow-xl mb-10">
        <img
          src={project.image}
          alt={`${project.title} Banner`}
          className="w-full h-full object-cover brightness-95"
        />
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-4 py-6 border-y border-brand-border/40 mb-10">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-lg border border-brand-border bg-brand-card hover:bg-brand-card hover:border-brand-accent/50 text-brand-text font-bold text-xs transition-all flex items-center gap-2 cursor-pointer font-mono"
        >
          <Github size={15} />
          GITHUB REPOSITORY
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-lg bg-brand-primary text-brand-bg font-bold text-xs transition-opacity hover:opacity-90 flex items-center gap-2 cursor-pointer font-mono"
          >
            <ExternalLink size={15} />
            LIVE DEMO
          </a>
        )}
      </div>

      {/* Case Study Details */}
      <div className="space-y-12 font-sans">
        {/* Overview & Why I Built It */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-lg md:text-xl text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
              <Cpu className="text-brand-accent" size={18} />
              Overview
            </h2>
            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
              {project.description}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading font-bold text-lg md:text-xl text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
              <BookOpen className="text-brand-accent" size={18} />
              Why I Built It
            </h2>
            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
              {project.motivation}
            </p>
          </section>
        </div>

        {/* Problem Statement */}
        <section className="space-y-4 p-6 rounded-xl bg-brand-card border border-brand-border shadow-md">
          <h2 className="font-heading font-bold text-base md:text-lg text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
            <HelpCircle className="text-brand-accent" size={18} />
            Problem Statement
          </h2>
          <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* Tech Stack */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-base md:text-lg text-brand-primary uppercase tracking-wide">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-brand-card border border-brand-border text-brand-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Folder Structure and Architecture */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Folder Structure */}
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-lg md:text-xl text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
              <FolderTree className="text-brand-accent" size={18} />
              Folder Structure
            </h2>
            <pre className="p-4 rounded-xl bg-brand-card border border-brand-border text-xs text-brand-text-muted font-mono leading-relaxed overflow-x-auto">
              <code>{project.folderStructure}</code>
            </pre>
          </section>

          {/* Architecture */}
          {project.architecture && (
            <section className="space-y-4">
              <h2 className="font-heading font-bold text-lg md:text-xl text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
                <Layers className="text-brand-accent" size={18} />
                Architecture
              </h2>
              <div className="p-4 rounded-xl bg-brand-card border border-brand-border text-xs text-brand-text-muted leading-relaxed font-mono space-y-3">
                <div className="bg-brand-bg px-2.5 py-1.5 rounded border border-brand-border/40 text-center font-bold text-brand-primary">
                  Client UI (React/Compose)
                </div>
                <div className="text-center font-bold text-brand-accent">↓ REST / Flow</div>
                <div className="bg-brand-bg px-2.5 py-1.5 rounded border border-brand-border/40 text-center font-bold text-brand-primary">
                  Engine / API Service
                </div>
                <div className="text-center font-bold text-brand-accent">↓ Persistent Data</div>
                <div className="bg-brand-bg px-2.5 py-1.5 rounded border border-brand-border/40 text-center font-bold text-brand-primary">
                  Database / SQLite File
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Features */}
        <section className="space-y-4">
          <h2 className="font-heading font-bold text-lg md:text-xl text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
            <ListChecks className="text-brand-accent" size={18} />
            Features
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="p-4 rounded-lg border border-brand-border bg-brand-card/50 text-xs md:text-sm text-brand-text-muted leading-relaxed"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Challenges & Learnings */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="space-y-4 p-6 rounded-xl bg-brand-card/30 border border-brand-border shadow-md">
            <h3 className="font-heading font-bold text-sm md:text-base text-brand-primary uppercase tracking-wide">
              Challenges
            </h3>
            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
              {project.challenges}
            </p>
          </section>

          <section className="space-y-4 p-6 rounded-xl bg-brand-card/30 border border-brand-border shadow-md">
            <h3 className="font-heading font-bold text-sm md:text-base text-brand-primary uppercase tracking-wide">
              Learnings
            </h3>
            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed">
              {project.learnings}
            </p>
          </section>
        </div>

        {/* Future Scope */}
        {project.futureImprovements && project.futureImprovements.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-heading font-bold text-lg md:text-xl text-brand-primary flex items-center gap-2.5 uppercase tracking-wide">
              <Milestone className="text-brand-accent" size={18} />
              Future Scope
            </h2>
            <div className="overflow-hidden rounded-xl border border-brand-border bg-brand-card/40">
              <table className="w-full text-left text-xs md:text-sm border-collapse font-sans">
                <thead>
                  <tr className="bg-brand-border/50 text-brand-primary border-b border-brand-border font-mono text-xs">
                    <th className="p-3 w-16 text-center">Phase</th>
                    <th className="p-3">Enhancement Details</th>
                  </tr>
                </thead>
                <tbody>
                  {project.futureImprovements.map((imp, idx) => (
                    <tr key={idx} className="border-b border-brand-border/40 hover:bg-brand-card/85 transition-colors">
                      <td className="p-3 text-center font-mono text-brand-accent font-semibold">0{idx + 1}</td>
                      <td className="p-3 text-brand-text-muted">{imp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
export default CaseStudy;
