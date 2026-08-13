import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
// @ts-ignore
import Game2048 from '../components/Game2048';

export const Game2048Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <article className="min-h-screen pt-28 pb-24 px-6 max-w-2xl mx-auto font-sans flex flex-col items-center">
      {/* Back button */}
      <div className="w-full text-left mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-brand-text-muted hover:text-brand-accent transition-colors cursor-pointer group font-mono"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {/* Title Header */}
      <div className="space-y-3 mb-8 text-center">
        <div className="inline-flex p-3 rounded-full bg-brand-accent-glow text-brand-accent border border-brand-accent/20">
          <Gamepad2 size={32} />
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-brand-primary tracking-tight">
          2048 Arcade Game
        </h1>
        <p className="text-xs text-brand-text-muted max-w-sm mx-auto leading-relaxed">
          Slide tiles and merge values to reach the 2048 milestone! Playable on desktop and mobile layout views.
        </p>
      </div>

      {/* 2048 Component Container */}
      <div className="w-full py-4 bg-brand-card/20 border border-brand-border/40 rounded-3xl p-6 shadow-2xl backdrop-blur relative overflow-hidden flex justify-center">
        <Game2048 />
      </div>

      {/* Instructions Card */}
      <div className="w-full mt-8 p-5 rounded-2xl bg-brand-card/45 border border-brand-border/60 text-brand-text-muted text-xs leading-relaxed space-y-3 max-w-[440px] font-mono">
        <h3 className="font-bold text-brand-accent uppercase tracking-wider text-[10px]">How to Play</h3>
        <ul className="list-disc list-inside space-y-1.5">
          <li>Use <span className="text-brand-primary font-bold">Arrow Keys</span> or <span className="text-brand-primary font-bold">WASD</span> to slide all tiles in a direction.</li>
          <li>On mobile, use <span className="text-brand-primary font-bold">swipe gestures</span> in any of the four directions.</li>
          <li>When two tiles with the <span className="text-brand-primary font-bold">same number</span> touch, they merge into one with double the value!</li>
          <li>A new tile (2 or 4) randomly spawns on an empty cell after every successful move.</li>
          <li>Reach the <span className="text-[#00ff88] font-bold">2048 tile</span> to win! You can choose to continue playing to beat your high score.</li>
          <li>If the board fills and there are <span className="text-[#ff4444] font-bold">no valid moves</span> left, the game is over.</li>
        </ul>
      </div>
    </article>
  );
};

export default Game2048Page;
