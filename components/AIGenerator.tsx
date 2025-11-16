import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Wallpaper } from '../types';
import { SparklesIcon, MagnifyingGlassIcon } from './icons/InterfaceIcons';
import WallpaperCard from './WallpaperCard';

interface AIGeneratorProps {
  initialPrompt?: string;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
  favoritedItems: Set<string>;
  onToggleFavorite: (wallpaperId: string) => void;
  addGeneratedWallpapers: (wallpapers: Wallpaper[]) => void;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ initialPrompt = '', onWallpaperSelect, favoritedItems, onToggleFavorite, addGeneratedWallpapers }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [generatedImages, setGeneratedImages] = useState<Wallpaper[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuotaError, setIsQuotaError] = useState(false);

  const handleGenerate = useCallback(async () => {
    const currentPrompt = prompt.trim();
    if (!currentPrompt) return;

    setIsGenerating(true);
    setError(null);
    setIsQuotaError(false);
    setGeneratedImages([]);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API key not found.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `Create a vibrant, high-quality phone wallpaper based on this theme: "${currentPrompt}". Focus on artistic and visually appealing composition. Avoid text unless it's integral to the artistic style.`,
        config: {
          numberOfImages: 4,
          outputMimeType: 'image/jpeg',
          aspectRatio: '9:16',
        },
      });

      const newWallpapers: Wallpaper[] = response.generatedImages.map((img, index) => ({
        id: `ai-${Date.now()}-${index}`,
        imageUrl: `data:image/jpeg;base64,${img.image.imageBytes}`,
        categoryId: 'ai-generated',
        premium: false,
      }));
      
      setGeneratedImages(newWallpapers);
      addGeneratedWallpapers(newWallpapers);
    } catch (err) {
      console.error("AI wallpaper generation failed:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('429') || errorMessage.toUpperCase().includes('RESOURCE_EXHAUSTED') || errorMessage.includes('exceeded your current quota')) {
          setError("You've reached your generation quota.");
          setIsQuotaError(true);
      } else {
          setError("Sorry, we couldn't create your wallpaper. Please try a different prompt.");
          setIsQuotaError(false);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, addGeneratedWallpapers]);


  useEffect(() => {
    if (initialPrompt) {
      handleGenerate();
    }
  }, [initialPrompt, handleGenerate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate();
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[9/16] bg-gray-300 dark:bg-gray-700 rounded-lg shimmer"></div>
        ))}
        <style>{`
          @keyframes shimmer {
            0% { background-color: #e0e0e0; }
            50% { background-color: #f0f0f0; }
            100% { background-color: #e0e0e0; }
          }
          .dark .shimmer {
            animation-name: dark-shimmer;
          }
           @keyframes dark-shimmer {
            0% { background-color: #374151; }
            50% { background-color: #4b5563; }
            100% { background-color: #374151; }
          }
          .shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>
    </div>
  );

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-12">
        <SparklesIcon className="w-16 h-16 mx-auto text-primary-light dark:text-primary-dark mb-4"/>
        <h2 className="text-4xl font-bold font-serif">AI Wallpaper Studio</h2>
        <p className="max-w-xl mx-auto text-text-secondary-light dark:text-text-secondary-dark mt-2">
          Describe anything you can imagine, and we'll create a unique wallpaper for you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="relative">
          <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark pointer-events-none" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'a crystal fox in an enchanted forest'"
            className="w-full pl-14 pr-36 py-4 text-lg bg-surface-light dark:bg-surface-dark rounded-full shadow-md focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark outline-none transition-shadow duration-300"
            aria-label="AI wallpaper prompt"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-primary-light dark:bg-primary-dark text-white rounded-full font-semibold hover:bg-opacity-90 dark:hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? 'Creating...' : 'Generate'}
          </button>
        </form>
      </div>
      
      {isGenerating && (
        <div className="text-center">
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6">
                Inspiring your wallpaper into existence... ✨
            </p>
            <LoadingSkeleton />
        </div>
      )}

      {error && (
        <div className="text-center p-4 mt-8 max-w-2xl mx-auto bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg border border-red-500/20">
          <p className="font-semibold">{error}</p>
          {isQuotaError && (
            <p className="text-sm mt-2">
              Please check your plan and billing details. You can{' '}
              <a 
                href="https://ai.dev/usage?tab=rate-limit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                monitor your usage
              </a>
              {' '}or learn more about{' '}
              <a 
                href="https://ai.google.dev/gemini-api/docs/rate-limits" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                API rate limits
              </a>.
            </p>
          )}
        </div>
      )}
      
      {generatedImages.length > 0 && !isGenerating && (
        <div>
          <h3 className="text-2xl font-bold font-serif mb-6 text-center">Your Creations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {generatedImages.map((wallpaper, index) => (
              <WallpaperCard
                key={wallpaper.id}
                wallpaper={wallpaper}
                isUnlocked={true}
                onWatchAd={() => {}}
                onSelect={onWallpaperSelect}
                index={index}
                isFavorited={favoritedItems.has(wallpaper.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerator;