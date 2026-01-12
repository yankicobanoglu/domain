export interface Game {
  id: string;
  slug: string; // The url-friendly identifier (e.g., 'imposter')
  title: string;
  description: string;
  url: string; // The URL to your Vercel project
  category: string;
  
  // SEO Specific Fields
  image?: string; // Required for valid VideoGame Schema
  seoTitle?: string; // The text that appears in the Browser Tab
  seoDescription?: string; // The text for search engine results
  seoContent?: string; // Invisible text injected for Google/Screen Readers to read
}