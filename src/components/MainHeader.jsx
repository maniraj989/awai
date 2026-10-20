import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Menu, Sparkles } from 'lucide-react';
import { BEST_SELLING_PRODUCTS, CATEGORIES } from '../data/mockData';

export default function MainHeader({
  onProductSelect,
  onCategorySelect,
  onHomeClick,
  onOpenMobileMenu,
  onSpecialOfferClick,
}) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

  const categoryOptions = [
    'All Categories',
    'Home Appliances',
    'Kitchen Appliances',
    'TV & Entertainment',
    'Cooling Solutions',
    'Personal Care',
  ];

  // Filter products and categories based on search query
  const filteredProducts = query.trim() === '' ? [] : BEST_SELLING_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.specs.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = query.trim() === '' ? [] : CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchDropdownOpen(true);
    }
  };

  const renderSearchForm = (isMobile = false) => (
    <div ref={!isMobile ? searchRef : undefined} className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-2xl'}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full bg-white border border-[#E5E9ED] rounded-lg overflow-hidden focus-within:border-[#E91E32] focus-within:ring-1 focus-within:ring-[#E91E32] transition-all shadow-2xs"
      >
        {/* Input field */}
        <div className="relative flex-1 flex items-center min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchDropdownOpen(true);
            }}
            onFocus={() => setSearchDropdownOpen(true)}
            placeholder={isMobile ? "Search products (AC, Fridge...)" : "Search for products..."}
            className="w-full h-9 sm:h-10 md:h-11 pl-3.5 pr-8 text-xs md:text-sm text-[#17212B] placeholder:text-[#94A3B8] focus:outline-none bg-transparent"
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 text-[#94A3B8] hover:text-[#17212B] p-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Select Category Dropdown - visible on sm+ */}
        {!isMobile && (
          <div ref={categoryRef} className="relative hidden md:block border-l border-[#E5E9ED]">
            <button
              type="button"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="h-10 md:h-11 px-3 text-xs text-[#525E6B] font-medium flex items-center gap-1.5 hover:bg-[#F8F9FA] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="max-w-[120px] truncate">{selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#737D87]" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-[#E5E9ED] rounded-lg shadow-lg py-1 z-50 animate-in fade-in duration-150">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(opt);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      selectedCategory === opt
                        ? 'bg-[#F8F9FA] text-[#E91E32] font-semibold'
                        : 'text-[#17212B] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Red Search Button */}
        <button
          type="submit"
          className="h-9 sm:h-10 md:h-11 px-3.5 sm:px-4 md:px-5 bg-[#E91E32] hover:bg-[#D01426] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          aria-label="Submit search"
        >
          <Search className="w-4 h-4 text-white stroke-[2.2]" />
        </button>
      </form>

      {/* Interactive Search Results Dropdown */}
      {searchDropdownOpen && query.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5E9ED] rounded-lg shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
          {filteredCategories.length > 0 && (
            <div className="p-2 border-b border-[#F1F5F9]">
              <div className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase px-3 py-1">
                Categories
              </div>
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onCategorySelect && onCategorySelect(cat.id);
                    setSearchDropdownOpen(false);
                    setQuery('');
                  }}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm text-[#17212B] hover:bg-[#F8F9FA] rounded-md flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-xs text-[#737D87]">{cat.count}</span>
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="p-2">
              <div className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase px-3 py-1">
                Products
              </div>
              {filteredProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    onProductSelect && onProductSelect(prod.id);
                    setSearchDropdownOpen(false);
                    setQuery('');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#F8F9FA] rounded-md flex items-center gap-3 cursor-pointer transition-colors"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-9 h-9 object-contain bg-[#F8F9FA] rounded p-0.5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-[#111D27] truncate">
                      {prod.name}
                    </div>
                    <div className="text-[11px] text-[#737D87] truncate">
                      {prod.specs}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#E91E32] shrink-0">
                    {prod.price}
                  </div>
                </button>
              ))}
            </div>
          )}

          {filteredCategories.length === 0 && filteredProducts.length === 0 && (
            <div className="p-5 text-center text-xs sm:text-sm text-[#737D87]">
              No products found for "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#E5E9ED] relative z-40">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4 md:px-8">
        {/* Main Header Row */}
        <div className="h-14 sm:h-16 md:h-[68px] flex items-center justify-between gap-3 sm:gap-6 md:gap-8">
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="inline-flex sm:hidden p-2 -ml-1 text-[#111D27] hover:bg-[#F8F9FA] rounded-lg transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 text-[#111D27]" />
            </button>

            {/* AWAI Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                if (onHomeClick) {
                  e.preventDefault();
                  onHomeClick();
                }
              }}
              className="flex items-center shrink-0 group focus:outline-none"
              aria-label="AWAI Nepal Home"
            >
              <img
                src="/images/logo.png"
                alt="AWAI - Choose Digital Lifestyle"
                className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Center: Search Bar for Tablet & Desktop (Hidden on mobile) */}
          <div className="hidden sm:block flex-1 max-w-2xl">
            {renderSearchForm(false)}
          </div>

          {/* Right: Quick Mobile Special Offer Pill / Tablet Quick Info */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Special Offer Button */}
            <button
              type="button"
              onClick={onSpecialOfferClick}
              className="sm:hidden inline-flex items-center gap-1.5 bg-[#E91E32] hover:bg-[#D01426] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offer</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Row (Full Width underneath logo bar on <sm) */}
        <div ref={searchRef} className="pb-3 pt-0 sm:hidden">
          {renderSearchForm(true)}
        </div>
      </div>
    </header>
  );
}
