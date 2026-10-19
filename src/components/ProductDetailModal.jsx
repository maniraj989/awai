import React from 'react';
import { X, Star, ShieldCheck, Check, Info } from 'lucide-react';

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E5E9ED] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9ED]">
          <div className="flex items-center gap-2">
            {product.badge && (
              <span className="bg-[#E91E32] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                {product.badge}
              </span>
            )}
            <h3 className="text-base font-bold text-[#111D27]">{product.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#737D87] hover:text-[#111D27] rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Product Image */}
          <div className="bg-[#F8F9FA] rounded-lg p-4 flex items-center justify-center border border-[#E5E9ED] min-h-[220px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-56 max-w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#17212B]">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="text-2xl font-extrabold text-[#E91E32] mb-3">
                {product.price}
              </div>

              <div className="text-xs text-[#737D87] font-medium mb-4 pb-3 border-b border-[#F1F5F9]">
                Specifications: <span className="text-[#17212B] font-semibold">{product.specs}</span>
              </div>

              <div className="space-y-2 mb-4 text-xs text-[#525E6B]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Genuine AWAI Official Product</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Comprehensive Inverter Warranty up to 2 Years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free Prompt Delivery in Kathmandu Valley</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-3 rounded-lg border border-[#E5E9ED] flex items-start gap-2 text-xs text-[#737D87]">
              <Info className="w-4 h-4 text-[#111D27] shrink-0 mt-0.5" />
              <span>
                Available across official AWAI dealer showrooms throughout Nepal. Contact our support team for warranty registration.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-[#E5E9ED] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#737D87]">
            <ShieldCheck className="w-4 h-4 text-[#111D27]" />
            <span>Official Brand Certified</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#111D27] hover:bg-[#1E2E3D] text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
