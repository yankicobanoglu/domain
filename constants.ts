import { Game } from './types';

// =========================================================================
// STEP 1: CONFIGURATION
// =========================================================================
// 1. Setup your subdomains in Vercel first (e.g., space.yourdomain.com).
// 2. Paste those new Subdomain URLs here.
// =========================================================================

export const MY_GAMES: Game[] = [
  {
    id: 'game-1',
    title: 'Space Explorer',
    description: 'Navigate through the cosmos, avoid asteroids, and discover new planets in this thrilling adventure.',
    category: 'Action',
    
    // 👇 PASTE YOUR SUBDOMAIN LINK HERE 👇
    // Example: 'https://space.yourname.com'
    url: 'https://vercel.com/templates/games', 
    
    thumbnail: 'https://picsum.photos/id/119/800/600', 
  },
  {
    id: 'game-2',
    title: 'Neon Puzzle',
    description: 'Solve complex logic puzzles in a vibrant, neon-soaked cyberpunk environment.',
    category: 'Puzzle',
    
    // 👇 PASTE YOUR SUBDOMAIN LINK HERE 👇
    // Example: 'https://puzzle.yourname.com'
    url: 'https://vercel.com/templates/games',
    
    thumbnail: 'https://picsum.photos/id/96/800/600',
  }
];

export const APP_TITLE = "My Arcade";
export const APP_SUBTITLE = "Select a game to start playing";
