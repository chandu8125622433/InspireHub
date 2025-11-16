import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  categoryId: string;
  premium: boolean;
}

export interface Wallpaper {
  id: string;
  imageUrl: string;
  categoryId: string;
  premium: boolean;
}

export interface GeneratedQuote {
  type: 'quote';
  text: string;
  author: string;
}

export interface GeneratedWallpaper {
  type: 'wallpaper';
  imageUrl: string; // base64 data URL
}

export type AIGeneratedContent = GeneratedQuote | GeneratedWallpaper;


export type View = 'home' | 'categories' | 'quotes' | 'wallpapers' | 'search' | 'favorites' | 'ai-generator';

export type ContentType = 'quotes' | 'wallpapers';

export interface SearchResults {
  quotes: Quote[];
  wallpapers: Wallpaper[];
}
