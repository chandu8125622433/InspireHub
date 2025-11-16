import React from 'react';
import { Quote, Wallpaper } from '../types';
import QuoteCard from './QuoteCard';
import WallpaperCard from './WallpaperCard';
import { HeartIcon } from './icons/InterfaceIcons';

interface FavoritesProps {
  allQuotes: Quote[];
  allWallpapers: Wallpaper[];
  favoritedItems: Set<string>;
  unlockedItems: Set<string>;
  onToggleFavorite: (itemId: string) => void;
  onWatchAd: (itemId: string) => void;
  showToast: (message: string) => void;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
}

const Favorites: React.FC<FavoritesProps> = (props) => {
  const favoritedQuotes = props.allQuotes.filter(q => props.favoritedItems.has(q.id));
  const favoritedWallpapers = props.allWallpapers.filter(w => props.favoritedItems.has(w.id));

  const hasFavorites = favoritedQuotes.length > 0 || favoritedWallpapers.length > 0;

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center mb-12 font-serif">My Favorites</h2>
      
      {!hasFavorites ? (
        <div className="text-center py-16 px-6 bg-surface-light dark:bg-surface-dark rounded-lg">
          <HeartIcon className="w-16 h-16 mx-auto text-text-secondary-light dark:text-text-secondary-dark mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your Collection is Empty</h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-md mx-auto">
            Tap the heart icon on any quote or wallpaper to add it to your personal collection.
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {favoritedQuotes.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold font-serif mb-6">Favorite Quotes</h3>
              <div className="space-y-6">
                {favoritedQuotes.map((quote, index) => (
                  <QuoteCard
                    key={quote.id}
                    quote={quote}
                    isUnlocked={props.unlockedItems.has(quote.id)}
                    isFavorited={true}
                    index={index}
                    onToggleFavorite={props.onToggleFavorite}
                    onWatchAd={props.onWatchAd}
                    showToast={props.showToast}
                  />
                ))}
              </div>
            </section>
          )}

          {favoritedWallpapers.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold font-serif mb-6">Favorite Wallpapers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favoritedWallpapers.map((wallpaper, index) => (
                   <WallpaperCard
                     key={wallpaper.id}
                     wallpaper={wallpaper}
                     isUnlocked={props.unlockedItems.has(wallpaper.id)}
                     isFavorited={true}
                     onSelect={props.onWallpaperSelect}
                     index={index}
                     onToggleFavorite={props.onToggleFavorite}
                     onWatchAd={props.onWatchAd}
                   />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
