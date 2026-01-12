import React, { useState } from 'react';
import { Game } from '../types';
import { ArrowLeft, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface GameViewerProps {
  game: Game;
  onBack: () => void;
}

export const GameViewer: React.FC<GameViewerProps> = ({ game, onBack }) => {
  const [key, setKey] = useState(0); // Used to reload the iframe
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    setKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 h-screen w-screen">
      {/* Header Bar - Hidden in fullscreen mode if you wanted, but keeping it accessible is better for UX */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shadow-md z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to Playground
          </button>
          <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>
          <h2 className="text-white font-bold hidden sm:block">{game.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button 
            onClick={handleReload}
            title="Reload Game"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Game Frame Area */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-indigo-400 bg-slate-900 z-0">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="animate-pulse">Loading {game.title}...</p>
            </div>
          </div>
        )}
        
        <iframe
          key={key}
          src={game.url}
          title={game.title}
          className="w-full h-full border-0 relative z-10"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; gamepad"
          allowFullScreen
        />
      </div>
    </div>
  );
};