import React from 'react';
import { Truck, Store, ShieldCheck, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon, TikTokIcon } from './SocialIcons';

export default function UtilityBar({ onContactClick }) {
  return (
    <div className="w-full bg-[#FFFFFF] border-b border-[#E5E9ED] text-[#737D87] text-[11px] leading-none py-1.5 px-3 sm:px-4 md:px-8">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-2">
        {/* Mobile View: Single concise highlight */}
        <div className="flex md:hidden items-center gap-1.5 min-w-0">
          <Truck className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
          <span className="truncate font-medium text-[#525E6B]">
            Free delivery across Nepal • Genuine AWAI Store
          </span>
        </div>

        {/* Desktop / Tablet View: Full trust highlights */}
        <div className="hidden md:flex items-center flex-wrap gap-3 lg:gap-4 justify-start">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#17212B]" />
            <span>Free shipping for bulk orders across Nepal</span>
          </div>

          <span className="text-[#CBD5E1]">|</span>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#17212B]" />
            <span>Genuine products with warranty</span>
          </div>

          <span className="text-[#CBD5E1]">|</span>

          <div className="flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-[#17212B]" />
            <span>AWAI Nepal official store</span>
          </div>
        </div>

        {/* Right Side: Quick contact on mobile, full socials on desktop */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile Direct Phone Link */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+97714284654"
              className="flex items-center gap-1 text-[11px] font-bold text-[#111D27] hover:text-[#E91E32] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E91E32]" />
              <span className="hidden xs:inline">Call: </span>+977 1-4284654
            </a>
          </div>

          {/* Desktop Socials */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-3 h-3" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3 h-3" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-3 h-3" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-3 h-3" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3 h-3" />
            </a>
          </div>

          <span className="hidden md:inline-block text-[#CBD5E1]">|</span>

          <button
            onClick={onContactClick}
            className="hidden md:inline-block hover:text-[#E91E32] cursor-pointer font-medium transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
