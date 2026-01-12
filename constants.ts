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
    title: 'Dual N-Back',
    description: 'Dual N-Back: Working memory enhancer!',
    category: 'Cognitive',
    
    // 👇 PASTE YOUR SUBDOMAIN LINK HERE 👇
    // Example: 'https://space.yourname.com'
    // IMPORTANT: You must include 'https://'
    url: 'https://dualnback.yankicobanoglu.com', 
  },
  {
    id: 'game-2',
    title: 'Imposter',
    description: 'Imposter word game, find the imposter among your friends!',
    category: 'Fun',
    
    // 👇 PASTE YOUR SUBDOMAIN LINK HERE 👇
    // Example: 'https://puzzle.yourname.com'
    // IMPORTANT: You must include 'https://'
    url: 'https://imposter.yankicobanoglu.com',
  }
];

export const APP_TITLE = "PLAYGROUND";
export const APP_SUBTITLE = "Select a game to start playing";