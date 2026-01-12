import React, { useState, useEffect, useRef } from 'react';
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Focus the iframe automatically when it loads so keyboard inputs work immediately
  const handleIframeLoad = () => {
    setIsLoading(false);
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  };

  // Handle global Escape key to close the game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If fullscreen, exit that first
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        } else {
          // Otherwise go back
          onBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // SEO: Update Title, Meta Description, and inject JSON-LD Schema
  useEffect(() => {
    // 1. Save original title/meta to restore later
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDescription ? metaDescription.getAttribute('content') : '';

    // 2. Update Title
    if (game.seoTitle) document.title = game.seoTitle;

    // 3. Update Meta Description
    if (metaDescription && game.seoDescription) {
      metaDescription.setAttribute('content', game.seoDescription);
    }

    // 4. Update JSON-LD Schema (Targeting the ID in index.html)
    // We use @graph to provide multiple rich result opportunities (Breadcrumbs + App)
    const script = document.getElementById('root-json-ld');
    if (script) {
      const data = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Arcade",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": game.title,
                "item": window.location.href
              }
            ]
          },
          {
            "@type": "SoftwareApplication",
            "name": game.title,
            "description": game.description,
            "image": [game.image],
            "url": window.location.href,
            "applicationCategory": "GameApplication",
            "operatingSystem": "Any",
            "author": {
              "@type": "Person",
              "name": "Yanki Cobanoglu"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
               "@type": "AggregateRating",
               "ratingValue": "5",
               "ratingCount": "1"
            }
          }
        ]
      };
      script.textContent = JSON.stringify(data);
    }

    // Cleanup: Restore original title/meta when leaving
    return () => {
      document.title = originalTitle;
      if (metaDescription && originalMetaContent) {
        metaDescription.setAttribute('content', originalMetaContent);
      }
      // We don't need to revert the JSON-LD manually here because 
      // the App.tsx useEffect will kick in and overwrite it with home schema
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
          ref={iframeRef}
          key={key}
          src={game.url}
          title={game.title}
          className="w-full h-full border-0 relative z-10"
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; gamepad"
          allowFullScreen
        />
      </div>
    </div>
  );
};