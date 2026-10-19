import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function CategorySection({ selectedCategoryId, onCategorySelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Desktop shows 4 categories, so maxIndex for 7 categories is 7 - 4 = 3
  const maxIndex = Math.max(0, CATEGORIES.length - 4);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="w-full py-7 md:py-9 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header with Slider Navigation */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111D27] tracking-tight">
              Shop by Category
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-8 h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center transition-all cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-[#F8F9FA] text-[#94A3B8]'
                    : 'bg-white text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] shadow-2xs'
                }`}
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`w-8 h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center transition-all cursor-pointer ${
                  currentIndex >= maxIndex
                    ? 'opacity-40 cursor-not-allowed bg-[#F8F9FA] text-[#94A3B8]'
                    : 'bg-white text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] shadow-2xs'
                }`}
                aria-label="Next categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="hidden sm:inline-block text-[#CBD5E1]">|</span>

            <button
              onClick={() => onCategorySelect && onCategorySelect('all')}
              className="group inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#17212B] hover:text-[#E91E32] transition-colors cursor-pointer"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-[#E91E32]" />
            </button>
          </div>
        </div>

        {/* Category Slider Track (4 Cards visible at a time on desktop) */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  className="w-1/2 sm:w-1/3 lg:w-1/4 shrink-0 px-2"
                >
                  <button
                    onClick={() => onCategorySelect && onCategorySelect(cat.id)}
                    className={`w-full flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 text-center cursor-pointer group ${
                      isSelected
                        ? 'bg-white border-[#E91E32] shadow-sm ring-1 ring-[#E91E32]'
                        : 'bg-[#F8F9FA] border-[#E5E9ED] hover:bg-white hover:border-[#CBD5E1] hover:shadow-md'
                    }`}
                  >
                    {/* Product Image Area with ample space */}
                    <div className="w-full h-28 sm:h-32 flex items-center justify-center mb-3 bg-white rounded-lg p-2 overflow-hidden border border-[#F1F5F9] group-hover:border-[#E2E8F0] transition-colors">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="max-h-full max-w-[90%] object-contain transition-transform duration-300 group-hover:scale-108"
                      />
                    </div>

                    {/* Category Name */}
                    <h3 className="text-sm font-semibold text-[#111D27] group-hover:text-[#E91E32] transition-colors line-clamp-1 mb-1">
                      {cat.name}
                    </h3>

                    {/* Product Count */}
                    <span className="text-xs text-[#737D87] font-medium">
                      {cat.count}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots for Slider */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
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
      </div>
    </section>
  );
}
