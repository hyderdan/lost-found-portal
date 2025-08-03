import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const previousPath = useRef<string>('');
  const isFirstLoad = useRef<boolean>(true);

  // Define navigation order (left to right in navbar)
  const navigationOrder = ['/', '/searchItems', '/postItem', '/Dashboard', ];
  
  // Pages that should not have slide animations
  const noAnimationPages = ['/login', '/register', '/admin', '/viewDetails'];

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
  
  // Check if animation should be disabled
  // Disable animation on first load or if current page is a no-animation page
  const shouldAnimate = !isFirstLoad.current && 
    !noAnimationPages.includes(location.pathname);
  
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    }
    previousPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        key={location.pathname}
        className={`w-full ${shouldAnimate ? (direction === 'right' ? 'page-slide-in-right' : 'page-slide-in-left') : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageTransition;
