import React, { useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';

interface MatrixOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatrixOverlay: React.FC<MatrixOverlayProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set full screen bounds
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters: Binary 1 and 0 for cyber aesthetic, or standard matrix chars
    const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const alphabet = matrixChars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Drops coordinates array (initially all at 1)
    const rainDrops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Green matrix text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop coordinates to top when it exceeds height, with random factor for variance
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isOpen]);

  // Escape key closes matrix
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden flex items-center justify-center font-mono select-none"
        >
          {/* Falling Code Matrix Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

          {/* Retro Developer HUD Card */}
          <m.div
            initial={{ scale: 0.9, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 10, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative z-10 p-8 rounded-xl bg-black/90 border border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)] max-w-md text-center flex flex-col items-center gap-4 text-green-500"
          >
            <div className="w-12 h-12 rounded-full border border-green-500/30 flex items-center justify-center animate-pulse">
              <ShieldAlert size={24} />
            </div>
            
            <div>
              <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-green-400">
                OVERRIDE DETECTED
              </h2>
              <p className="text-xs text-green-500/80 mt-1">
                Saini Paul Portfolio Matrix Simulation Active
              </p>
            </div>

            <div className="h-px w-full bg-green-500/20"></div>

            <p className="text-xs leading-relaxed max-w-xs text-green-500/70">
              Welcome to the simulated canvas dashboard. The system has been loaded using the Konami sequence.
            </p>

            <div className="flex flex-col gap-1.5 w-full text-left text-[11px] bg-green-500/5 p-4 rounded border border-green-500/10 text-green-400/90 mt-2">
              <p>&gt; SECURE SHELL MOUNTED</p>
              <p>&gt; MEMORY BUFFER: READY</p>
              <p>&gt; HEURISTICS INITIALIZED</p>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded border border-green-500 hover:bg-green-500 hover:text-black font-bold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.15)] flex items-center justify-center gap-1.5"
            >
              <X size={14} />
              Exit Simulation
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixOverlay;
