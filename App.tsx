import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Category, Quote, Wallpaper, View, ContentType, SearchResults } from './types';
import { CATEGORIES, QUOTES, WALLPAPERS } from './data';
import Header from './components/Header';
import Home from './components/Home';
import CategoryGrid from './components/CategoryGrid';
import QuoteList from './components/QuoteList';
import WallpaperGrid from './components/WallpaperGrid';
import Toast from './components/Toast';
import AdBanner from './components/AdBanner';
import AdModal from './components/AdModal';
import WallpaperDetailModal from './components/WallpaperDetailModal';
import LoadingScreen from './components/LoadingScreen';
import SearchResultsComponent from './components/SearchResults';
import Favorites from './components/Favorites';
import AIGenerator from './components/AIGenerator';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [contentType, setContentType] = useState<ContentType>('quotes');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [unlockedItems, setUnlockedItems] = useState<Set<string>>(new Set());
  const [isAdVisible, setIsAdVisible] = useState(false);
  const [itemToUnlock, setItemToUnlock] = useState<string | null>(null);

  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [isWallpaperDetailVisible, setIsWallpaperDetailVisible] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [favoritedItems, setFavoritedItems] = useState<Set<string>>(new Set());
  const [generatedWallpapers, setGeneratedWallpapers] = useState<Wallpaper[]>([]);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  
  const allWallpapers = [...WALLPAPERS, ...generatedWallpapers];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    
    try {
      const savedFavorites = localStorage.getItem('favoritedItems');
      if (savedFavorites) {
        setFavoritedItems(new Set(JSON.parse(savedFavorites)));
      }
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e);
    }
  }, []);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    try {
      localStorage.setItem('favoritedItems', JSON.stringify(Array.from(favoritedItems)));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favoritedItems]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleFavorite = (itemId: string) => {
    setFavoritedItems(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
        showToast("Removed from favorites");
      } else {
        newFavorites.add(itemId);
        showToast("Added to favorites!");
      }
      return newFavorites;
    });
  };

  const handleCategorySelect = (category: Category, type: ContentType) => {
    setSelectedCategory(category);
    setContentType(type);
    setCurrentView(type);
  };

  const handleBack = () => {
    if (currentView === 'quotes' || currentView === 'wallpapers') {
      setCurrentView('categories');
      setSelectedCategory(null);
    } else if (currentView === 'categories' || currentView === 'search' || currentView === 'favorites' || currentView === 'ai-generator') {
      setCurrentView('home');
    }
  };

  const navigateToCategories = () => {
    setCurrentView('categories');
  };

  const navigateToFavorites = () => {
    setCurrentView('favorites');
  };

  const navigateToAIGenerator = (prompt: string = '') => {
    setAiPrompt(prompt);
    setCurrentView('ai-generator');
  };

  const addGeneratedWallpapers = (newWallpapers: Wallpaper[]) => {
    setGeneratedWallpapers(prev => [...prev, ...newWallpapers]);
  };
  
  const handleWatchAd = (itemId: string) => {
    setItemToUnlock(itemId);
    setIsAdVisible(true);
  };

  const handleAdComplete = () => {
    if (itemToUnlock) {
      setUnlockedItems(prev => new Set(prev).add(itemToUnlock));
      showToast('Content unlocked!');
    }
    setIsAdVisible(false);
    setItemToUnlock(null);
  };

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsWallpaperDetailVisible(true);
  };

  const handleWallpaperDetailClose = () => {
    setIsWallpaperDetailVisible(false);
    setTimeout(() => {
        setSelectedWallpaper(null);
    }, 300);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setCurrentView('search');
    setIsSearching(true);
    setSearchError(null);
    setSearchResults(null);

    try {
        if (!process.env.API_KEY) {
            throw new Error("API key not configured.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const quotesForPrompt = QUOTES.map(({ id, text }) => ({ id, text }));
        const categoriesForPrompt = CATEGORIES.map(({ id, name }) => ({ id, name }));

        const prompt = `You are an AI assistant for an app called InspireHub. Your task is to help users find inspirational content.
Based on the user's search query, you must recommend relevant quotes and wallpaper categories from the provided JSON lists.

User Query: "${query}"

You MUST return a JSON object with two keys: "quoteIds" and "categoryIds".
- "quoteIds": An array of strings containing the IDs of the top 5 most relevant quotes from the quotes list. The order should be from most to least relevant.
- "categoryIds": An array of strings containing the IDs of the top 2 most relevant wallpaper categories from the categories list.

Do not include any other text or explanation in your response. Only the JSON object.

Available Quotes:
${JSON.stringify(quotesForPrompt)}

Available Categories:
${JSON.stringify(categoriesForPrompt)}`;
      
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quoteIds: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "IDs of recommended quotes"
                        },
                        categoryIds: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "IDs of recommended categories for wallpapers"
                        }
                    },
                    required: ["quoteIds", "categoryIds"],
                }
            }
        });

        const resultJson = JSON.parse(response.text);
        const { quoteIds, categoryIds } = resultJson;

        const recommendedQuotes = QUOTES.filter(q => quoteIds.includes(q.id))
            .sort((a, b) => quoteIds.indexOf(a.id) - quoteIds.indexOf(b.id));

        const recommendedWallpapers = WALLPAPERS.filter(w => categoryIds.includes(w.categoryId));

        setSearchResults({ quotes: recommendedQuotes, wallpapers: recommendedWallpapers });

    } catch (error) {
        console.error("AI search failed:", error);
        setSearchError("Sorry, we couldn't find recommendations. Try a different search.");
    } finally {
        setIsSearching(false);
    }
  };


  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigateToCategories={navigateToCategories} onNavigateToFavorites={navigateToFavorites} onSearch={handleSearch} onNavigateToAIGenerator={navigateToAIGenerator} />;
      case 'ai-generator':
        return <AIGenerator
          initialPrompt={aiPrompt}
          onWallpaperSelect={handleWallpaperSelect}
          favoritedItems={favoritedItems}
          onToggleFavorite={handleToggleFavorite}
          addGeneratedWallpapers={addGeneratedWallpapers}
        />;
      case 'favorites':
        return <Favorites 
            allQuotes={QUOTES}
            allWallpapers={allWallpapers}
            favoritedItems={favoritedItems}
            unlockedItems={unlockedItems}
            onToggleFavorite={handleToggleFavorite}
            onWatchAd={handleWatchAd}
            showToast={showToast}
            onWallpaperSelect={handleWallpaperSelect}
        />;
      case 'search':
        return <SearchResultsComponent
          query={searchQuery}
          results={searchResults}
          isLoading={isSearching}
          error={searchError}
          unlockedItems={unlockedItems}
          onWatchAd={handleWatchAd}
          showToast={showToast}
          onWallpaperSelect={handleWallpaperSelect}
          favoritedItems={favoritedItems}
          onToggleFavorite={handleToggleFavorite}
          onGenerateAI={navigateToAIGenerator}
        />;
      case 'quotes':
        if (selectedCategory) {
          const categoryQuotes = QUOTES.filter(q => q.categoryId === selectedCategory.id);
          return (
            <QuoteList
              category={selectedCategory}
              quotes={categoryQuotes}
              unlockedItems={unlockedItems}
              onWatchAd={handleWatchAd}
              showToast={showToast}
              favoritedItems={favoritedItems}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        }
        return null;
      case 'wallpapers':
        if (selectedCategory) {
          const categoryWallpapers = WALLPAPERS.filter(w => w.categoryId === selectedCategory.id);
          return (
            <WallpaperGrid
              category={selectedCategory}
              wallpapers={categoryWallpapers}
              unlockedItems={unlockedItems}
              onWatchAd={handleWatchAd}
              onWallpaperSelect={handleWallpaperSelect}
              favoritedItems={favoritedItems}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        }
        return null;
      case 'categories':
      default:
        return <CategoryGrid categories={CATEGORIES} onSelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-text-primary-light dark:text-text-primary-dark transition-colors duration-300">
      {isLoading ? <LoadingScreen /> : (
        <>
          <Header theme={theme} toggleTheme={toggleTheme} showBackButton={currentView !== 'home'} onBack={handleBack} />
          <main className="px-4 py-8 sm:px-6 lg:px-8 pb-24">
            <div key={currentView} className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
          <AdBanner />
          <Toast message={toastMessage} />
          {isAdVisible && <AdModal onComplete={handleAdComplete} onClose={() => setIsAdVisible(false)} />}
          {isWallpaperDetailVisible && selectedWallpaper && (
            <WallpaperDetailModal
              wallpaper={selectedWallpaper}
              onClose={handleWallpaperDetailClose}
              showToast={showToast}
              isFavorited={favoritedItems.has(selectedWallpaper.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;