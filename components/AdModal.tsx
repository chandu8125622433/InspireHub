
import React, { useState, useEffect } from 'react';

interface AdModalProps {
  onComplete: () => void;
  onClose: () => void;
}

const AdModal: React.FC<AdModalProps> = ({ onComplete, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 30); // 3 seconds total

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-6 w-full max-w-sm text-center">
        <h3 className="text-xl font-bold mb-4">Watching Rewarded Ad</h3>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
          Your content will be unlocked shortly.
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-primary-light dark:bg-primary-dark h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default AdModal;
