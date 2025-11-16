import React from 'react';
import { Category, Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';

interface WallpaperGridProps {
  category: Category;
  wallpapers: Wallpaper[];
  unlockedItems: Set<string>;
  onWatchAd: (wallpaperId: string) => void;
  onWallpaperSelect: (wallpaper: Wallpaper) => void;
  favoritedItems: Set<string>;
  onToggleFavorite: (wallpaperId: string) => void;
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({ category, wallpapers, unlockedItems, onWatchAd, onWallpaperSelect, favoritedItems, onToggleFavorite }) => {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center mb-8 font-serif">{category.name} Wallpapers</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wallpapers.map((wallpaper, index) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            isUnlocked={unlockedItems.has(wallpaper.id)}
            onWatchAd={onWatchAd}
            onSelect={onWallpaperSelect}
            index={index}
            isFavorited={favoritedItems.has(wallpaper.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default WallpaperGrid;