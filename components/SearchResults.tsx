import React from 'react';
import { Quote, Wallpaper, SearchResults } from '../types';
import QuoteCard from './QuoteCard';
import WallpaperCard from './WallpaperCard';
import { SparklesIcon } from './icons/InterfaceIcons';

interface SearchResultsProps {
    query: string;
    results: SearchResults | null;
    isLoading: boolean;
    error: string | null;
    unlockedItems: Set<string>;
    onWatchAd: (itemId: string) => void;
    showToast: (message: string) => void;
    onWallpaperSelect: (wallpaper: Wallpaper) => void;
    favoritedItems: Set<string>;
    onToggleFavorite: (itemId: string) => void;
    onGenerateAI: (prompt: string) => void;
}

const AIGeneratorCard: React.FC<{ query: string; onGenerate: (query: string) => void }> = ({ query, onGenerate }) => (
    <div className="my-12 p-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-center shadow-lg animate-fade-in-up">
        <h3 className="text-2xl font-bold mb-2">Can't find the perfect wallpaper?</h3>
        <p className="mb-4">Let our AI create something unique for you.</p>
        <button
            onClick={() => onGenerate(query)}
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105"
        >
            <SparklesIcon className="w-5 h-5 mr-2" />
            Generate wallpapers for "{query}"
        </button>
    </div>
);

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto mb-12"></div>
        
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="space-y-6 mb-12">
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
        
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg hidden md:block"></div>
            <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg hidden lg:block"></div>
        </div>
    </div>
);

const SearchResultsComponent: React.FC<SearchResultsProps> = ({ query, results, isLoading, error, onGenerateAI, ...cardProps }) => {
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <div className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">{error}</div>;
    }
    
    if (!results || (results.quotes.length === 0 && results.wallpapers.length === 0)) {
        return (
            <div className="animate-fade-in-up">
                <div className="text-center py-12 text-text-secondary-light dark:text-text-secondary-dark">No recommendations found for "{query}".</div>
                <AIGeneratorCard query={query} onGenerate={onGenerateAI} />
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif">
                AI Recommendations for "{query}"
            </h2>
            
            <AIGeneratorCard query={query} onGenerate={onGenerateAI} />
            
            {results.quotes.length > 0 && (
                <section className="mb-16">
                    <h3 className="text-2xl font-bold font-serif mb-6">Recommended Quotes</h3>
                    <div className="space-y-6">
                        {results.quotes.map((quote, index) => (
                            <QuoteCard
                                key={quote.id}
                                quote={quote}
                                isUnlocked={cardProps.unlockedItems.has(quote.id)}
                                isFavorited={cardProps.favoritedItems.has(quote.id)}
                                index={index}
                                {...cardProps}
                            />
                        ))}
                    </div>
                </section>
            )}

            {results.wallpapers.length > 0 && (
                <section>
                    <h3 className="text-2xl font-bold font-serif mb-6">Recommended Wallpapers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {results.wallpapers.map((wallpaper, index) => (
                           <WallpaperCard
                             key={wallpaper.id}
                             wallpaper={wallpaper}
                             isUnlocked={cardProps.unlockedItems.has(wallpaper.id)}
                             isFavorited={cardProps.favoritedItems.has(wallpaper.id)}
                             onSelect={cardProps.onWallpaperSelect}
                             index={index}
                             {...cardProps}
                           />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SearchResultsComponent;