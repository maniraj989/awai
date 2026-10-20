import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Headphones, Award } from 'lucide-react';

export default function HeroBanner({ onExploreClick }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="w-full bg-[#FAF8F5] border-b border-[#E5E9ED] relative overflow-hidden">
      {/* Full Hero Image spanning entire hero banner */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <img
          src="/images/hero-appliances.png"
          alt="AWAI Premium Appliances Collection"
          className="w-full h-full object-cover object-right md:object-center"
        />
        {/* Soft elegant gradient overlay on left to ensure high contrast & readability for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-transparent w-full sm:w-[65%] md:w-[54%] lg:w-[48%]" />
      </div>

      {/* Foreground Content positioned in front of the image */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-6 md:py-8 min-h-[320px] md:min-h-[350px] flex items-center justify-between relative z-10">
        {/* Left Side: Brand Copy & Trust Indicators directly in front */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col justify-center py-2">
          {/* Small label */}
          <div className="text-[11px] font-bold tracking-[0.2em] text-[#737D87] uppercase mb-1.5">
            AWAI NEPAL
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.12] mb-2.5">
            <span className="text-[#111D27] block">Modern Homes</span>
            <span className="text-[#E91E32] block">Better Living</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xs md:text-sm text-[#525E6B] max-w-sm leading-relaxed mb-4 font-medium">
            Premium home appliances designed to make your everyday life easier, smarter and more comfortable.
          </p>

          {/* Primary CTA */}
          <div className="mb-5">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 bg-[#E91E32] hover:bg-[#D01426] text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Three Trust Indicators */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2.5 border-t border-[#E5E9ED]/90 max-w-md">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#CBD5E1] flex items-center justify-center shrink-0 bg-white/90 shadow-2xs">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#111D27]" />
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold text-[#111D27] truncate">Trusted Quality</div>
                <div className="text-[9px] sm:text-[10px] text-[#737D87] truncate">Genuine Products</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#CBD5E1] flex items-center justify-center shrink-0 bg-white/90 shadow-2xs">
                <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#111D27]" />
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold text-[#111D27] truncate">Reliable Service</div>
                <div className="text-[9px] sm:text-[10px] text-[#737D87] truncate">Nationwide Support</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#CBD5E1] flex items-center justify-center shrink-0 bg-white/90 shadow-2xs">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#111D27]" />
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-[10px] sm:text-[11px] font-bold text-[#111D27] truncate">Warranty</div>
                <div className="text-[9px] sm:text-[10px] text-[#737D87] truncate">Up to 2 Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative handwritten script placed in top right */}
        <div className="absolute top-3 sm:top-5 right-4 sm:right-8 md:right-10 text-right select-none pointer-events-none hidden sm:block z-10">
          <div
            className="text-[#2B3540] font-bold text-2xl sm:text-3xl md:text-[34px] leading-[1.08] opacity-90 -rotate-2 tracking-tight drop-shadow-2xs"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Choose<br />
            Digital<br />
            Lifestyle
          </div>
        </div>

        {/* Carousel indicators at bottom center */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {[0, 1, 2, 3].map((dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveSlide(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === dotIndex
                  ? 'w-6 bg-[#E91E32]'
                  : 'w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
