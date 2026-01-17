import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../types';
import { ArrowLeft, Maximize2, Minimize2, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface GameViewerProps {
  game: Game;
  onBack: () => void;
}

export const GameViewer: React.FC<GameViewerProps> = ({ game, onBack }) => {
  const [key, setKey] = useState(0); // Used to reload the iframe
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Ref to handle touch vs mouse conflict
  const ignoreHoverRef = useRef(false);

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
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalMetaContent = metaDescription ? metaDescription.getAttribute('content') : '';

    if (game.seoTitle) document.title = game.seoTitle;

    if (metaDescription && game.seoDescription) {
      metaDescription.setAttribute('content', game.seoDescription);
    }

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
                "name": "The Playground",
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

    return () => {
      document.title = originalTitle;
      if (metaDescription && originalMetaContent) {
        metaDescription.setAttribute('content', originalMetaContent);
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

  // Interaction Handlers for Header Drawer
  const handleMouseEnter = () => {
    if (!ignoreHoverRef.current) {
      setIsHeaderOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHeaderOpen(false);
  };

  const handleTouchStart = () => {
    ignoreHoverRef.current = true;
  };

  const toggleHeader = () => {
    setIsHeaderOpen(prev => !prev);
  };

  return (
    // FIX #3: Use h-[100dvh] for mobile browsers to account for address bar
    <div className="fixed inset-0 z-50 bg-slate-950 h-[100dvh] w-screen overflow-hidden font-sans">
      
      {/* INVISIBLE SEO CONTENT */}
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

      {/* 
        FIX #2: RETRACTABLE DRAWER HEADER
        - Hidden by default (-translate-y-full)
        - Slides down on hover (desktop) or handle tap (mobile)
      */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          isHeaderOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        {/* Main Header Bar */}
        <div className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
              >
                <ArrowLeft size={18} />
                Back to Home
              </button>
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <h2 className="text-white font-bold hidden sm:block">{game.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={handleReload}
                title="Reload Game"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Handle (Hanging below the header) */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px flex justify-center">
          <button
            onClick={toggleHeader}
            className="flex items-center justify-center w-24 h-6 bg-slate-900/90 backdrop-blur-md border-b border-x border-white/10 rounded-b-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-lg group"
            title="Toggle Menu"
          >
            {isHeaderOpen ? (
              <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Game Frame Area - Fills the entire screen behind the header */}
      <div className="absolute inset-0 z-0 bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-indigo-400 bg-slate-900 z-10">
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
          className="w-full h-full border-0"
          onLoad={handleIframeLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; gamepad"
          allowFullScreen
        />
      </div>
    </div>
  );
};