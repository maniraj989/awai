import React from 'react';
import { Play } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TikTokIcon, LinkedinIcon } from '../components/SocialIcons';
import BenefitsStrip from '../components/BenefitsStrip';

export default function AboutPage({ onPlayVideo }) {
  return (
    <div className="w-full bg-white">
      {/* Breadcrumb / Page Path */}
      <div className="w-full bg-[#FAFBFD] border-b border-[#E5E9ED] py-3 px-4 md:px-8">
        <div className="max-w-[1240px] mx-auto flex items-center gap-2 text-xs text-[#737D87]">
          <a href="#home" className="hover:text-[#E91E32] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#111D27] font-semibold">About Us</span>
        </div>
      </div>

      {/* Main About Us Section - 2 Balanced Columns */}
      <section className="w-full py-10 md:py-16">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-start">
            {/* Left Column: Two wide landscape images stacked vertically */}
            <div className="flex flex-col gap-5 sm:gap-6">
              {/* Image 1: Bright AWAI appliance brand banner */}
              <div className="relative rounded-xl overflow-hidden border border-[#E5E9ED] bg-[#F8F9FA] aspect-[16/9] shadow-xs group">
                <img
                  src="/images/hero-appliances.png"
                  alt="AWAI Nepal Appliance Brand Collection"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                {/* Subtle brand tag in corner */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-[#111D27] tracking-wider uppercase border border-white/60 shadow-2xs">
                  Official AWAI Collection
                </div>
              </div>

              {/* Image 2: Dark premium lifestyle image with circular play button */}
              <div className="relative rounded-xl overflow-hidden border border-[#1E293B] bg-[#0F172A] aspect-[16/9] shadow-md group">
                <img
                  src="/images/about-dark-living-room.jpg"
                  alt="AWAI Smart Living Experience"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Dark atmospheric overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

                {/* Centered Red Circular Play Button */}
                <button
                  onClick={onPlayVideo}
                  className="absolute inset-0 m-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E91E32] hover:bg-[#D01426] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none ring-4 ring-white/50 hover:ring-white/80"
                  aria-label="Play brand video"
                >
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Narrative Content & Brand Story */}
            <div className="flex flex-col justify-center">
              {/* Small red uppercase label */}
              <div className="text-xs font-bold tracking-[0.2em] text-[#E91E32] uppercase mb-2">
                ABOUT AWAI NEPAL
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111D27] tracking-tight leading-tight">
                Innovation for a<br />
                Better Tomorrow
              </h1>

              {/* Short red underline beneath heading */}
              <div className="w-16 h-1 bg-[#E91E32] rounded-full mt-3 mb-6" />

              {/* Supporting Introduction */}
              <p className="text-sm md:text-base font-semibold text-[#17212B] leading-relaxed mb-4">
                Delivering high-quality electronic products from renowned global brands with reliability, innovation, and unmatched service across Nepal.
              </p>

              {/* Company Description Paragraphs */}
              <div className="space-y-4 text-xs md:text-sm text-[#525E6B] leading-relaxed font-normal">
                <p>
                  With over 15 years of excellence in electronics distribution, Awai Nepal stands as a trusted name in delivering high-quality electronic commodities to wholesalers across Nepal. Formerly known as Akash International, Awai Nepal continues its legacy under a refreshed identity, focusing on providing innovative and customer-oriented solutions to meet the diverse needs of the Nepalese market.
                </p>
                <p>
                  As Awai Nepal, we aim to strengthen our presence in the Nepalese market by fostering relationships with wholesalers and introducing innovative products that elevate our consumers’ lifestyles. We are committed to becoming the leading distributor of electronic goods in Nepal and setting new benchmarks in quality and service.
                </p>
              </div>

              {/* Thin Divider & Social Media Section */}
              <div className="mt-8 pt-6 border-t border-[#E5E9ED]">
                <div className="text-[11px] font-bold tracking-wider text-[#737D87] uppercase mb-3">
                  FOLLOW US ON SOCIAL MEDIA
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#D5DCE2] bg-[#F8F9FA] flex items-center justify-center text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] transition-all cursor-pointer shadow-2xs"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#D5DCE2] bg-[#F8F9FA] flex items-center justify-center text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] transition-all cursor-pointer shadow-2xs"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#D5DCE2] bg-[#F8F9FA] flex items-center justify-center text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] transition-all cursor-pointer shadow-2xs"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#D5DCE2] bg-[#F8F9FA] flex items-center justify-center text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] transition-all cursor-pointer shadow-2xs"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#D5DCE2] bg-[#F8F9FA] flex items-center justify-center text-[#111D27] hover:bg-[#E91E32] hover:text-white hover:border-[#E91E32] transition-all cursor-pointer shadow-2xs"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Benefits Strip beneath the main section */}
      <BenefitsStrip />
    </div>
  );
}
