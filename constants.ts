import { Game } from './types';

// =========================================================================
// STEP 1: CONFIGURATION
// =========================================================================

export const MY_GAMES: Game[] = [
  {
    id: 'game-1',
    slug: 'dual-n-back',
    title: 'Dual N-Back',
    description: 'Dual N-Back: Working memory enhancer!',
    category: 'Cognitive',
    url: 'https://dualnback.yankicobanoglu.com',
    // REAL IMAGE: Abstract Neural Network / Brain Visualization (Blue)
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&h=630&fit=crop',
    
    // SEO Optimization
    seoTitle: 'Free Dual N-Back | Train Working Memory & Fluid Intelligence',
    seoDescription: 'Play the Dual N-Back brain training game online for free. Improve your working memory and focus.',
    seoContent: `
      <h1>Dual N-Back Brain Training</h1>
      <p>This is a free implementation of the N-Back game, a performance task that is commonly used as an assessment in cognitive neuroscience to measure a part of working memory and working memory capacity.</p>
      <h2>How to Play</h2>
      <p>You will be presented with a sequence of stimuli (audio and visual). The task consists of indicating when the current stimulus matches the one from n steps earlier in the sequence. The load factor n can be adjusted to make the task more difficult.</p>
      <h2>Benefits</h2>
      <p>Research suggests that practicing this task can improve fluid intelligence (Gf) and working memory.</p>
    `
  },
  {
    id: 'game-2',
    slug: 'imposter',
    title: 'Imposter',
    description: 'Imposter word game, find the imposter among your friends!',
    category: 'Fun',
    url: 'https://imposter.yankicobanoglu.com',
    // REAL IMAGE: Neon "Who are you?" sign - fits the Imposter theme perfectly
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&h=630&fit=crop',

    // SEO Optimization
    seoTitle: 'Play Imposter Online | Social Deduction Word Game',
    seoDescription: 'A free browser-based party game similar to Imposter/Impostor and Among Us. Find the imposter among your friends using one-word clues.',
    seoContent: `
      <h1>Imposter - The Social Deduction Party Game</h1>
      <p>Imposter is a multiplayer party game for 3-10 players. It is a game of deception, deduction, and word association.</p>
      <h2>Rules</h2>
      <p>Everyone is given a secret word, except for one person: The Imposter. Players take turns saying one word related to the secret word. The Imposter must blend in and guess the word, while the others must identify who the Imposter is.</p>
      <p>Play this free alternative to Spyfall directly in your browser with no app download required.</p>
    `
  }
];

export const APP_TITLE = "THE PLAYGROUND";
export const APP_SUBTITLE = "Personal experiments in vibe-coding";