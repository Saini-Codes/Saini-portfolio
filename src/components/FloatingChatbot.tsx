import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, User, Bot, FileText, Sparkles } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

interface Message {
  sender: 'user' | 'bot';
  text: string | React.ReactNode;
}

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hi! I'm Saini's Assistant. Ask me about her projects, technical skills, resume, or availability.`,
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const qaOptions = [
    {
      question: 'What projects did you build?',
      answer: (
        <div className="space-y-2">
          <p>Saini has built these featured projects:</p>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            {portfolioData.projects.map((project) => (
              <li key={project.id}>
                <strong>{project.title}:</strong> {project.tagline}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-indigo-400">
            Check the <a href="#projects" className="underline font-bold hover:text-brand-accent">Projects</a> section for details.
          </p>
        </div>
      ),
    },
    {
      question: 'What is your tech stack?',
      answer: (
        <div className="space-y-1.5">
          <p>Saini&apos;s core technologies include:</p>
          <p><strong>Languages:</strong> {portfolioData.skills.languages.join(', ')}</p>
          <p><strong>Frameworks:</strong> {portfolioData.skills.frameworks.join(', ')}</p>
          <p><strong>Databases:</strong> {portfolioData.skills.databases.join(', ')}</p>
          <p><strong>AI/ML:</strong> {portfolioData.skills.aiMl.join(', ')}</p>
        </div>
      ),
    },
    {
      question: 'Are you open to opportunities?',
      answer:
        'Yes! Saini is an MCA student graduating in 2027 and is open to software development, full-stack, and AI/ML opportunities.',
    },
    {
      question: 'How can I contact you?',
      answer: (
        <div className="space-y-1">
          <p>You can reach Saini directly at:</p>
          <p>
            📧 <a href={`mailto:${portfolioData.socials.email}`} className="underline font-semibold hover:text-brand-accent">
              {portfolioData.socials.email}
            </a>
          </p>
          <p>
            💼 <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="underline font-semibold hover:text-brand-accent">
              LinkedIn Profile
            </a>
          </p>
        </div>
      ),
    },
    {
      question: 'Download resume?',
      answer: (
        <div className="flex items-center gap-2">
          <span>View Saini&apos;s resume:</span>
          <a
            href={portfolioData.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-brand-accent text-brand-bg font-bold text-xs hover:opacity-90 transition-all shadow-sm"
          >
            <FileText size={12} />
            Resume.pdf
          </a>
        </div>
      ),
    },
  ];

  const handleQuestionClick = (question: string, answer: string | React.ReactNode) => {
    if (isTyping) return;

    setMessages((prev) => [...prev, { sender: 'user', text: question }]);
    setIsTyping(true);

    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
    }, 750);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[330px] sm:w-[360px] h-[500px] rounded-2xl bg-brand-card border border-brand-border/90 glass shadow-2xl flex flex-col justify-between overflow-hidden mb-4"
          >
            <div className="p-4 bg-gradient-to-r from-brand-card to-brand-bg border-b border-brand-border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-accent-glow border border-brand-accent/20 flex items-center justify-center text-brand-accent relative">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-brand-card" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-primary flex items-center gap-1">
                    Saini AI
                    <span className="text-[9px] text-brand-accent font-semibold uppercase tracking-wider font-mono">beta</span>
                  </h4>
                  <p className="text-[10px] text-brand-text-muted">Portfolio Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-brand-text-muted hover:text-brand-primary transition-colors cursor-pointer"
                aria-label="Close Chat Window"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[340px] scrollbar-thin">
              {messages.map((msg, index) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={index} className={`flex items-start gap-2.5 ${!isBot ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] border ${
                        isBot
                          ? 'bg-brand-accent-glow text-brand-accent border-brand-accent/20'
                          : 'bg-brand-bg text-brand-primary border-brand-border'
                      }`}
                    >
                      {isBot ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs ${
                        isBot
                          ? 'bg-brand-bg/80 border border-brand-border/60 text-brand-primary rounded-tl-none'
                          : 'bg-brand-accent text-brand-bg font-medium rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-brand-accent-glow text-brand-accent border border-brand-accent/20">
                    <Bot size={14} />
                  </div>
                  <div className="bg-brand-bg/80 border border-brand-border/60 text-brand-text-muted rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-text-muted animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-brand-bg/90 border-t border-brand-border flex flex-col gap-1.5">
              <span className="text-[9px] font-mono font-bold tracking-wider text-brand-text-muted uppercase px-1">
                Select a Question:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto">
                {qaOptions.map((opt) => (
                  <button
                    key={opt.question}
                    disabled={isTyping}
                    onClick={() => handleQuestionClick(opt.question, opt.answer)}
                    className="px-2.5 py-1.5 rounded-lg border border-brand-border bg-brand-card hover:border-brand-accent/50 text-brand-text hover:text-brand-accent font-sans text-[11px] text-left transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    {opt.question}
                  </button>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand-accent text-brand-bg hover:opacity-95 shadow-2xl flex items-center justify-center transition-all cursor-pointer border border-brand-accent/20 relative"
        aria-label="Toggle Chatbot Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.div key="close" initial={{ rotate: -45 }} animate={{ rotate: 0 }} exit={{ rotate: 45 }}>
              <X size={24} />
            </m.div>
          ) : (
            <m.div key="chat" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <MessageSquare size={24} />
            </m.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 border border-brand-bg flex items-center justify-center text-[10px] text-white font-bold animate-bounce shadow">
            <Sparkles size={10} />
          </span>
        )}
      </m.button>
    </div>
  );
};

export default FloatingChatbot;
