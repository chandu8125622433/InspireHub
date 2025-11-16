import React from 'react';
import { Wallpaper } from '../types';
import { DownloadIcon, ShareIcon, XMarkIcon, HeartIcon } from './icons/InterfaceIcons';

interface WallpaperDetailModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
  showToast: (message: string) => void;
  isFavorited: boolean;
  onToggleFavorite: (wallpaperId: string) => void;
}

const WallpaperDetailModal: React.FC<WallpaperDetailModalProps> = ({ wallpaper, onClose, showToast, isFavorited, onToggleFavorite }) => {

  const handleDownload = async () => {
    try {
      const response = await fetch(wallpaper.imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `inspirehub-wallpaper-${wallpaper.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Wallpaper downloaded!');
    } catch (error) {
      console.error('Download failed:', error);
      showToast('Download failed. Please try again.');
    }
  };

  const handleShare = async () => {
    const fallbackCopy = async () => {
      try {
        await navigator.clipboard.writeText(wallpaper.imageUrl);
        return true;
      } catch (copyError) {
        console.error('Clipboard write failed:', copyError);
        return false;
      }
    };

    try {
      const response = await fetch(wallpaper.imageUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const file = new File([blob], `inspirehub-wallpaper-${wallpaper.id}.jpg`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'InspireHub Wallpaper',
          text: 'Check out this wallpaper from InspireHub!',
          files: [file],
        });
      } else {
        const success = await fallbackCopy();
        showToast(success ? 'Sharing not supported, URL copied!' : 'Failed to copy URL.');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Sharing failed:', err);
        const success = await fallbackCopy();
        showToast(success ? 'Sharing failed. URL copied to clipboard.' : 'Sharing failed and could not copy URL.');
      }
    }
  };


  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in" onClick={onClose}>
      <div className="relative bg-surface-dark rounded-lg w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="flex-grow overflow-auto rounded-t-lg">
          <img src={wallpaper.imageUrl} alt="Wallpaper" className="w-full h-auto object-contain" />
        </div>

        <div className="flex items-center justify-center space-x-4 p-4 bg-surface-dark rounded-b-lg border-t border-slate-700">
           <button
            onClick={() => onToggleFavorite(wallpaper.id)}
            className={`p-3 rounded-full transition-colors ${isFavorited ? 'text-red-500 bg-red-500/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
            aria-label="Favorite wallpaper"
          >
            <HeartIcon className="w-6 h-6" filled={isFavorited} />
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-primary-dark rounded-full hover:bg-opacity-90 transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-primary-dark bg-transparent border-2 border-primary-dark rounded-full hover:bg-primary-dark/10 transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WallpaperDetailModal;