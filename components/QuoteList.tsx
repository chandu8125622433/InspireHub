import React from 'react';
import { Category, Quote } from '../types';
import QuoteCard from './QuoteCard';

interface QuoteListProps {
  category: Category;
  quotes: Quote[];
  unlockedItems: Set<string>;
  onWatchAd: (quoteId: string) => void;
  showToast: (message: string) => void;
  favoritedItems: Set<string>;
  onToggleFavorite: (quoteId: string) => void;
}

const QuoteList: React.FC<QuoteListProps> = ({ category, quotes, unlockedItems, onWatchAd, showToast, favoritedItems, onToggleFavorite }) => {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center mb-8 font-serif">{category.name} Quotes</h2>
      <div className="space-y-6">
        {quotes.map((quote, index) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isUnlocked={unlockedItems.has(quote.id)}
            onWatchAd={onWatchAd}
            showToast={showToast}
            index={index}
            isFavorited={favoritedItems.has(quote.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteList;