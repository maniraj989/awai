import React, { useEffect } from 'react';
import {
  X,
  Home,
  ShoppingBag,
  Info,
  BookOpen,
  PhoneCall,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TikTokIcon, LinkedinIcon } from './SocialIcons';

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  activeNav = 'home',
  onNavClick,
  onCategorySelect,
  onSpecialOfferClick,
}) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'shop', label: 'Shop Products', icon: ShoppingBag, href: '#shop' },
    { id: 'about', label: 'About AWAI', icon: Info, href: '#about' },
    { id: 'blog', label: 'Latest Blog', icon: BookOpen, href: '#blog' },
    { id: 'contact', label: 'Contact Us', icon: PhoneCall, href: '#contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in drawer container */}
      <div
        className="fixed inset-y-0 left-0 w-full max-w-[320px] sm:max-w-sm bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E9ED] bg-white sticky top-0 z-10">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('home');
              onClose();
            }}
            className="flex items-center gap-2"
          >
            <img
              src="/images/logo.png"
              alt="AWAI Nepal"
              className="h-8 w-auto object-contain"
            />
          </a>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#E5E9ED] flex items-center justify-center text-[#737D87] hover:text-[#111D27] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Special Offer Highlight Banner */}
          <div
            onClick={() => {
              onSpecialOfferClick();
              onClose();
            }}
            className="p-3.5 rounded-xl bg-gradient-to-r from-[#E91E32] to-[#D01426] text-white shadow-sm flex items-center justify-between cursor-pointer group hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>Special Offers & Deals</span>
                </div>
                <div className="text-[11px] text-white/80">View exclusive discounts</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Primary Navigation Links */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.16em] text-[#94A3B8] uppercase px-2 mb-1.5">
              MAIN NAVIGATION
            </div>
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeNav === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavClick(link.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F8F9FA] text-[#E91E32] font-bold shadow-2xs'
                        : 'text-[#17212B] hover:bg-[#F8F9FA] hover:text-[#E91E32]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#E91E32] text-white'
                            : 'bg-[#F1F5F9] text-[#525E6B]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm">{link.label}</span>
                    </div>

                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E91E32]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Categories Section */}
          <div className="pt-2 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold tracking-[0.16em] text-[#94A3B8] uppercase">
                SHOP BY CATEGORY
              </span>
              <span className="text-[10px] font-semibold text-[#E91E32]">
                {CATEGORIES.length} Categories
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onCategorySelect(cat.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#525E6B] hover:text-[#E91E32] hover:bg-[#F8F9FA] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-7 h-7 object-contain bg-white rounded border border-[#E5E9ED] p-0.5 shrink-0"
                    />
                    <span className="text-xs font-medium text-[#111D27] group-hover:text-[#E91E32] truncate">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full shrink-0">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Customer Support Info */}
          <div className="pt-3 border-t border-[#F1F5F9]">
            <div className="text-[10px] font-bold tracking-[0.16em] text-[#94A3B8] uppercase px-2 mb-2">
              HELP & SUPPORT
            </div>

            <div className="space-y-2 text-xs bg-[#F8F9FA] rounded-xl p-3 border border-[#E5E9ED]">
              <a
                href="tel:+97714284654"
                className="flex items-center gap-2.5 text-[#17212B] hover:text-[#E91E32] transition-colors py-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
                <span className="font-semibold">+977 1-4284654</span>
              </a>

              <a
                href="mailto:info@awainepal.com"
                className="flex items-center gap-2.5 text-[#525E6B] hover:text-[#E91E32] transition-colors py-0.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
                <span>info@awainepal.com</span>
              </a>

              <div className="flex items-center gap-2.5 text-[#525E6B] py-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#E91E32] shrink-0" />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer with Social Icons */}
        <div className="px-5 py-3 border-t border-[#E5E9ED] bg-[#FAFAFA] flex items-center justify-between">
          <span className="text-[11px] text-[#737D87]">Follow AWAI Nepal</span>
          <div className="flex items-center gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors p-1"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors p-1"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors p-1"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors p-1"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#17212B] hover:text-[#E91E32] transition-colors p-1"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
