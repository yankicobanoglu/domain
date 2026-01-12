import React from 'react';
import { Game } from '../types';
import { Play, Info } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 cursor-pointer"
      onClick={() => onSelect(game)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white rounded-md border border-white/10">
            {game.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {game.description}
        </p>

        <button 
          className="w-full py-3 bg-slate-700 group-hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Play size={18} fill="currentColor" />
          Play Now
        </button>
      </div>
    </div>
  );
};
