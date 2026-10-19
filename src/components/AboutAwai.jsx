import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

export default function AboutAwai({ onPlayVideo, onLearnMore }) {
  return (
    <section id="about" className="w-full py-8 md:py-12 bg-white border-b border-[#F1F5F9]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Landscape Image with Play Button */}
          <div className="relative rounded-xl overflow-hidden border border-[#E5E9ED] bg-[#F8F9FA] aspect-[16/10] sm:aspect-[16/9] group shadow-xs">
            <img
              src="/images/about-living-room.jpg"
              alt="AWAI Nepal Living Room Experience"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              loading="lazy"
            />

            {/* Subtle dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-colors" />

            {/* Play Button */}
            <button
              onClick={onPlayVideo}
              className="absolute inset-0 m-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E91E32] hover:bg-[#D01426] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none ring-4 ring-white/60 hover:ring-white/80"
              aria-label="Play AWAI Nepal Brand Video"
            >
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </button>
          </div>

          {/* Right Column: Brand Copy & Learn More CTA */}
          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#737D87] uppercase mb-2 block">
              ABOUT AWAI NEPAL
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#111D27] leading-tight mb-4 tracking-tight">
              Innovation for<br />
              a Better Tomorrow
            </h2>

            <p className="text-xs sm:text-sm text-[#525E6B] leading-relaxed mb-6 font-normal">
              AWAI Nepal is a trusted name in home appliances, bringing world-class technology and modern design to homes across Nepal. We are committed to delivering quality products, reliable service and innovative solutions for a smarter, more comfortable lifestyle.
            </p>

            <div>
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 border border-[#17212B] hover:border-[#E91E32] hover:text-[#E91E32] text-[#17212B] text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-md transition-all duration-200 cursor-pointer group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
