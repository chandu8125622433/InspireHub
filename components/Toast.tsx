
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2800); // slightly less than parent timeout to allow fade out
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        bg-gray-800 dark:bg-gray-200 dark:text-gray-800`}
    >
      {message}
    </div>
  );
};

export default Toast;
