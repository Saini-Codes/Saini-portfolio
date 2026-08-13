import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center select-none">
      <h1 className="font-heading font-extrabold text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-indigo-500 animate-pulse">
        404
      </h1>
      <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-primary mt-6 mb-3">
        Page Not Found
      </h2>
      <p className="text-brand-text-muted text-sm md:text-base max-w-sm mb-8 leading-relaxed">
        The page you are looking for does not exist, has been removed, or is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-xl bg-brand-primary text-brand-bg font-bold text-xs md:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-lg"
      >
        <Home size={16} />
        Back to Home
      </button>
    </div>
  );
};
export default NotFound;
