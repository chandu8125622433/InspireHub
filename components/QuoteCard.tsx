import React from 'react';
import { Quote } from '../types';
import { ShareIcon, ClipboardIcon, LockClosedIcon, SparklesIcon, HeartIcon } from './icons/InterfaceIcons';

interface QuoteCardProps {
  quote: Quote;
  isUnlocked: boolean;
  onWatchAd: (quoteId: string) => void;
  showToast: (message: string) => void;
  index: number;
  isFavorited: boolean;
  onToggleFavorite: (quoteId: string) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isUnlocked, onWatchAd, showToast, index, isFavorited, onToggleFavorite }) => {
  const isLocked = quote.premium && !isUnlocked;

  const handleShare = async () => {
    const shareText = `"${quote.text}" - ${quote.author}`;
    const shareData = {
      title: 'InspireHub Quote',
      text: shareText,
    };

    const fallbackCopy = async () => {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast("Copied to clipboard");
      } catch (err) {
        console.error("Fallback copy failed:", err);
        showToast("Failed to copy to clipboard.");
      }
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Web Share API failed:', err);
          await fallbackCopy();
        }
      }
    } else {
      console.warn('Web Share API not supported, falling back to clipboard.');
      await fallbackCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      showToast("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      showToast("Failed to copy quote.");
    }
  };

  return (
    <div 
      className="relative bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg animate-fade-in-up animate-stagger-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {quote.premium && (
        <div className="absolute top-2 right-2 p-1 bg-yellow-400/20 rounded-full text-yellow-500">
           <SparklesIcon className="w-5 h-5" />
        </div>
      )}
      <div className={`transition-all duration-300 ${isLocked ? 'blur-sm' : ''}`}>
        <p className="text-xl italic text-text-primary-light dark:text-text-primary-dark mb-4 font-serif">
          "{quote.text}"
        </p>
        <p className="text-right text-text-secondary-light dark:text-text-secondary-dark font-medium">
          - {quote.author}
        </p>
      </div>
      
      {isLocked ? (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg">
          <LockClosedIcon className="w-8 h-8 text-white mb-2" />
          <button
            onClick={() => onWatchAd(quote.id)}
            className="px-4 py-2 text-sm font-semibold text-white bg-primary-light dark:bg-primary-dark rounded-full hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-colors"
          >
            Watch Ad to Unlock
          </button>
        </div>
      ) : (
        <div className="flex justify-end items-center space-x-2 mt-4">
          <button onClick={() => onToggleFavorite(quote.id)} className={`p-2 rounded-full transition-colors ${isFavorited ? 'text-red-500 bg-red-500/10' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700'}`} aria-label="Favorite quote">
            <HeartIcon className="w-5 h-5" filled={isFavorited} />
          </button>
          <button onClick={handleCopy} className="p-2 text-text-secondary-light dark:text-text-secondary-dark rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Copy quote">
            <ClipboardIcon className="w-5 h-5" />
          </button>
          <button onClick={handleShare} className="p-2 text-text-secondary-light dark:text-text-secondary-dark rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Share quote">
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;