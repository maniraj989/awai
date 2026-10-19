import React from 'react';
import { Award, ShoppingBag, Headphones, ShieldCheck } from 'lucide-react';

export default function WhyChooseAwai() {
  const benefits = [
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'International Standards',
    },
    {
      icon: ShoppingBag,
      title: 'Wide Product Range',
      subtitle: 'For Every Home',
    },
    {
      icon: Headphones,
      title: 'After Sales Support',
      subtitle: 'Across Nepal',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Brand',
      subtitle: 'Over 15 Years',
    },
  ];

  return (
    <section className="w-full py-8 md:py-10 bg-[#F8F9FA] border-b border-[#E5E9ED]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 text-center">
        {/* Section Header */}
        <h2 className="text-xl md:text-2xl font-bold text-[#111D27] tracking-tight mb-1.5">
          Why Choose AWAI?
        </h2>
        <p className="text-xs md:text-sm text-[#737D87] max-w-xl mx-auto mb-8">
          More than just appliances, we bring innovation, quality and trust to your home.
        </p>

        {/* 4 Benefit Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E2E8F0]">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center px-4 pt-4 sm:pt-0 group"
              >
                <div className="w-11 h-11 rounded-full border border-[#D5DCE2] bg-white flex items-center justify-center text-[#111D27] mb-3 shadow-2xs group-hover:border-[#E91E32] group-hover:text-[#E91E32] transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-sm font-bold text-[#111D27] mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#737D87]">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
