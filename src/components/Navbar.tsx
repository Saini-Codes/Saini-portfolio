import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Gamepad2 } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // 1. Header background scrolled transition
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Scrollspy active section tracker (only on home page)
      if (location.pathname === '/') {
        const sections = ['#about', '#projects', '#skills', '#achievements', '#contact'];
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        let active = '#about';
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.querySelector(sections[i]) as HTMLElement;
          if (el) {
            if (scrollPosition >= el.offsetTop) {
              active = sections[i];
              break;
            }
          }
        }
        
        // Fallback to top section if at the very top of page
        if (window.scrollY < 100) {
          active = '#about';
        }
        setActiveSection(active);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set active section on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { num: '01', label: 'OVERVIEW', hash: '#about' },
    { num: '02', label: 'PROJECTS', hash: '#projects' },
    { num: '03', label: 'SKILLS', hash: '#skills' },
    { num: '04', label: 'MILESTONES', hash: '#achievements' },
    { num: '05', label: 'CONTACT', hash: '#contact', border: true },
  ];

  const handleNavClick = (hash: string) => {
    setIsOpen(false);
    setActiveSection(hash);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 glass border-b border-brand-border/30 shadow-md'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left Side: Logo & Name */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('#about');
          }}
          className="flex items-center gap-3 select-none group"
        >
          <img
            src="/Saini_logo.png"
            alt="Saini Paul Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105 rounded"
          />
          <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-brand-primary font-bold transition-colors group-hover:text-brand-accent">
            SAINI.PAUL
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-6 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.hash && location.pathname === '/';
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.hash)}
                  className={`relative font-mono text-[11px] tracking-widest transition-all py-2 cursor-pointer ${
                    link.border
                      ? 'border border-brand-border px-4 py-1.5 hover:border-brand-accent hover:text-brand-accent'
                      : isActive
                      ? 'text-brand-accent'
                      : 'text-brand-text-muted hover:text-brand-text'
                  }`}
                >
                  <span className="text-[10px] opacity-40 mr-1.5">{link.num}</span>
                  {link.label}

                  {/* Sliding Underline Animation */}
                  {isActive && !link.border && (
                    <m.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Game Route Link */}
          <Link
            to="/2048"
            className="border border-brand-border h-9 w-9 flex items-center justify-center hover:border-brand-accent text-brand-text hover:text-brand-accent cursor-pointer transition-all rounded-lg bg-brand-bg/50"
            aria-label="Play 2048 Arcade Game"
            title="Play 2048 Arcade Game"
          >
            <Gamepad2 size={16} className="text-brand-accent" />
          </Link>

          {/* Premium Theme Toggle Button matching custom layout */}
          <button
            onClick={toggleTheme}
            className="border border-brand-border h-9 w-9 flex items-center justify-center hover:border-brand-accent text-brand-text hover:text-brand-accent cursor-pointer transition-all rounded-lg bg-brand-bg/50"
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-brand-accent" />
            ) : (
              <Moon size={15} className="text-brand-primary" />
            )}
          </button>

          {/* Terminal Toggle Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-terminal'))}
            className="border border-brand-border h-9 px-3 hover:border-brand-accent text-brand-text hover:text-brand-accent font-mono text-[11px] tracking-widest cursor-pointer transition-all flex items-center justify-center rounded-lg bg-brand-bg/50"
            aria-label="Toggle Terminal Mode"
            title="Open Interactive Terminal"
          >
            <span>&gt;_</span>
          </button>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex items-center space-x-3 lg:hidden">
          <Link
            to="/2048"
            className="border border-brand-border h-8 w-8 flex items-center justify-center text-brand-text cursor-pointer rounded-lg bg-brand-bg/50"
            title="Play 2048 Arcade Game"
          >
            <Gamepad2 size={14} className="text-brand-accent" />
          </Link>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-terminal'))}
            className="border border-brand-border h-8 px-2.5 flex items-center justify-center text-brand-text font-mono text-[10px] tracking-widest cursor-pointer rounded-lg bg-brand-bg/50"
            title="Open Interactive Terminal"
          >
            &gt;_
          </button>
          <button
            onClick={toggleTheme}
            className="border border-brand-border h-8 w-8 flex items-center justify-center text-brand-text cursor-pointer rounded-lg bg-brand-bg/50"
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <Sun size={14} className="text-brand-accent" />
            ) : (
              <Moon size={14} className="text-brand-primary" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-brand-text hover:text-brand-accent transition-colors cursor-pointer"
            aria-label="Toggle Navigation Drawer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass absolute top-full left-0 right-0 border-b border-brand-border/40 py-6 px-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.hash && location.pathname === '/';
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.hash)}
                    className={`text-left font-mono text-xs tracking-widest py-2 transition-colors cursor-pointer ${
                      link.border
                        ? 'border border-brand-border/60 text-center py-2 rounded-lg hover:border-brand-accent text-brand-accent'
                        : isActive
                        ? 'text-brand-accent'
                        : 'text-brand-text-muted hover:text-brand-text'
                    }`}
                  >
                    <span className="text-[10px] opacity-40 mr-2">{link.num}</span>
                    {link.label}
                  </button>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
