import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { QuoteIcon, BookOpenIcon, PhotoIcon, ArrowRightIcon, InformationCircleIcon, MagnifyingGlassIcon, HeartIcon, SparklesIcon } from './icons/InterfaceIcons';
import { DailyQuote, GroundingSource, Quote, Wallpaper } from '../types';
import { QUOTES, WALLPAPERS } from '../data';

interface HomeProps {
  onNavigateToCategories: () => void;
  onNavigateToFavorites: () => void;
  onNavigateToAIGenerator: () => void;
  onSearch: (query: string) => void;
}

const parseQuote = (text: string): { text: string; author: string } => {
  const lastDashIndex = text.lastIndexOf(' - ');
  if (lastDashIndex > -1 && lastDashIndex > text.length / 2) { 
      const quoteText = text.substring(0, lastDashIndex).replace(/"/g, '').trim();
      const author = text.substring(lastDashIndex + 3).trim();
      return { text: quoteText, author };
  }
  return { text: text.replace(/"/g, '').trim(), author: 'Unknown' };
};

const Home: React.FC<HomeProps> = ({ onNavigateToCategories, onNavigateToFavorites, onNavigateToAIGenerator, onSearch }) => {
  const [dailyQuote, setDailyQuote] = useState<DailyQuote | null>(null);
  const [isFetchingQuote, setIsFetchingQuote] = useState(true);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Hard-coded featured content
  const featuredQuotes: Quote[] = [QUOTES.find(q => q.id === 'q40')!, QUOTES.find(q => q.id === 'q33')!, QUOTES.find(q => q.id === 'q44')!];
  const featuredWallpapers: Wallpaper[] = [WALLPAPERS.find(w => w.id === 'w37')!, WALLPAPERS.find(w => w.id === 'w28')!, WALLPAPERS.find(w => w.id === 'w33')!, WALLPAPERS.find(w => w.id === 'w25')!];

  useEffect(() => {
    const fetchDailyQuote = async () => {
      setIsFetchingQuote(true);
      setQuoteError(null);
      
      const today = new Date().toISOString().split('T')[0];
      
      try {
        const cachedQuoteData = localStorage.getItem('dailyQuote');
        if (cachedQuoteData) {
          const { date, quote } = JSON.parse(cachedQuoteData);
          if (date === today) {
            setDailyQuote(quote);
            setIsFetchingQuote(false);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to read from localStorage", e);
        localStorage.removeItem('dailyQuote');
      }

      try {
        if (!process.env.API_KEY) {
          throw new Error("API key is not available.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: "Generate a single, short, uplifting inspirational quote for today. The quote should be timely and relevant. Format it as \"The quote itself\" - Author.",
          config: {
            tools: [{googleSearch: {}}],
          },
        });

        const rawText = response.text;
        const { text, author } = parseQuote(rawText);

        const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map((chunk: any) => (chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null))
          .filter((source: any): source is GroundingSource => source && source.uri && source.title) || [];
          
        const newQuote: DailyQuote = { text, author, sources };
        setDailyQuote(newQuote);
        localStorage.setItem('dailyQuote', JSON.stringify({ date: today, quote: newQuote }));
      } catch (error) {
        console.error("Failed to fetch daily quote:", error);
        setQuoteError("Could not fetch today's inspiration. Please try again later.");
      } finally {
        setIsFetchingQuote(false);
      }
    };

    fetchDailyQuote();
  }, []);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-8 animate-fade-in-up">
        <QuoteIcon className="w-20 h-20 text-primary-light dark:text-primary-dark mb-6" />
        <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-pink-500 dark:from-primary-dark dark:to-pink-400">
            Find Your Inspiration
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8">
          Your daily source of inspiration. Use our AI search to find quotes and wallpapers that match your mood, or browse our curated collections.
        </p>
      </section>
      
      {/* AI Search Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 'courage to start something new'"
              className="w-full pl-14 pr-32 py-4 text-lg bg-surface-light dark:bg-surface-dark rounded-full shadow-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-shadow duration-300"
              aria-label="AI-powered search"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary-light dark:bg-primary-dark text-white rounded-full font-semibold hover:bg-opacity-90 dark:hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Daily Inspiration Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-3xl font-bold font-serif text-center mb-6">Daily Inspiration</h2>
        <div className="relative max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-br from-primary-light/90 to-pink-500/90 dark:from-primary-dark/90 dark:to-pink-400/90 text-white shadow-xl min-h-[10rem] flex items-center justify-center">
          {isFetchingQuote && (
            <div className="space-y-4 animate-pulse w-full">
              <div className="h-6 bg-white/30 rounded w-3/4"></div>
              <div className="h-6 bg-white/30 rounded w-full"></div>
              <div className="h-4 bg-white/30 rounded w-1/4 ml-auto"></div>
            </div>
          )}
          {quoteError && <div className="text-center"><p>{quoteError}</p></div>}
          {dailyQuote && !isFetchingQuote && (
            <div>
              <blockquote className="text-2xl font-serif italic mb-4">“{dailyQuote.text}”</blockquote>
              <cite className="block text-right font-medium not-italic">- {dailyQuote.author}</cite>
              {dailyQuote.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/30 text-sm">
                  <div className="flex items-center space-x-2 opacity-80 mb-2">
                    <InformationCircleIcon className="w-5 h-5" />
                    <h4 className="font-semibold">Sources</h4>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {dailyQuote.sources.map((source, index) => (
                      <li key={index}>
                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <h2 className="text-3xl font-bold font-serif text-center mb-6">Featured Content</h2>
        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Popular Quotes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredQuotes.map(quote => (
                <div key={quote.id} className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md">
                  <p className="text-lg italic text-text-primary-light dark:text-text-primary-dark mb-3 font-serif">"{quote.text}"</p>
                  <p className="text-right text-text-secondary-light dark:text-text-secondary-dark font-medium">- {quote.author}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Popular Wallpapers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {featuredWallpapers.map(wallpaper => (
                <div key={wallpaper.id} className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
                  <img src={wallpaper.imageUrl} alt="Featured Wallpaper" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Navigation Cards */}
       <section className="max-w-4xl mx-auto space-y-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
         <div 
            onClick={onNavigateToAIGenerator}
            className="group bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-500/10 dark:bg-purple-400/20 rounded-lg mr-6">
                <SparklesIcon className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold">AI Wallpaper Studio</h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  Create unique wallpapers from your imagination.
                </p>
              </div>
              <ArrowRightIcon className="w-7 h-7 ml-4 text-text-secondary-light dark:text-text-secondary-dark transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={onNavigateToFavorites}
              className="group bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center">
                <div className="p-3 bg-pink-500/10 dark:bg-pink-400/20 rounded-lg mr-6">
                  <HeartIcon className="w-8 h-8 text-pink-500 dark:text-pink-400" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold">My Favorites</h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    Your personal collection.
                  </p>
                </div>
                <ArrowRightIcon className="w-7 h-7 ml-4 text-text-secondary-light dark:text-text-secondary-dark transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <div 
              onClick={onNavigateToCategories}
              className="group bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center">
                <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/20 rounded-lg mr-6">
                  <BookOpenIcon className="w-8 h-8 text-primary-light dark:text-primary-dark" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold">Browse Collections</h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    Explore all categories.
                  </p>
                </div>
                <ArrowRightIcon className="w-7 h-7 ml-4 text-text-secondary-light dark:text-text-secondary-dark transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
       </section>
    </div>
  );
};

export default Home;