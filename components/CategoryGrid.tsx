
import React from 'react';
import { Category, ContentType } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category, type: ContentType) => void;
}

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category, type: ContentType) => void;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect, index }) => {
  const Icon = category.icon;
  return (
    <div 
      className="group relative bg-surface-light dark:bg-surface-dark rounded-xl shadow-md hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up animate-stagger-item"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary-light/10 dark:bg-primary-dark/20 rounded-full">
            <Icon className="w-10 h-10 text-primary-light dark:text-primary-dark" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">{category.name}</h3>
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => onSelect(category, 'quotes')}
            className="px-4 py-2 text-sm font-semibold text-white bg-primary-light dark:bg-primary-dark rounded-full hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-colors"
          >
            Quotes
          </button>
          <button
            onClick={() => onSelect(category, 'wallpapers')}
            className="px-4 py-2 text-sm font-semibold text-primary-light dark:text-primary-dark bg-transparent border-2 border-primary-light dark:border-primary-dark rounded-full hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition-colors"
          >
            Wallpapers
          </button>
        </div>
      </div>
    </div>
  );
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelect }) => {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center mb-8 font-serif">Choose a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} onSelect={onSelect} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
