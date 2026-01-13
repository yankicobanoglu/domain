import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { MY_GAMES, APP_TITLE, APP_SUBTITLE } from './constants';
import { GameCard } from './components/GameCard';
import { GameViewer } from './components/GameViewer';
import { Game } from './types';

function App() {
  // OPTIMIZATION: Initialize state synchronously based on URL.
  const [selectedGame, setSelectedGame] = useState<Game | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const gameSlug = params.get('game');
      if (gameSlug) {
        return MY_GAMES.find(g => g.slug === gameSlug) || null;
      }
    }
    return null;
  });

  // Handle Browser Back/Forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const gameSlug = params.get('game');
      if (gameSlug) {
        const foundGame = MY_GAMES.find(g => g.slug === gameSlug);
        setSelectedGame(foundGame || null);
      } else {
        setSelectedGame(null);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // UPDATE HOME JSON-LD (Only when no game is selected)
  // Instead of appending a new script, we update the one in index.html
  useEffect(() => {
    if (selectedGame) return;

    const script = document.getElementById('root-json-ld');
    if (script) {
      const data = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "headline": "The Playground",
        "description": "A personal game portal to host and launch multiple web games from a single domain.",
        "url": window.location.href.split('?')[0],
        "author": {
            "@type": "Person",
            "name": "Yanki Cobanoglu"
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": MY_GAMES.map((game, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${window.location.origin}/?game=${game.slug}`,
            "name": game.title
          }))
        }
      };
      script.textContent = JSON.stringify(data);
    }
  }, [selectedGame]);

  // Navigation Handlers
  const handleGameSelect = (game: Game) => {
    const newUrl = `?game=${game.slug}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setSelectedGame(game);
  };

  const handleBack = () => {
    const newUrl = window.location.pathname; // Should be just '/'
    window.history.pushState({ path: newUrl }, '', newUrl);
    setSelectedGame(null);
  };

  // Render Game Viewer
  if (selectedGame) {
    return (
      <GameViewer 
        game={selectedGame} 
        onBack={handleBack} 
      />
    );
  }

  // Render Arcade Menu
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center w-full">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-full mb-8 ring-1 ring-indigo-500/30 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-indigo-400 mr-2" />
          <span className="text-indigo-200 text-sm font-medium">Welcome</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-lg">
            {APP_TITLE}
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {APP_SUBTITLE}
        </p>
      </div>

      {/* Grid Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {MY_GAMES.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onSelect={handleGameSelect} 
            />
          ))}
        </div>

        {/* Empty State / Call to Action */}
        {MY_GAMES.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/50">
            <Gamepad2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300">No games configured yet</h3>
            <p className="text-slate-500 mt-2">Check constants.ts to add your games.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-lg mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Gamepad2 size={16} />
            <span>Powered by React & Vercel</span>
          </div>
          <p className="text-slate-500 text-sm">
            2026 Vibed with Gemini
          </p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;