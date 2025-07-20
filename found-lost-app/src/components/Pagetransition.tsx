import { useRef, useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const Pagetransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const previousPath = useRef<string>('');
  const navigationOrder = ['/', '/searchItems', '/postItem', '/Dashboard'];


  const getNavigationDirection = (fromPath: string, toPath: string) => {
    const fromIndex = navigationOrder.indexOf(fromPath);
    const toIndex = navigationOrder.indexOf(toPath);

    // If either path is not in our navigation order, default to right
    if (fromIndex === -1 || toIndex === -1) {
      return 'right';
    }

    // If moving to a higher index, slide from right
    // If moving to a lower index, slide from left
    return toIndex > fromIndex ? 'right' : 'left';
  };

   const direction = getNavigationDirection(previousPath.current, location.pathname);

  useEffect(() => {
    previousPath.current = location.pathname;
  }, [location.pathname]);

  return (
 <div className="relative w-full overflow-hidden">
      <div 
        key={location.pathname}
        className={`w-full ${direction === 'right' ? 'page-slide-in-right' : 'page-slide-in-left'}`}
      >
        {children}
      </div>
    </div>
  );
};
export default Pagetransition;