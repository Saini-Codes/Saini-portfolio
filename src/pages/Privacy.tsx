import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <article className="min-h-screen pt-32 pb-24 px-6 max-w-3xl mx-auto font-sans">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-sm text-brand-text-muted hover:text-brand-accent transition-colors mb-8 cursor-pointer group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <div className="space-y-4 mb-10 text-center">
        <div className="inline-flex p-3 rounded-full bg-brand-accent-glow text-brand-accent">
          <ShieldCheck size={36} />
        </div>
        <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-brand-primary tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-brand-text-muted">Last Updated: June 25, 2026</p>
      </div>

      <div className="space-y-8 text-brand-text-muted leading-relaxed text-sm md:text-base">
        <p>
          This privacy policy specifies how data is processed on the personal portfolio of <strong>{portfolioData.name}</strong>.
        </p>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-brand-primary">1. Data Collected by Contact Form</h2>
          <p>
            When you submit a query through the contact form, the details (Name, Email, Subject, and Message) are securely dispatched to Saini Paul's personal inbox using the <strong>EmailJS API</strong>. This data is not stored in any localized database, and it is never shared with third-party tracking services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-brand-primary">2. Analytics & Cookies</h2>
          <p>
            This website stores your style choices (Dark/Light mode preference) in <code>localStorage</code> to maintain a consistent aesthetic experience upon subsequent visits. We do not place advertising track-cookies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-lg text-brand-primary">3. Revisions</h2>
          <p>
            This policy may be amended at any time to align with new integrations. For inquiries regarding data security, please contact: <a href={`mailto:${portfolioData.socials.email}`} className="text-brand-accent hover:underline">{portfolioData.socials.email}</a>.
          </p>
        </section>
      </div>
    </article>
  );
};
export default Privacy;
