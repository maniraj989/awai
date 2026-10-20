import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BEST_SELLING_PRODUCTS } from '../data/mockData';

export default function BestSellingSection({ selectedCategoryId, onProductClick, onViewAllClick }) {
  const [cardsPerView, setCardsPerView] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter products if a category is selected (or show all if 'all' or default)
  const displayProducts = selectedCategoryId && selectedCategoryId !== 'all'
    ? BEST_SELLING_PRODUCTS.filter(p => p.category === selectedCategoryId)
    : BEST_SELLING_PRODUCTS;

  const productsToShow = displayProducts.length > 0 ? displayProducts : BEST_SELLING_PRODUCTS;

  // Dynamically calculate visible cards
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1); // 1 on mobile
      } else if (width < 860) {
        setCardsPerView(2); // 2 on tablet portrait
      } else if (width < 1024) {
        setCardsPerView(3); // 3 on tablet landscape
      } else {
        setCardsPerView(4); // 4 on desktop
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, productsToShow.length - cardsPerView);

  // Clamp current index when maxIndex changes
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
    <section id="shop" className="w-full py-6 sm:py-7 md:py-9 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4 md:px-8">
        {/* Section Header with Slider Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#111D27] tracking-tight">
              Best Selling Products
            </h2>
            <p className="text-xs sm:text-sm text-[#737D87] mt-0.5">
              Our customers' top picks
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Slider Navigation Arrows */}
            {maxIndex > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center transition-all cursor-pointer ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-[#F8F9FA] text-[#94A3B8]'
                      : 'bg-white text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] shadow-2xs'
                  }`}
                  aria-label="Previous products"
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
                  aria-label="Next products"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}

            {maxIndex > 0 && (
              <span className="hidden sm:inline-block text-[#CBD5E1]">|</span>
            )}

            <button
              onClick={onViewAllClick}
              className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#17212B] hover:text-[#E91E32] transition-colors cursor-pointer"
            >
              <span>View All</span>
              <span className="hidden xs:inline">Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-[#E91E32]" />
            </button>
          </div>
        </div>

        {/* Product Cards visible per view with smooth touch slider */}
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
            {productsToShow.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0 px-1.5 sm:px-2"
              >
                <div
                  onClick={() => onProductClick && onProductClick(product)}
                  className="bg-white border border-[#E5E9ED] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between hover:border-[#CBD5E1] hover:shadow-md transition-all duration-200 cursor-pointer group relative h-full"
                >
                  {/* Top Badge (if any) */}
                  <div className="relative w-full">
                    {product.badge && (
                      <span className="absolute top-0 left-0 z-10 bg-[#E91E32] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wide shadow-2xs uppercase">
                        {product.badge}
                      </span>
                    )}

                    {/* Product Image Area */}
                    <div className="w-full h-44 sm:h-48 flex items-center justify-center p-2 mb-3 bg-[#FAFAFA] rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Product Info - Clean, balanced layout */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#111D27] group-hover:text-[#E91E32] transition-colors leading-snug min-h-[2.5rem] mb-1">
                        {product.name}
                      </h3>
                      <div className="text-xs text-[#737D87] mb-2 line-clamp-1">
                        {product.specs}
                      </div>
                    </div>

                    {/* Rating & Price */}
                    <div className="pt-2 border-t border-[#F1F5F9] flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-[#F59E0B]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-[#F59E0B]"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[#17212B]">
                          ({product.rating})
                        </span>
                      </div>

                      <div className="text-base font-bold text-[#E91E32] tracking-tight">
                        {product.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots if more than 1 view */}
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
