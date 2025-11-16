import React, { useState, useEffect } from 'react';
import { QuoteIcon, BookOpenIcon, PhotoIcon, ArrowRightIcon, MagnifyingGlassIcon, HeartIcon, SparklesIcon } from './icons/InterfaceIcons';
import { Quote, Wallpaper } from '../types';
import { QUOTES, WALLPAPERS } from '../data';

interface HomeProps {
  onNavigateToCategories: () => void;
  onNavigateToFavorites: () => void;
  onNavigateToAIGenerator: () => void;
  onSearch: (query: string) => void;
}

const getDailyQuoteFromStaticData = (): Quote => {
  const today = new Date();
  // Simple logic to get a "daily" quote based on the day of the year.
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const quoteIndex = dayOfYear % QUOTES.length;
  return QUOTES[quoteIndex];
};


const Home: React.FC<HomeProps> = ({ onNavigateToCategories, onNavigateToFavorites, onNavigateToAIGenerator, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dailyQuote = getDailyQuoteFromStaticData();
  
  // Hard-coded featured content
  const featuredQuotes: Quote[] = [QUOTES.find(q => q.id === 'q40')!, QUOTES.find(q => q.id === 'q33')!, QUOTES.find(q => q.id === 'q44')!];
  const featuredWallpapers: Wallpaper[] = [WALLPAPERS.find(w => w.id === 'w37')!, WALLPAPERS.find(w => w.id === 'w28')!, WALLPAPERS.find(w => w.id === 'w33')!, WALLPAPERS.find(w => w.id === 'w25')!];

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
        <div className="relative max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-br from-primary-light/90 to-pink-500/90 dark:from-primary-dark/90 dark:to-pink-400/90 text-white shadow-xl flex items-center justify-center">
          <div>
              <blockquote className="text-2xl font-serif italic mb-4">“{dailyQuote.text}”</blockquote>
              <cite className="block text-right font-medium not-italic">- {dailyQuote.author}</cite>
          </div>
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
