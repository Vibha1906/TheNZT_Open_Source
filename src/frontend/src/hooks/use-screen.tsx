import { useEffect, useState } from 'react';

export const useScreen = () => {
  const [screen, setScreen] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [containerWidth, setContainerWidth] = useState<number>(800);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setContainerWidth(width);
      if (width < 640) {
        setScreen('mobile');
      } else if (width < 1024) {
        setScreen('tablet');
      } else {
        setScreen('desktop');
      }
    };

    handleResize(); // Set initial screen size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { screen, containerWidth };
};
