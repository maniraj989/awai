import React from 'react';
import { X, Sparkles, Tag, Check, Calendar } from 'lucide-react';

export default function SpecialOfferModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const offers = [
    {
      title: 'Festive Season Refrigerator Upgrade',
      discount: 'Up to 15% OFF',
      code: 'AWAIREF15',
      desc: 'Exclusive discount on AWAI 4-Door French Refrigerators with free delivery across Kathmandu Valley.',
      validUntil: 'Valid until May 31, 2025',
    },
    {
      title: 'Monsoon Washing Machine Bundle',
      discount: 'Flat Rs. 5,000 Cashback',
      code: 'WASHCLEAN',
      desc: 'Get direct instant cashback on 10kg Inverter Front Load Washing Machine models.',
      validUntil: 'Valid until June 15, 2025',
    },
    {
      title: 'Summer AC Installation Bonus',
      discount: 'Free Standard Installation',
      code: 'COOLSUMMER',
      desc: 'Complimentary standard copper piping and wall-bracket mounting with any AWAI Split AC purchase.',
      validUntil: 'Limited time offer',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#E5E9ED] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111D27] to-[#1E2E3D] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E91E32] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">AWAI Special Offers & Promotions</h3>
              <p className="text-xs text-white/70">Exclusive seasonal discounts on genuine appliances</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offers List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-[#E5E9ED] bg-[#F8F9FA] hover:border-[#CBD5E1] transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-sm font-bold text-[#111D27]">{offer.title}</h4>
                <span className="bg-[#E91E32] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                  {offer.discount}
                </span>
              </div>
              <p className="text-xs text-[#525E6B] mb-3 leading-relaxed">
                {offer.desc}
              </p>
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#E5E9ED]/70">
                <div className="flex items-center gap-1.5 font-mono font-bold text-[#111D27] bg-white px-2.5 py-1 rounded border border-[#E5E9ED]">
                  <Tag className="w-3 h-3 text-[#E91E32]" />
                  <span>{offer.code}</span>
                </div>
                <div className="flex items-center gap-1 text-[#737D87]">
                  <Calendar className="w-3 h-3" />
                  <span>{offer.validUntil}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-[#E5E9ED] flex items-center justify-between">
          <span className="text-xs text-[#737D87]">Show voucher code at authorized dealers</span>
          <button
            onClick={onClose}
            className="bg-[#111D27] hover:bg-[#1E2E3D] text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
