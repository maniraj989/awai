import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function CategorySection({ selectedCategoryId, onCategorySelect }) {
  const [cardsPerView, setCardsPerView] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamic cards visible per view based on screen width
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(2); // 2 on mobile
      } else if (width < 1024) {
        setCardsPerView(3); // 3 on tablet
      } else {
        setCardsPerView(4); // 4 on desktop
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, CATEGORIES.length - cardsPerView);

  // Clamp current index on window resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch Swipe Gesture Handling
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45 && currentIndex < maxIndex) {
      handleNext();
    } else if (distance < -45 && currentIndex > 0) {
      handlePrev();
    }
  };

  return (
    <section className="w-full py-6 sm:py-7 md:py-9 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4 md:px-8">
        {/* Section Header with Slider Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111D27] tracking-tight">
              Shop by Category
            </h2>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center transition-all cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-[#F8F9FA] text-[#94A3B8]'
                    : 'bg-white text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] shadow-2xs'
                }`}
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center transition-all cursor-pointer ${
                  currentIndex >= maxIndex
                    ? 'opacity-40 cursor-not-allowed bg-[#F8F9FA] text-[#94A3B8]'
                    : 'bg-white text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] shadow-2xs'
                }`}
                aria-label="Next categories"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            <span className="hidden sm:inline-block text-[#CBD5E1]">|</span>

            <button
              onClick={() => onCategorySelect && onCategorySelect('all')}
              className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#17212B] hover:text-[#E91E32] transition-colors cursor-pointer"
            >
              <span>View All</span>
              <span className="hidden xs:inline">Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-[#E91E32]" />
            </button>
          </div>
        </div>

        {/* Category Slider Track with Touch Swiping */}
        <div
          className="relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  className="w-1/2 sm:w-1/3 lg:w-1/4 shrink-0 px-1.5 sm:px-2"
                >
                  <button
                    onClick={() => onCategorySelect && onCategorySelect(cat.id)}
                    className={`w-full flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all duration-300 text-center cursor-pointer group ${
                      isSelected
                        ? 'bg-white border-[#E91E32] shadow-sm ring-1 ring-[#E91E32]'
                        : 'bg-[#F8F9FA] border-[#E5E9ED] hover:bg-white hover:border-[#CBD5E1] hover:shadow-md'
                    }`}
                  >
                    {/* Product Image Area */}
                    <div className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-center mb-2.5 sm:mb-3 bg-white rounded-lg p-2 overflow-hidden border border-[#F1F5F9] group-hover:border-[#E2E8F0] transition-colors">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="max-h-full max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-108"
                        loading="lazy"
                      />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-xs sm:text-sm font-semibold text-[#111D27] group-hover:text-[#E91E32] transition-colors line-clamp-1 mb-0.5 sm:mb-1">
                      {cat.name}
                    </h3>

                    {/* Product Count */}
                    <span className="text-[11px] sm:text-xs text-[#737D87] font-medium">
                      {cat.count}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots for Slider */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-3.5 sm:mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-6 bg-[#E91E32]'
                    : 'w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
