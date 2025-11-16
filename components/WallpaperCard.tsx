import React from 'react';
import { Wallpaper } from '../types';
import { LockClosedIcon, SparklesIcon, HeartIcon } from './icons/InterfaceIcons';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isUnlocked: boolean;
  onWatchAd: (wallpaperId: string) => void;
  onSelect: (wallpaper: Wallpaper) => void;
  index: number;
  isFavorited: boolean;
  onToggleFavorite: (wallpaperId: string) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, isUnlocked, onWatchAd, onSelect, index, isFavorited, onToggleFavorite }) => {
  const isLocked = wallpaper.premium && !isUnlocked;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(wallpaper.id);
  };

  return (
    <div
      className="relative group aspect-[2/3] overflow-hidden rounded-lg shadow-lg animate-fade-in-up animate-stagger-item"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => !isLocked && onSelect(wallpaper)}
    >
      <img
        src={wallpaper.imageUrl}
        alt="Wallpaper"
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${isLocked ? 'blur-md' : 'cursor-pointer'}`}
      />
       {wallpaper.premium && (
        <div className="absolute top-2 right-2 p-1 bg-yellow-400/20 rounded-full text-yellow-500 backdrop-blur-sm">
           <SparklesIcon className="w-5 h-5" />
        </div>
      )}

      {!isLocked && (
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-300 ${
            isFavorited
              ? 'bg-red-500/80 text-white'
              : 'bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60'
          }`}
          aria-label="Favorite wallpaper"
        >
          <HeartIcon className="w-5 h-5" filled={isFavorited} />
        </button>
      )}

      {isLocked && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
          <LockClosedIcon className="w-10 h-10 text-white mb-4" />
          <button
            onClick={(e) => { e.stopPropagation(); onWatchAd(wallpaper.id); }}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-light dark:bg-primary-dark rounded-full hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-colors text-center"
          >
            Watch Ad to Unlock
          </button>
        </div>
      )}
    </div>
  );
};

export default WallpaperCard;