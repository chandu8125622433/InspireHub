
import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-200 dark:bg-gray-800 flex items-center justify-center z-50">
      <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">
        [Simulated Banner Ad]
      </p>
    </div>
  );
};

export default AdBanner;
