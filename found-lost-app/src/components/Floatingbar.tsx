import React, { useState } from 'react';
import { MessageSquare, X, Star, Send } from 'lucide-react';

const Floatingbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission here
    console.log('Review submitted:', { name, review, rating });
    // Reset form
    setName('');
    setReview('');
    setRating(0);
    setIsExpanded(false);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      return (
        <button
          key={starNumber}
          type="button"
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
          className="text-2xl transition-colors duration-200 focus:outline-none"
        >
          <Star
            className={`h-6 w-6 ${
              starNumber <= (hoveredRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
          aria-label="Open review form"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    );
  }
return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
      <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="p-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Write a Review
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Close review form"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-9 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Rating
              </label>
              <div className="flex gap-1">
                {renderStars()}
              </div>
            </div>

            <div>
              <label htmlFor="review" className="text-sm font-medium text-gray-700 mb-1 block">
                Your Review
              </label>
              <textarea
                id="review"
                placeholder="Share your experience with our lost & found service..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button 
              type="submit" 
              disabled={!name || !review || rating === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
            >
              <Send className="h-4 w-4" />
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Floatingbar;