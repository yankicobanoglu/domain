import React from 'react';
import { Game } from '../types';
import { Play, Gamepad2, ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      className="group relative flex flex-col h-64 bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 cursor-pointer backdrop-blur-sm"
      onClick={() => onSelect(game)}
    >
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />

      {/* Main Content Area */}
      <div className="p-8 flex-1 flex flex-col items-start relative z-10">
         {/* Header: Category & Icon */}
         <div className="flex items-center justify-between w-full mb-6">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
              {game.category}
            </span>
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-indigo-500/30 group-hover:text-indigo-400 text-slate-500 transition-all duration-300">
               <Gamepad2 size={20} />
            </div>
         </div>

         {/* Title */}
         <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
           {game.title}
         </h3>

         {/* Description */}
         <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
           {game.description}
         </p>
      </div>

      {/* Footer Area */}
      <div className="px-8 pb-8 relative z-10 mt-auto">
         <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-indigo-300 transition-colors duration-300">
            <span>Play Now</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
         </div>
      </div>
    </div>
  );
};