import { useState, useEffect } from 'react';

export const Error = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer); // This will clear the timer if the component unmounts before the 5 seconds are up
    }
  }, [message]);

  return isVisible ? (
    <div className='absolute left-1/2 transform -translate-x-1/2 top-5 z-50 w-64 h-8 border border-red-800 rounded-md text-red-700 font-semibold text-md backdrop-blur-lg flex items-center justify-center'>
      <p>{message}</p>
    </div>
  ) : null;
};