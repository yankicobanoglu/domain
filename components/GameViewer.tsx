import React, { useState, useEffect } from 'react';
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

  // SEO: Update Title, Meta Description, and inject JSON-LD Schema
  useEffect(() => {
    // 1. Save original title
    const originalTitle = document.title;
    
    // 2. Update to optimized title
    if (game.seoTitle) {
      document.title = game.seoTitle;
    }

    // 3. Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    let originalMetaContent = '';
    
    if (metaDescription) {
      originalMetaContent = metaDescription.getAttribute('content') || '';
      if (game.seoDescription) {
        metaDescription.setAttribute('content', game.seoDescription);
      }
    } else if (game.seoDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = game.seoDescription;
      document.head.appendChild(meta);
    }

    // 4. Inject JSON-LD Schema for "VideoGame"
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    // Use textContent instead of text for better compatibility
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": game.title,
      "description": game.description,
      "image": game.image || "", // Required for Rich Results
      "url": window.location.href,
      "genre": [game.category],
      "operatingSystem": "Browser",
      "applicationCategory": "Game",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
    document.head.appendChild(schemaScript);

    // Cleanup: Restore original title/meta and remove schema when leaving the game
    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalMetaContent);
      }
      if (document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript);
      }
    };
  }, [game]);

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
      
      {/* 
        INVISIBLE SEO CONTENT 
        This is hidden visually from users but available to Google Bots and Screen Readers.
        It sits "behind" the iframe conceptually.
      */}
      {game.seoContent && (
        <div 
          style={{ 
            position: 'absolute', 
            width: '1px', 
            height: '1px', 
            padding: '0', 
            margin: '-1px', 
            overflow: 'hidden', 
            clip: 'rect(0,0,0,0)', 
            whiteSpace: 'nowrap', 
            border: '0' 
          }}
          dangerouslySetInnerHTML={{ __html: game.seoContent }}
        />
      )}

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