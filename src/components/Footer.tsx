import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-6 border-t border-brand-border bg-brand-card/30 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Info */}
        <div className="text-center sm:text-left space-y-1">
          <p className="font-mono text-xs text-brand-text">
            © 2026 Saini Paul
          </p>
          <p className="text-[10px] text-brand-text-muted font-mono tracking-wider uppercase">
            Built with React + Vite + Tailwind CSS
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleScrollToTop}
          className="p-2.5 rounded-lg border border-brand-border bg-brand-card hover:bg-brand-border/40 hover:border-brand-accent/50 text-brand-text hover:text-brand-accent transition-all cursor-pointer shadow-md"
          aria-label="Scroll back to top of the page"
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
};
export default Footer;
