
import React from 'react';
import { SparklesIcon } from './icons/CategoryIcons';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background-light dark:bg-background-dark flex flex-col items-center justify-center z-[200]">
      <div className="relative flex items-center justify-center">
        <SparklesIcon className="w-16 h-16 text-primary-light dark:text-primary-dark animate-spin" style={{ animationDuration: '3s' }}/>
        <h1 className="text-3xl font-bold font-serif text-primary-light dark:text-primary-dark ml-4">
          InspireHub
        </h1>
      </div>
       <p className="mt-4 text-text-secondary-light dark:text-text-secondary-dark">
        Loading your daily inspiration...
      </p>
    </div>
  );
};

export default LoadingScreen;
