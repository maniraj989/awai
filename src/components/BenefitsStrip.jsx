import React from 'react';
import { Award, ShoppingBag, Headphones, ShieldCheck } from 'lucide-react';

export default function BenefitsStrip() {
  const benefits = [
    {
      icon: Award,
      title: 'Premium Quality',
      subtitle: 'Reliable & authentic products',
    },
    {
      icon: ShoppingBag,
      title: 'Wide Product Range',
      subtitle: 'For every lifestyle need',
    },
    {
      icon: Headphones,
      title: 'After Sales Support',
      subtitle: 'Committed to your satisfaction',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Brand',
      subtitle: 'Over 15 years of excellence',
    },
  ];

  return (
    <section className="w-full py-8 md:py-10 bg-[#FAFBFD] border-y border-[#E5E9ED]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E5E9ED]">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 px-3 sm:px-6 pt-4 sm:pt-0 first:pt-0 group"
              >
                {/* Pale-red circular background with line icon */}
                <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#E91E32] shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[#111D27] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#737D87] mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
