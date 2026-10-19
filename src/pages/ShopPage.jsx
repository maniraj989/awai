import React, { useState, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Wind,
  Fan,
  Droplets,
  Tv,
  Refrigerator,
  Home,
  SlidersHorizontal,
  Check,
  X
} from 'lucide-react';
import { SHOP_PRODUCTS, SHOP_CATEGORIES, TOP_RATED_PRODUCTS } from '../data/shopProducts';

export default function ShopPage({ onProductSelect, onHomeClick }) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 120000]);
  const [maxPriceInput, setMaxPriceInput] = useState(120000);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  // View & Pagination state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('default');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Apply Price Filter button
  const handleApplyPriceFilter = () => {
    setPriceRange([0, Number(maxPriceInput)]);
    setCurrentPage(1);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price range
      if (product.numericPrice > priceRange[1]) {
        return false;
      }
      // Stock Status
      if (onSaleOnly && !product.onSale) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.numericPrice - b.numericPrice;
      }
      if (sortBy === 'price-high') {
        return b.numericPrice - a.numericPrice;
      }
      if (sortBy === 'popularity') {
        return (b.reviews || 0) - (a.reviews || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0; // Default
    });
  }, [selectedCategory, priceRange, onSaleOnly, inStockOnly, sortBy]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Category icons helper
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'air-conditioners':
        return <Wind className="w-3.5 h-3.5" />;
      case 'fans':
        return <Fan className="w-3.5 h-3.5" />;
      case 'coolers':
        return <Droplets className="w-3.5 h-3.5" />;
      case 'washing-machines':
        return <Tv className="w-3.5 h-3.5" />;
      case 'refrigerators':
        return <Refrigerator className="w-3.5 h-3.5" />;
      default:
        return <Home className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5]/60 min-h-screen">
      {/* 1. Shop Hero Section matching Reference */}
      <section className="w-full bg-[#FFFFFF] border-b border-[#E5E9ED] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Left Text & Breadcrumbs */}
          <div className="w-full md:w-[55%] z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs font-medium mb-1.5">
              <button
                onClick={onHomeClick}
                className="text-[#E91E32] hover:underline cursor-pointer font-semibold"
              >
                Home
              </button>
              <span className="text-[#94A3B8]">/</span>
              <span className="text-[#737D87]">Shop</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111D27] tracking-tight mb-1.5">
              Shop All Products
            </h1>
            <p className="text-xs sm:text-sm text-[#737D87] font-normal leading-relaxed max-w-xl">
              Discover high-quality home appliances for a smarter and more comfortable lifestyle.
            </p>
          </div>

          {/* Right Appliances Illustration from Reference */}
          <div className="hidden md:flex items-center justify-end w-full md:w-[45%] h-24 sm:h-28 overflow-hidden select-none pointer-events-none">
            <img
              src="/images/shop/shop-header-appliances.png"
              alt="AWAI Appliances Selection"
              className="h-full w-auto object-contain opacity-95"
            />
          </div>
        </div>
      </section>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden max-w-[1240px] mx-auto px-4 pt-4">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="w-full py-2.5 px-4 bg-white border border-[#E5E9ED] rounded-lg text-xs font-bold text-[#111D27] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#E91E32]" />
          <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters & Categories'}</span>
        </button>
      </div>

      {/* 2. Main Shop Content (Sidebar + Product Grid) */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className={`lg:col-span-3 space-y-5 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            
            {/* Filter 1: Price Range */}
            <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 shadow-xs">
              <h3 className="text-[11px] font-bold tracking-[0.16em] text-[#111D27] uppercase mb-4 border-b border-[#F1F5F9] pb-2">
                FILTER BY PRICE
              </h3>

              {/* Slider Track */}
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="120000"
                  step="5000"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E9ED] rounded-lg appearance-none cursor-pointer accent-[#E91E32]"
                />

                <div className="flex items-center justify-between text-xs text-[#525E6B] font-medium pt-1">
                  <span>Price: <strong className="text-[#111D27]">Rs. 0</strong> – <strong className="text-[#111D27]">Rs. {Number(maxPriceInput).toLocaleString()}</strong></span>
                </div>

                <button
                  onClick={handleApplyPriceFilter}
                  className="w-full py-2 px-4 bg-[#E91E32] hover:bg-[#D01426] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all shadow-xs cursor-pointer mt-2"
                >
                  Filter
                </button>
              </div>
            </div>

            {/* Filter 2: Stock Status */}
            <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 shadow-xs">
              <h3 className="text-[11px] font-bold tracking-[0.16em] text-[#111D27] uppercase mb-3.5 border-b border-[#F1F5F9] pb-2">
                STOCK STATUS
              </h3>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 text-xs text-[#525E6B] hover:text-[#111D27] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => {
                      setOnSaleOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-[#E91E32] border-[#CBD5E1] focus:ring-[#E91E32] cursor-pointer"
                  />
                  <span className={onSaleOnly ? 'font-bold text-[#E91E32]' : ''}>On Sale</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#525E6B] hover:text-[#111D27] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                      setInStockOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-[#E91E32] border-[#CBD5E1] focus:ring-[#E91E32] cursor-pointer"
                  />
                  <span className={inStockOnly ? 'font-bold text-[#E91E32]' : ''}>In Stock</span>
                </label>
              </div>
            </div>

            {/* Filter 3: Categories List */}
            <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3.5 border-b border-[#F1F5F9] pb-2">
                <h3 className="text-[11px] font-bold tracking-[0.16em] text-[#111D27] uppercase">
                  CATEGORIES
                </h3>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#E91E32] hover:underline font-semibold cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {/* All Categories Option */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                    selectedCategory === 'all'
                      ? 'bg-rose-50 text-[#E91E32] font-bold'
                      : 'text-[#525E6B] hover:bg-[#F8F9FA] hover:text-[#111D27]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#737D87]">●</span>
                    <span>All Categories</span>
                  </div>
                  <span className="text-[11px] text-[#94A3B8]">({SHOP_PRODUCTS.length})</span>
                </button>

                {SHOP_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(isSelected ? 'all' : cat.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-rose-50 text-[#E91E32] font-bold'
                          : 'text-[#525E6B] hover:bg-[#F8F9FA] hover:text-[#111D27]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#94A3B8]">{getCategoryIcon(cat.id)}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-[#94A3B8]">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 4: Top Rated Products */}
            <div className="bg-white border border-[#E5E9ED] rounded-xl p-5 shadow-xs">
              <h3 className="text-[11px] font-bold tracking-[0.16em] text-[#111D27] uppercase mb-4 border-b border-[#F1F5F9] pb-2">
                TOP RATED PRODUCTS
              </h3>

              <div className="space-y-3.5 divide-y divide-[#F1F5F9]">
                {TOP_RATED_PRODUCTS.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => onProductSelect && onProductSelect(item.id)}
                    className="flex items-center gap-3 pt-3 first:pt-0 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg border border-[#E5E9ED] bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#E91E32] transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-[#111D27] uppercase leading-tight line-clamp-1 group-hover:text-[#E91E32] transition-colors">
                        {item.name}
                      </div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < item.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-[#E2E8F0]'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs font-bold text-[#E91E32] mt-0.5">
                        {item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN PRODUCT GRID ================= */}
          <main className="lg:col-span-9 space-y-5">
            
            {/* Top Toolbar */}
            <div className="bg-white border border-[#E5E9ED] rounded-xl px-4 py-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Product Counter */}
              <div className="text-xs text-[#737D87]">
                Showing <span className="font-bold text-[#111D27]">{totalItems > 0 ? startIndex + 1 : 0}</span> – <span className="font-bold text-[#111D27]">{endIndex}</span> of <span className="font-bold text-[#111D27]">{totalItems}</span> products
              </div>

              {/* Controls: Show Count, View Switcher, Sort Dropdown */}
              <div className="flex items-center flex-wrap gap-4">
                {/* Show Items Selector: 9, 12, 18, 24 */}
                <div className="flex items-center gap-1.5 text-xs text-[#737D87]">
                  <span className="font-medium">Show:</span>
                  {[9, 12, 18, 24].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setItemsPerPage(count);
                        setCurrentPage(1);
                      }}
                      className={`px-1 py-0.5 font-bold transition-colors cursor-pointer ${
                        itemsPerPage === count
                          ? 'text-[#E91E32] underline'
                          : 'text-[#737D87] hover:text-[#111D27]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-[#E5E9ED]" />

                {/* Grid / List View Toggle */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'text-[#E91E32] bg-rose-50'
                        : 'text-[#94A3B8] hover:text-[#111D27]'
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'text-[#E91E32] bg-rose-50'
                        : 'text-[#94A3B8] hover:text-[#111D27]'
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-4 w-px bg-[#E5E9ED]" />

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-8 pl-2.5 pr-7 text-xs font-semibold text-[#111D27] bg-[#F8F9FA] border border-[#E5E9ED] rounded-lg cursor-pointer focus:outline-none focus:border-[#E91E32] appearance-none"
                  >
                    <option value="default">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="rating">Sort by average rating</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#737D87] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Summary Pills */}
            {(selectedCategory !== 'all' || onSaleOnly || inStockOnly || priceRange[1] < 120000) && (
              <div className="flex items-center flex-wrap gap-2 pt-1">
                <span className="text-xs text-[#737D87] font-medium">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-[#E91E32] border border-rose-200">
                    Category: {SHOP_CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedCategory('all')}
                    />
                  </span>
                )}
                {priceRange[1] < 120000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-[#E91E32] border border-rose-200">
                    Under Rs. {priceRange[1].toLocaleString()}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => {
                        setMaxPriceInput(120000);
                        setPriceRange([0, 120000]);
                      }}
                    />
                  </span>
                )}
                {onSaleOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-[#E91E32] border border-rose-200">
                    On Sale
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setOnSaleOnly(false)}
                    />
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-[#E91E32] border border-rose-200">
                    In Stock
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setInStockOnly(false)}
                    />
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setOnSaleOnly(false);
                    setInStockOnly(false);
                    setMaxPriceInput(120000);
                    setPriceRange([0, 120000]);
                  }}
                  className="text-xs text-[#E91E32] hover:underline font-semibold cursor-pointer ml-1"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Empty State */}
            {currentProducts.length === 0 && (
              <div className="bg-white border border-[#E5E9ED] rounded-xl p-12 text-center">
                <p className="text-base font-bold text-[#111D27] mb-2">No products found matching your filter criteria.</p>
                <p className="text-xs text-[#737D87] mb-4">Try clearing some filters or searching with different parameters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setOnSaleOnly(false);
                    setInStockOnly(false);
                    setMaxPriceInput(120000);
                    setPriceRange([0, 120000]);
                  }}
                  className="px-4 py-2 bg-[#E91E32] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Product Grid View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductSelect && onProductSelect(product.id)}
                    className="bg-white border border-[#E5E9ED] rounded-xl p-5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] cursor-pointer group relative"
                  >
                    {/* Sale Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#E91E32] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs tracking-wider z-10">
                        {product.badge}
                      </div>
                    )}

                    {/* Product Image Area */}
                    <div className="w-full h-44 sm:h-48 flex items-center justify-center mb-3.5 p-2 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="eager"
                      />
                    </div>

                    {/* Product Name (Centered) */}
                    <h3 className="text-xs sm:text-[13px] font-bold text-[#111D27] leading-snug mb-1 line-clamp-2 min-h-[34px] group-hover:text-[#E91E32] transition-colors">
                      {product.name}
                    </h3>

                    {/* Product Category (Centered) */}
                    <div className="text-[10px] tracking-wider text-[#737D87] font-semibold uppercase mb-2">
                      {product.categoryLabel}
                    </div>

                    {/* Price (Centered) */}
                    <div className="mt-auto pt-1">
                      {product.originalPrice ? (
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-[11px] text-[#94A3B8] line-through font-medium">
                            {product.originalPrice}
                          </span>
                          <span className="text-xs sm:text-sm font-extrabold text-[#E91E32]">
                            {product.price}
                          </span>
                        </div>
                      ) : (
                        <div className="text-xs sm:text-sm font-extrabold text-[#E91E32]">
                          {product.price}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Product List View */
              <div className="space-y-4">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductSelect && onProductSelect(product.id)}
                    className="bg-white border border-[#E5E9ED] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 transition-all duration-200 hover:shadow-md hover:border-[#CBD5E1] cursor-pointer group relative"
                  >
                    {/* Sale Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#E91E32] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs tracking-wider z-10">
                        {product.badge}
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="w-40 h-36 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="eager"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="text-[10px] tracking-wider text-[#737D87] font-semibold uppercase mb-1">
                        {product.categoryLabel}
                      </div>
                      <h3 className="text-sm font-bold text-[#111D27] leading-snug mb-2 group-hover:text-[#E91E32] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#525E6B] mb-3 line-clamp-2">
                        {product.specs}
                      </p>
                      <div>
                        {product.originalPrice ? (
                          <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <span className="text-xs text-[#94A3B8] line-through font-medium">
                              {product.originalPrice}
                            </span>
                            <span className="text-sm font-extrabold text-[#E91E32]">
                              {product.price}
                            </span>
                          </div>
                        ) : (
                          <div className="text-sm font-extrabold text-[#E91E32]">
                            {product.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-6 pb-2 select-none">
                {/* Prev Arrow */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded border border-[#E5E9ED] bg-white flex items-center justify-center text-[#737D87] hover:border-[#E91E32] hover:text-[#E91E32] disabled:opacity-40 disabled:hover:border-[#E5E9ED] disabled:hover:text-[#737D87] cursor-pointer disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E91E32] text-white shadow-xs'
                          : 'bg-white border border-[#E5E9ED] text-[#111D27] hover:border-[#E91E32] hover:text-[#E91E32]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Arrow */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded border border-[#E5E9ED] bg-white flex items-center justify-center text-[#737D87] hover:border-[#E91E32] hover:text-[#E91E32] disabled:opacity-40 disabled:hover:border-[#E5E9ED] disabled:hover:text-[#737D87] cursor-pointer disabled:cursor-not-allowed transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </main>
        </div>
      </section>
    </div>
  );
}
