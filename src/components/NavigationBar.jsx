import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function NavigationBar({
  activeNav = 'home',
  onNavClick,
  onSpecialOfferClick,
  onCategorySelect,
  onOpenMobileMenu,
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'shop', label: 'Shop', href: '#shop' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'contact', label: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className="w-full bg-[#FFFFFF] border-b border-[#E5E9ED] relative z-30">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4 md:px-8 h-10 sm:h-11 flex items-center justify-between gap-3">
        {/* Left Side: All Categories & Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 min-w-0">
          {/* All Categories Dropdown Trigger */}
          <div ref={dropdownRef} className="relative shrink-0">
            <button
              onClick={() => {
                if (window.innerWidth < 640 && onOpenMobileMenu) {
                  onOpenMobileMenu();
                } else {
                  setCategoriesOpen(!categoriesOpen);
                }
              }}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#111D27] hover:text-[#E91E32] transition-colors py-1 cursor-pointer focus:outline-none"
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <Menu className="w-4 h-4 text-[#111D27]" />
              <span className="hidden xs:inline">All Categories</span>
              <span className="xs:hidden">Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#737D87] transition-transform duration-200 hidden sm:block ${
                  categoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Categories Dropdown Menu (Desktop / Tablet) */}
            {categoriesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E9ED] rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onCategorySelect && onCategorySelect(cat.id);
                      setCategoriesOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs md:text-sm text-[#17212B] hover:bg-[#F8F9FA] hover:text-[#E91E32] flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-[#737D87]">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden sm:block h-4 w-px bg-[#E5E9ED]" />

          {/* Navigation Links for Tablet & Desktop */}
          <div className="hidden sm:flex items-center gap-5 md:gap-8 text-xs md:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick && onNavClick(link.id);
                  }}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#E91E32] font-semibold'
                      : 'text-[#17212B] hover:text-[#E91E32]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E91E32] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Navigation Scrollable Pills Strip (< sm) */}
          <div className="flex sm:hidden items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick && onNavClick(link.id);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#E91E32] text-white shadow-2xs font-bold'
                      : 'bg-[#F8F9FA] text-[#525E6B] hover:text-[#111D27]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Red Special Offer Button (Desktop & Tablet) */}
        <div className="hidden sm:block shrink-0">
          <button
            onClick={onSpecialOfferClick}
            className="inline-flex items-center gap-1.5 bg-[#E91E32] hover:bg-[#D01426] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Offer</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
