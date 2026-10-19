import React, { useState } from 'react';
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

import VideoModal from './components/VideoModal';
import SpecialOfferModal from './components/SpecialOfferModal';
import ProductDetailModal from './components/ProductDetailModal';
import BlogModal from './components/BlogModal';
import { BEST_SELLING_PRODUCTS } from './data/mockData';

export default function App() {
  // Default to 'about' page to display the redesigned About Us page
  const [activeNav, setActiveNav] = useState('about');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSpecialOfferOpen, setIsSpecialOfferOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Navigation click handler
  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === 'home' || id === 'shop' || id === 'blog' || id === 'contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    const product = BEST_SELLING_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#17212B] flex flex-col font-sans selection:bg-[#E91E32] selection:text-white">
      {/* 1. Slim Utility Bar */}
      <UtilityBar onContactClick={() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 2. Main Header with Logo, Select Category & Red Search Button */}
      <MainHeader
        onProductSelect={handleProductSelectById}
        onCategorySelect={handleCategorySelect}
      />

      {/* 3. Main Navigation Row with About Us highlighted */}
      <NavigationBar
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onSpecialOfferClick={() => setIsSpecialOfferOpen(true)}
        onCategorySelect={handleCategorySelect}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeNav === 'about' ? (
          /* Redesigned About Us Page */
          <AboutPage onPlayVideo={() => setIsVideoModalOpen(true)} />
        ) : (
          /* Homepage Sections */
          <>
            <div id="home">
              <HeroBanner onExploreClick={() => {
                const shopEl = document.getElementById('shop');
                if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
              }} />
            </div>

            <CategorySection
              selectedCategoryId={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />

            <BestSellingSection
              selectedCategoryId={selectedCategory}
              onProductClick={(product) => setSelectedProduct(product)}
              onViewAllClick={() => setSelectedCategory('all')}
            />

            <PromotionBanners
              onBannerClick={(categoryId) => handleCategorySelect(categoryId)}
            />

            <WhyChooseAwai />

            <AboutAwai
              onPlayVideo={() => setIsVideoModalOpen(true)}
              onLearnMore={() => setActiveNav('about')}
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
    </div>
  );
}
