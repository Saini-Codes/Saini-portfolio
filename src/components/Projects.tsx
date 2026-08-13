import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, BookOpen, ChevronDown } from 'lucide-react';
import { GithubIcon as Github } from './BrandIcons';
import { portfolioData } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleCaseStudyClick = (id: string) => {
    navigate(`/projects/${id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const displayedProjects = showAll ? portfolioData.projects : portfolioData.projects.slice(0, 4);

  return (
    <section id="projects" className="w-full py-20 px-6 lg:px-8 border-t border-brand-border/40 bg-brand-card/10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold">
            SHOWCASE
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary tracking-tight mt-2 uppercase">
            Featured Systems
          </h2>
          <div className="h-0.5 w-10 bg-brand-accent mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {displayedProjects.map((project: Project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl bg-brand-card border border-brand-border hover:border-brand-accent/30 shadow-md hover:shadow-brand-accent/5 transition-all duration-300 h-full overflow-hidden"
            >
              {/* Card Header Thumbnail */}
              <div className="relative aspect-video w-full bg-brand-bg overflow-hidden border-b border-brand-border/40">
                <img
                  src={project.image}
                  alt={`${project.title} Cover Thumbnail`}
                  className="w-full h-full object-cover brightness-95"
                />
                {/* Category Overlay tag */}
                <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border border-brand-accent/30 bg-brand-bg/80 text-brand-accent glass">
                  {project.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-brand-primary group-hover:text-brand-accent transition-colors">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-sans text-xs font-semibold text-brand-text/80 mt-1.5 leading-snug">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-brand-text-muted mt-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-brand-bg border border-brand-border text-brand-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center gap-3 pt-4 border-t border-brand-border/40 mt-5">
                    <button
                      onClick={() => handleCaseStudyClick(project.id)}
                      className="flex-1 px-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-card hover:border-brand-accent/50 text-brand-accent hover:text-brand-text font-bold text-[11px] tracking-wide flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <BookOpen size={13} />
                      Case Study
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-3 py-2.5 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-card hover:border-brand-accent/50 text-brand-text font-bold text-[11px] tracking-wide flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Github size={13} />
                      Source
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 rounded-lg bg-brand-primary text-brand-bg font-bold text-[11px] tracking-wide flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={13} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Works Button */}
        {portfolioData.projects.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setShowAll((prev) => !prev);
                if (showAll) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-accent/40 bg-brand-card hover:bg-brand-accent/10 text-brand-accent font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer group"
            >
              <span>{showAll ? 'Show Less Projects' : `View More Works (${portfolioData.projects.length - 4} More)`}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default Projects;

