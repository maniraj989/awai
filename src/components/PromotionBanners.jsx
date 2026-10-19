import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromotionBanners({ onBannerClick }) {
  return (
    <section className="w-full py-7 md:py-9 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {/* Banner 1: Washing Machine */}
          <div className="relative rounded-xl overflow-hidden bg-[#EAEFF5] border border-[#E2E8F0] h-[240px] sm:h-[270px] flex items-center group shadow-xs">
            {/* Background Image */}
            <img
              src="/images/banner-washing-machine.png"
              alt="AWAI Washing Machine Lifestyle"
              className="absolute inset-0 w-full h-full object-cover object-right md:object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent w-full md:w-[70%]" />

            {/* Content on Left */}
            <div className="relative z-10 p-6 sm:p-8 max-w-xs sm:max-w-sm flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#737D87] uppercase mb-1.5 block">
                AWAI WASHING MACHINE
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111D27] leading-tight mb-2">
                Powerful Cleaning<br />
                for a Healthier Home
              </h3>

              <p className="text-[11px] sm:text-xs text-[#525E6B] font-medium mb-4">
                High performance <span className="text-[#94A3B8]">|</span> Energy efficient <span className="text-[#94A3B8]">|</span> Long lasting
              </p>

              <div>
                <button
                  onClick={() => onBannerClick && onBannerClick('washing-machines')}
                  className="inline-flex items-center gap-2 bg-[#111D27] hover:bg-[#1E2E3D] text-white text-xs font-semibold px-4 py-2 rounded-md transition-all duration-200 cursor-pointer shadow-xs group/btn"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Banner 2: Refrigerator */}
          <div className="relative rounded-xl overflow-hidden bg-[#F5F2EB] border border-[#E2E8F0] h-[240px] sm:h-[270px] flex items-center group shadow-xs">
            {/* Background Image */}
            <img
              src="/images/banner-refrigerator.png"
              alt="AWAI Refrigerator Lifestyle Kitchen"
              className="absolute inset-0 w-full h-full object-cover object-right md:object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent w-full md:w-[70%]" />

            {/* Content on Left */}
            <div className="relative z-10 p-6 sm:p-8 max-w-xs sm:max-w-sm flex flex-col justify-center">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#737D87] uppercase mb-1.5 block">
                AWAI REFRIGERATORS
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111D27] leading-tight mb-2">
                Keep Food Fresh<br />
                for Longer
              </h3>

              <p className="text-[11px] sm:text-xs text-[#525E6B] font-medium mb-4">
                More space <span className="text-[#94A3B8]">|</span> Better cooling <span className="text-[#94A3B8]">|</span> Smart design
              </p>

              <div>
                <button
                  onClick={() => onBannerClick && onBannerClick('refrigerators')}
                  className="inline-flex items-center gap-2 bg-[#111D27] hover:bg-[#1E2E3D] text-white text-xs font-semibold px-4 py-2 rounded-md transition-all duration-200 cursor-pointer shadow-xs group/btn"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
