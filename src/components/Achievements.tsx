import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Award, Users, FileCheck, ExternalLink, Calendar, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

type TabType = 'achievements' | 'activities' | 'certificates';

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('achievements');

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'activities', label: 'Extra Curriculars', icon: Users },
    { id: 'certificates', label: 'Verified Certificates', icon: FileCheck },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="achievements" className="w-full py-20 px-6 lg:px-8 border-t border-brand-border/40 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold flex items-center justify-center gap-1.5">
            <Sparkles size={10} className="animate-pulse" />
            Milestones & Community
          </p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight mt-2 uppercase">
            Achievements & Activities
          </h2>
          <div className="h-1 w-12 bg-brand-accent mx-auto mt-4 rounded-full shadow-lg shadow-purple-500/30"></div>
        </div>

        {/* Custom Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-xl bg-brand-card/90 border border-brand-border/80 glass shadow-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-brand-accent text-brand-bg shadow-md'
                      : 'text-brand-text-muted hover:text-brand-primary hover:bg-brand-bg/40'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            {activeTab === 'achievements' && (
              <m.div
                key="achievements"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {portfolioData.achievements.map((item, idx) => (
                  <m.div
                    key={idx}
                    variants={itemVariants}
                    className="group flex flex-col justify-between rounded-2xl bg-brand-card border border-brand-border hover:border-brand-accent/30 shadow-md hover:shadow-brand-accent/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      {/* Cover Image */}
                      {item.image && (
                        <button
                          type="button"
                          onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: item.image } }))}
                          className="relative aspect-video w-full bg-brand-bg overflow-hidden border-b border-brand-border/40 block cursor-pointer text-left focus:outline-none"
                          title="View Details"
                        >
                          <img
                            src={item.image}
                            alt={`${item.title} Cover`}
                            className="w-full h-full object-cover brightness-95 group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </button>
                      )}
                      
                      <div className="p-6">
                        {/* Gradient Accent Overlay on Hover */}
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-accent to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-start justify-between gap-4">
                          <div className="p-3 rounded-xl bg-brand-accent-glow text-brand-accent border border-brand-accent/15">
                            <Award size={22} />
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-brand-text-muted bg-brand-bg border border-brand-border px-2 py-0.5 rounded-md">
                            <Calendar size={10} />
                            {item.date}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-lg md:text-xl text-brand-primary mt-5 group-hover:text-brand-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs font-mono text-indigo-400 mt-1 font-medium">
                          {item.issuer}
                        </p>
                        <p className="text-xs md:text-sm text-brand-text-muted mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </m.div>
                ))}
              </m.div>
            )}

            {activeTab === 'activities' && (
              <m.div
                key="activities"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {portfolioData.activities.map((item, idx) => (
                  <m.div
                    key={idx}
                    variants={itemVariants}
                    className="group flex flex-col justify-between rounded-2xl bg-brand-card border border-brand-border hover:border-brand-accent/30 shadow-md hover:shadow-brand-accent/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      {/* Cover Image */}
                      <button
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: item.image } }))}
                        className="relative aspect-video w-full bg-brand-bg overflow-hidden border-b border-brand-border/40 block cursor-pointer text-left focus:outline-none"
                        title="View Full Image"
                      >
                        <img
                          src={item.image}
                          alt={`${item.role} Cover`}
                          className="w-full h-full object-cover brightness-95 group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </button>

                      <div className="p-6">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-accent to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-start justify-between gap-4">
                          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                            <Users size={20} />
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-brand-text-muted bg-brand-bg border border-brand-border px-2 py-0.5 rounded-md">
                            <Calendar size={10} />
                            {item.duration}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-lg text-brand-primary mt-5 group-hover:text-brand-accent transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-xs font-mono text-brand-accent mt-1 font-medium">
                          {item.organization}
                        </p>
                        <p className="text-xs md:text-sm text-brand-text-muted mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </m.div>
                ))}
              </m.div>
            )}

            {activeTab === 'certificates' && (
              <m.div
                key="certificates"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {portfolioData.certificates.map((item, idx) => (
                  <m.div
                    key={idx}
                    variants={itemVariants}
                    className="group flex flex-col justify-between rounded-2xl bg-brand-card border border-brand-border hover:border-brand-accent/30 shadow-md hover:shadow-brand-accent/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div>
                      {/* Cover Image */}
                      <button
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src: item.image } }))}
                        className="relative aspect-video w-full bg-brand-bg overflow-hidden border-b border-brand-border/40 block cursor-pointer text-left focus:outline-none"
                        title="View Certificate"
                      >
                        <img
                          src={item.image}
                          alt={`${item.title} Cover`}
                          className="w-full h-full object-cover brightness-95 group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </button>

                      <div className="p-5">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-accent to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex items-start justify-between gap-3">
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                            <ShieldCheck size={20} />
                          </div>
                          <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-brand-text-muted bg-brand-bg border border-brand-border px-2 py-0.5 rounded-md">
                            {item.date}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-base text-brand-primary mt-4 group-hover:text-brand-accent transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[11px] font-mono text-indigo-400 mt-1">
                          {item.issuer}
                        </p>

                        {/* Certificate Summary */}
                        {item.summary && (
                          <p className="text-xs text-brand-text-muted mt-2 leading-relaxed font-sans">
                            {item.summary}
                          </p>
                        )}

                        <div className="mt-3">
                          <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-brand-text-muted">Credential ID:</span>
                          <p className="text-[10px] font-mono text-brand-primary bg-brand-bg px-2 py-1 rounded border border-brand-border mt-1 break-all select-all">
                            {item.credentialId || 'Not provided'}
                          </p>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {item.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[9px] font-mono bg-brand-bg px-2 py-0.5 rounded border border-brand-border text-brand-text-muted"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 w-full flex gap-2">
                      {item.certificateUrl && item.certificateUrl !== '#' && (
                        <a
                          href={item.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 px-2.5 py-2 rounded-lg border border-brand-border bg-brand-bg hover:bg-brand-card hover:border-brand-accent/50 text-brand-text hover:text-brand-accent font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer text-center"
                        >
                          See Certificate
                          <ExternalLink size={10} />
                        </a>
                      )}
                      {item.verifyUrl ? (
                        <a
                          href={item.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 px-2.5 py-2 rounded-lg border border-brand-accent/30 bg-brand-accent/5 hover:bg-brand-accent/10 hover:border-brand-accent text-brand-accent font-bold text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer text-center"
                        >
                          Verify Online
                          <ShieldCheck size={10} />
                        </a>
                      ) : (
                        <div className="flex-1 py-2 text-center text-[10px] font-semibold font-mono text-brand-text-muted bg-brand-bg/50 rounded-lg border border-brand-border/60 border-dashed">
                          Verification Link Not Added
                        </div>
                      )}
                    </div>
                  </m.div>
                ))}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
