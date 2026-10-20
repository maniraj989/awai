import React, { useState, useEffect } from 'react';
import UtilityBar from './components/UtilityBar';
import MainHeader from './components/MainHeader';
import NavigationBar from './components/NavigationBar';
import HeroBanner from './components/HeroBanner';
import CategorySection from './components/CategorySection';
import BestSellingSection from './components/BestSellingSection';
import PromotionBanners from './components/PromotionBanners';
import WhyChooseAwai from './components/WhyChooseAwai';
import AboutAwai from './components/AboutAwai';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';

import VideoModal from './components/VideoModal';
import SpecialOfferModal from './components/SpecialOfferModal';
import ProductDetailModal from './components/ProductDetailModal';
import BlogModal from './components/BlogModal';
import MobileMenuDrawer from './components/MobileMenuDrawer';
import { BEST_SELLING_PRODUCTS } from './data/mockData';
import { SHOP_PRODUCTS, TOP_RATED_PRODUCTS } from './data/shopProducts';

export default function App() {
  // Check initial hash/path, default to 'home' when opening website link
  const [activeNav, setActiveNav] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('contact')) return 'contact';
      if (hash.includes('about')) return 'about';
      if (hash.includes('shop')) return 'shop';
      if (hash.includes('blog')) return 'blog';
      return 'home';
    }
    return 'home';
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSpecialOfferOpen, setIsSpecialOfferOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('contact')) setActiveNav('contact');
      else if (hash.includes('about')) setActiveNav('about');
      else if (hash.includes('shop')) setActiveNav('shop');
      else if (hash.includes('blog')) setActiveNav('blog');
      else setActiveNav('home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation click handler
  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === 'contact') {
      window.location.hash = 'contact-us';
    } else if (id === 'about') {
      window.location.hash = 'about-us';
    } else if (id === 'shop') {
      window.location.hash = 'shop';
    } else if (id === 'home') {
      window.location.hash = 'home';
    } else {
      window.location.hash = id;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveNav('home');
    setTimeout(() => {
      const shopEl = document.getElementById('shop');
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleProductSelectById = (productId) => {
    let product = BEST_SELLING_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      product = SHOP_PRODUCTS.find((p) => p.id === productId);
    }
    if (!product) {
      product = TOP_RATED_PRODUCTS.find((p) => p.id === productId);
    }
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#17212B] flex flex-col font-sans selection:bg-[#E91E32] selection:text-white">
      {/* 1. Slim Utility Bar */}
      <UtilityBar onContactClick={() => handleNavClick('contact')} />

      {/* 2. Main Header with Logo, Select Category & Red Search Button */}
      <MainHeader
        onHomeClick={() => handleNavClick('home')}
        onProductSelect={handleProductSelectById}
        onCategorySelect={handleCategorySelect}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onSpecialOfferClick={() => setIsSpecialOfferOpen(true)}
      />

      {/* 3. Main Navigation Row */}
      <NavigationBar
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onSpecialOfferClick={() => setIsSpecialOfferOpen(true)}
        onCategorySelect={handleCategorySelect}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeNav === 'contact' ? (
          /* Redesigned Contact Us Page */
          <ContactPage />
        ) : activeNav === 'about' ? (
          /* Redesigned About Us Page */
          <AboutPage onPlayVideo={() => setIsVideoModalOpen(true)} />
        ) : activeNav === 'shop' ? (
          /* Redesigned Shop Page */
          <ShopPage
            onProductSelect={handleProductSelectById}
            onHomeClick={() => handleNavClick('home')}
          />
        ) : (
          /* Homepage Sections */
          <>
            <div id="home">
              <HeroBanner onExploreClick={() => handleNavClick('shop')} />
            </div>

            <CategorySection
              selectedCategoryId={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />

            <BestSellingSection
              selectedCategoryId={selectedCategory}
              onProductClick={(product) => setSelectedProduct(product)}
              onViewAllClick={() => handleNavClick('shop')}
            />

            <PromotionBanners
              onBannerClick={(categoryId) => handleCategorySelect(categoryId)}
            />

            <WhyChooseAwai />

            <AboutAwai
              onPlayVideo={() => setIsVideoModalOpen(true)}
              onLearnMore={() => handleNavClick('about')}
            />

            <BlogSection
              onBlogClick={(blog) => setSelectedBlog(blog)}
              onViewAllBlogs={() => {
                const blogEl = document.getElementById('blog');
                if (blogEl) blogEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </>
        )}
      </main>

      {/* 4. Full-width Dark Navy Footer */}
      <Footer
        onCategoryClick={handleCategorySelect}
        onQuickLinkClick={handleNavClick}
      />

      {/* Interactive Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <SpecialOfferModal
        isOpen={isSpecialOfferOpen}
        onClose={() => setIsSpecialOfferOpen(false)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <BlogModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onCategorySelect={handleCategorySelect}
        onSpecialOfferClick={() => setIsSpecialOfferOpen(true)}
      />
    </div>
  );
}
