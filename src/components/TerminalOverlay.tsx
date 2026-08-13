import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  type: 'input' | 'output';
  text: string | React.ReactNode;
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    { type: 'output', text: 'Welcome to Saini\'s Interactive Portfolio Shell!' },
    { type: 'output', text: 'Type "help" to see all available commands.' },
    { type: 'output', text: '' }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commandText = input.trim();
    if (!commandText) return;

    // Log the user's input command
    const newLogs: CommandLog[] = [...logs, { type: 'input', text: commandText }];
    setHistory((prev) => [...prev, commandText]);
    setHistoryIndex(-1);
    setInput('');

    const cmd = commandText.toLowerCase().split(' ')[0];

    let response: string | React.ReactNode = '';
    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p>  <span className="text-brand-accent">about</span>    - Brief biography and stats</p>
            <p>  <span className="text-brand-accent">projects</span> - Showcase featured systems built</p>
            <p>  <span className="text-brand-accent">resume</span>   - Open resume in a new tab</p>
            <p>  <span className="text-brand-accent">github</span>   - Visit GitHub profile</p>
            <p>  <span className="text-brand-accent">clear</span>    - Clear the terminal console screen</p>
            <p>  <span className="text-brand-accent">exit</span>     - Close the terminal overlay</p>
          </div>
        );
        break;
      case 'about':
        response = (
          <div className="space-y-1">
            <p className="text-brand-accent font-bold">{portfolioData.name}</p>
            <p>{portfolioData.title} & {portfolioData.subtitle}</p>
            <p>📍 Location: {portfolioData.location}</p>
            <p>🎓 Education: {portfolioData.education[0].degree} (GPA: {portfolioData.education[0].gpa}) at Techno India, Hooghly</p>
            <p>💡 Bio: {portfolioData.bio}</p>
          </div>
        );
        break;
      case 'projects':
        response = (
          <div className="space-y-2">
            <p>Featured projects:</p>
            {portfolioData.projects.map((proj, idx) => (
              <div key={idx} className="pl-4">
                <p className="text-indigo-400 font-bold">📂 {proj.title}</p>
                <p className="text-xs text-brand-text-muted">   {proj.tagline}</p>
                <p className="text-[11px] text-brand-text-muted">   Stack: {proj.techStack.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'resume':
        window.open(portfolioData.resumeUrl, '_blank');
        response = 'Opening resume PDF in a new tab...';
        break;
      case 'github':
        window.open(portfolioData.socials.github, '_blank');
        response = 'Redirecting to GitHub...';
        break;
      case 'clear':
        setLogs([]);
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `bash: command not found: ${cmd}. Type "help" for a list of commands.`;
    }

    setLogs([...newLogs, { type: 'output', text: response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape closes terminal
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    // Up Arrow retrieves previous commands
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    // Down Arrow retrieves newer commands
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-mono text-xs md:text-sm text-green-400"
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-4xl h-[85vh] rounded-xl bg-black border border-zinc-800 flex flex-col justify-between overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Window Header Bar */}
            <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center text-zinc-400 select-none">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-zinc-500" />
                <span className="text-[10px] tracking-wider uppercase font-bold text-zinc-400">saini@bash: ~</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-zinc-600 font-bold hidden sm:inline">Press ESC to exit</span>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-zinc-800 hover:text-white rounded transition-all cursor-pointer"
                  aria-label="Close Terminal Overlay"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Output Log Area */}
            <div
              className="flex-1 p-6 overflow-y-auto space-y-2 select-text scrollbar-thin cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {logs.map((log, index) => {
                if (log.type === 'input') {
                  return (
                    <div key={index} className="flex items-center gap-2 text-zinc-300">
                      <span className="text-zinc-500">visitor@sainipaul:~:~$</span>
                      <span>{log.text}</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="leading-relaxed">
                      {log.text}
                    </div>
                  );
                }
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input Area */}
            <form
              onSubmit={handleCommandSubmit}
              className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center gap-2"
            >
              <span className="text-zinc-500 shrink-0 font-bold">visitor@sainipaul:~:~$</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-zinc-200 caret-green-400 font-mono text-xs md:text-sm"
                  autoComplete="off"
                  autoFocus
                  placeholder="Type 'help'..."
                />
              </div>
            </form>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalOverlay;
