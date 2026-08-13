import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  Search,
  Compass,
  BookOpen,
  Trophy,
  Cpu,
  Mail,
  FileText,
  Terminal,
  ShieldAlert,
  X,
  Gamepad2,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  name: string;
  description: string;
  category: 'Navigation' | 'External' | 'System';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const items: CommandItem[] = [
    {
      name: 'Overview / Story',
      description: 'Scroll to Saini Paul’s journey, education, and focus areas',
      category: 'Navigation',
      icon: Compass,
      action: () => scrollTo('#about'),
    },
    {
      name: 'Projects Showcase',
      description: 'Explore SmartHire, Online Tutor Finder, and CGAN research',
      category: 'Navigation',
      icon: BookOpen,
      action: () => scrollTo('#projects'),
    },
    {
      name: 'Achievements',
      description: 'View the Best Paper Award and extracurricular activity',
      category: 'Navigation',
      icon: Trophy,
      action: () => scrollTo('#achievements'),
    },
    {
      name: 'Core Skills',
      description: 'Explore programming, frameworks, databases, tools, and AI/ML',
      category: 'Navigation',
      icon: Cpu,
      action: () => scrollTo('#skills'),
    },
    {
      name: 'Contact',
      description: 'Open email, LinkedIn, GitHub, and LeetCode',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollTo('#contact'),
    },
    {
      name: 'Download Resume PDF',
      description: `Open ${portfolioData.name}'s resume`,
      category: 'External',
      icon: FileText,
      action: () => {
        window.open(portfolioData.resumeUrl, '_blank');
        onClose();
      },
    },
    {
      name: 'Open Terminal',
      description: 'Launch the interactive portfolio CLI',
      category: 'System',
      icon: Terminal,
      action: () => {
        window.dispatchEvent(new CustomEvent('toggle-terminal'));
        onClose();
      },
    },
    {
      name: 'Matrix Rain HUD',
      description: 'Launch the portfolio matrix animation',
      category: 'System',
      icon: ShieldAlert,
      action: () => {
        window.dispatchEvent(new CustomEvent('toggle-matrix'));
        onClose();
      },
    },
    {
      name: 'Play 2048',
      description: 'Launch the 2048 arcade game',
      category: 'System',
      icon: Gamepad2,
      action: () => {
        navigate('/2048');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    `${item.name} ${item.description} ${item.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length === 0
            ? 0
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredItems[selectedIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
        >
          <m.div
            ref={containerRef}
            initial={{ y: -20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-lg rounded-2xl bg-zinc-950/95 border border-zinc-800 glass shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-900 bg-zinc-900/35">
              <Search size={18} className="text-zinc-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search portfolio..."
                className="w-full bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 text-xs md:text-sm"
                autoComplete="off"
              />
              <button
                onClick={onClose}
                className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors rounded cursor-pointer"
                aria-label="Close Command Palette"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin">
              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = idx === selectedIndex;

                    return (
                      <button
                        key={item.name}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600/15 border border-purple-500/30 text-white'
                            : 'border border-transparent text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-500/25 text-purple-400' : 'bg-zinc-900 text-zinc-500'}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">{item.name}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{item.description}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded uppercase">
                          {item.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-zinc-600 font-mono text-xs">
                  No matching links or commands found.
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-900/15 flex items-center justify-between text-[9px] font-mono text-zinc-500 select-none">
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>Enter Select</span>
              </div>
              <span>ESC Close</span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
