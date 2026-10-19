import React from 'react';
import { X, Calendar, Clock } from 'lucide-react';

export default function BlogModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E5E9ED] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9ED]">
          <div className="flex items-center gap-2 text-xs text-[#737D87]">
            <Calendar className="w-3.5 h-3.5 text-[#E91E32]" />
            <span>{blog.date}</span>
            <span>•</span>
            <Clock className="w-3.5 h-3.5" />
            <span>3 min read</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#737D87] hover:text-[#111D27] rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-4 bg-[#F5F6F7]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-xl font-bold text-[#111D27] mb-3 leading-snug">
            {blog.title}
          </h3>

          <p className="text-sm text-[#525E6B] leading-relaxed mb-4">
            {blog.excerpt}
          </p>

          <p className="text-sm text-[#525E6B] leading-relaxed mb-4">
            At AWAI Nepal, we are dedicated to helping households get the most value, longevity, and efficiency out of their appliances. Whether selecting the right cooling volume or optimizing power consumption during Nepal's diverse weather patterns, our engineered products ensure peak performance and minimal electricity usage.
          </p>

          <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#E5E9ED] text-xs text-[#737D87]">
            Have questions about appliance maintenance or warranty coverage? Visit any official AWAI showroom or contact our customer support center.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-[#E5E9ED] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#111D27] hover:bg-[#1E2E3D] text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}
