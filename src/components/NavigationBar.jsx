import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function NavigationBar({
  activeNav = 'home',
  onNavClick,
  onSpecialOfferClick,
  onCategorySelect,
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
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 h-10 md:h-11 flex items-center justify-between">
        {/* Left Side: All Categories & Nav Links */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* All Categories Dropdown Trigger */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#111D27] hover:text-[#E91E32] transition-colors py-1 cursor-pointer focus:outline-none"
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
            >
              <Menu className="w-4 h-4 text-[#111D27]" />
              <span>All Categories</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#737D87] transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Categories Dropdown Menu */}
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

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center gap-6 md:gap-8 text-xs md:text-sm font-medium">
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
        </div>

        {/* Right Side: Red Special Offer Button */}
        <div>
          <button
            onClick={onSpecialOfferClick}
            className="inline-flex items-center gap-1.5 bg-[#E91E32] hover:bg-[#D01426] text-white text-xs font-semibold px-3.5 py-1.5 md:py-1.5 rounded-full transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Offer</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
