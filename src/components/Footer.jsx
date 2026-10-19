import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TikTokIcon, LinkedinIcon } from './SocialIcons';

export default function Footer({ onCategoryClick, onQuickLinkClick }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // Success response
    setStatus({
      state: 'success',
      message: 'Thank you for subscribing! You will receive our latest updates soon.',
    });
    setEmail('');
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'About Us', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact Us', id: 'contact' },
  ];

  const categories = [
    'Home Appliances',
    'Kitchen Appliances',
    'TV & Entertainment',
    'Cooling Solutions',
    'Personal Care',
    'All Categories',
  ];

  return (
    <footer id="contact" className="w-full bg-[#101B24] text-[#94A3B8] text-xs pt-12 pb-8 border-t border-[#1D2B37]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* 4 Balanced Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10">
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col">
            <div className="mb-3">
              {/* White AWAI Logo treatment */}
              <img
                src="/images/logo.png"
                alt="AWAI Nepal - Choose Digital Lifestyle"
                className="h-10 w-auto object-contain brightness-0 invert opacity-95"
              />
            </div>

            <div className="text-[11px] font-semibold text-white/90 tracking-wide uppercase mb-3">
              Choose Digital Lifestyle
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed mb-5 max-w-xs">
              Awai Nepal is a trusted distributor of high-quality electronic products, committed to innovation, reliability, and exceptional service across Nepal.
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#182632] flex items-center justify-center text-white hover:bg-[#E91E32] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#182632] flex items-center justify-center text-white hover:bg-[#E91E32] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#182632] flex items-center justify-center text-white hover:bg-[#E91E32] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#182632] flex items-center justify-center text-white hover:bg-[#E91E32] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#182632] flex items-center justify-center text-white hover:bg-[#E91E32] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onQuickLinkClick && onQuickLinkClick(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onCategoryClick && onCategoryClick(cat)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch & Stay Updated */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">
              Get in Touch
            </h4>
            <div className="space-y-2 mb-5 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
                <a href="tel:+97714284654" className="hover:text-white transition-colors">
                  +977 1-4284654
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
                <a href="mailto:info@awainepal.com" className="hover:text-white transition-colors">
                  info@awainepal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>

            {/* Stay Updated Newsletter */}
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide uppercase mb-2">
                Stay Updated
              </h5>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded-lg bg-[#182632] border border-[#2A3A49] p-1 focus-within:border-[#E91E32] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status.state !== 'idle') setStatus({ state: 'idle', message: '' });
                    }}
                    placeholder="Your email address"
                    className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-[#64748B] focus:outline-none"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="bg-[#E91E32] hover:bg-[#D01426] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </div>

                {/* Feedback messages */}
                {status.state === 'success' && (
                  <div className="flex items-start gap-1.5 text-emerald-400 text-[11px] pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{status.message}</span>
                  </div>
                )}

                {status.state === 'error' && (
                  <div className="flex items-start gap-1.5 text-rose-400 text-[11px] pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-[#1D2B37] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64748B]">
          <div>
            © 2025 AWAI Nepal. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-[#94A3B8] transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#privacy" className="hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#shipping" className="hover:text-[#94A3B8] transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
