import React from 'react';
import { X, Play } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#111D27] rounded-xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E91E32]" />
            <h3 className="text-sm font-semibold">AWAI Nepal - Brand Story & Innovation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-[#0B131A] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#E91E32]/90 flex items-center justify-center shadow-lg mb-4 text-white ring-8 ring-white/10">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">
            Experience the AWAI Digital Lifestyle
          </h4>
          <p className="text-xs text-white/70 max-w-md leading-relaxed mb-4">
            Discover cutting-edge cooling systems, intelligent laundry cycles, and smart home appliances engineered for Nepali households.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#E91E32] font-semibold bg-[#E91E32]/10 px-3 py-1 rounded-full border border-[#E91E32]/20">
            Official Brand Presentation • 4K Ultra HD
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#0E1720] border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <span>AWAI Nepal Electronics Pvt. Ltd.</span>
          <button
            onClick={onClose}
            className="text-xs text-white hover:text-[#E91E32] font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
