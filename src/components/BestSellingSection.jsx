import React, { useState } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BEST_SELLING_PRODUCTS } from '../data/mockData';

export default function BestSellingSection({ selectedCategoryId, onProductClick, onViewAllClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter products if a category is selected (or show all if 'all' or default)
  const displayProducts = selectedCategoryId && selectedCategoryId !== 'all'
    ? BEST_SELLING_PRODUCTS.filter(p => p.category === selectedCategoryId)
    : BEST_SELLING_PRODUCTS;

  const productsToShow = displayProducts.length > 0 ? displayProducts : BEST_SELLING_PRODUCTS;

  // 4 products visible at a time on desktop
  const maxIndex = Math.max(0, productsToShow.length - 4);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="shop" className="w-full py-7 md:py-9 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header with Slider Navigation */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111D27] tracking-tight">
              Best Selling Products
            </h2>
            <p className="text-xs md:text-sm text-[#737D87] mt-0.5">
              Our customers' top picks
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Slider Navigation Arrows (when more than 4 products exist) */}
            {productsToShow.length > 4 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`w-8 h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center transition-all cursor-pointer ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-[#F8F9FA] text-[#94A3B8]'
                      : 'bg-white text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] shadow-2xs'
                  }`}
                  aria-label="Previous products"
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
                  aria-label="Next products"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {productsToShow.length > 4 && (
              <span className="hidden sm:inline-block text-[#CBD5E1]">|</span>
            )}

            <button
              onClick={onViewAllClick}
              className="group inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#17212B] hover:text-[#E91E32] transition-colors cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 text-[#E91E32]" />
            </button>
          </div>
        </div>

        {/* 4 Product Cards visible per view with smooth slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
            }}
          >
            {productsToShow.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shrink-0 px-2"
              >
                <div
                  onClick={() => onProductClick && onProductClick(product)}
                  className="bg-white border border-[#E5E9ED] rounded-xl p-3.5 flex flex-col justify-between hover:border-[#CBD5E1] hover:shadow-md transition-all duration-200 cursor-pointer group relative h-full"
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
                      />
                    </div>
                  </div>

                  {/* Product Info - Clean, balanced layout with NO buttons */}
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

        {/* Pagination Dots if more than 4 products */}
        {productsToShow.length > 4 && (
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
        )}
      </div>
    </section>
  );
}
