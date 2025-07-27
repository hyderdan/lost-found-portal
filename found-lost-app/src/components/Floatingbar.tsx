import React, { useState, useEffect } from 'react';
import { Star, X, Users, Quote, MessageCircle } from 'lucide-react';

const Floatingbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const reviews = [
    {
      text: "Found my lost keys within hours of posting! This community is amazing.",
      author: "Sarah M.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      text: "Helped reunite someone with their wallet. Great platform for good deeds!",
      author: "Mike R.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      text: "Lost my phone at the park and got it back the same day. Incredible!",
      author: "Elena K.",
      rating: 5,
      avatar: "👩‍🎓"
    }
  ];

  // Show the bar after a delay
  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed]);

  // Auto-rotate reviews
  useEffect(() => {
    if (isVisible && !isCollapsed) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible, isCollapsed, reviews.length]);

  const handleCollapse = () => {
    setIsVisible(false);
    setTimeout(() => setIsCollapsed(true), 300);
  };

  const handleExpand = () => {
    setIsCollapsed(false);
    setIsVisible(true);
  };
  return (
    <>
      {/* Main floating review bar */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isVisible && !isCollapsed
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-card border border-border rounded-lg shadow-lg backdrop-blur-sm max-w-md mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-sm text-foreground font-medium leading-tight">
                  {reviews[currentReview].text}
                </p>
                
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-lg">{reviews[currentReview].avatar}</span>
                  <span className="text-xs text-muted-foreground">
                    {reviews[currentReview].author}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-3">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>3.4k+</span>
              </div>
              
              <button
                onClick={handleCollapse}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex space-x-1 px-4 pb-3">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  index === currentReview ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Collapsed side button */}
      <div
        className={`fixed right-6 bottom-6 z-50 transition-all duration-300 ease-out ${
          isCollapsed
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handleExpand}
          className="bg-card border border-border rounded-full p-3 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-200 group"
        >
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            View reviews
          </div>
        </button>
      </div>
    </>
  );
};

export default Floatingbar;