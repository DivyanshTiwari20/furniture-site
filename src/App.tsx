import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import PromoCards from './components/PromoCards';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import CountryCurrencyModal from './components/CountryCurrencyModal';
import TradeProgram from './components/TradeProgram';
import Footer from './components/Footer';
import { Product, CartItem, CountryConfig, CurrencyConfig, COUNTRIES, CURRENCIES, PRODUCTS_DATA } from './types';
import { Check, Flame, MessageCircle, RefreshCw, Sparkles, X } from 'lucide-react';

export default function App() {
  // Parse country / currency preferences from URL immediately
  const [currentCountry, setCurrentCountry] = useState<CountryConfig>(() => {
    const params = new URLSearchParams(window.location.search);
    const countryCode = params.get('country') || 'IN';
    const matched = COUNTRIES.find(c => c.code.toUpperCase() === countryCode.toUpperCase());
    return matched || COUNTRIES[0]; // fallback to India
  });

  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(() => {
    const params = new URLSearchParams(window.location.search);
    const currencyCode = params.get('currency') || 'INR';
    const matched = CURRENCIES[currencyCode.toUpperCase()];
    return matched || CURRENCIES['INR']; // fallback to INR
  });

  // Main UI drawers states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // E-commerce cart & wishlist data states
  const [cartCollection, setCartCollection] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mohd_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistCollection, setWishlistCollection] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mohd_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  // Interactive Live Toast Feedbacks
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'info' }>({
    show: false,
    msg: '',
    type: 'success'
  });

  // Synchronize localStorage on states changes
  useEffect(() => {
    localStorage.setItem('mohd_cart', JSON.stringify(cartCollection));
  }, [cartCollection]);

  useEffect(() => {
    localStorage.setItem('mohd_wishlist', JSON.stringify(wishlistCollection));
  }, [wishlistCollection]);

  // Display toast feedback briefly
  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // 1. Cart Management callbacks
  const handleAddToCart = (product: Product) => {
    setCartCollection((prev) => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const cloned = [...prev];
        cloned[idx].quantity += 1;
        showToast(`Increased quantity of "${product.name}" inside your shopping bag.`);
        return cloned;
      } else {
        showToast(`"${product.name}" added successfully to your shopping bag.`);
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartCollection((prev) =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartCollection((prev) => {
      const matched = prev.find(item => item.product.id === productId);
      if (matched) {
        showToast(`Removed "${matched.product.name}" from shopping bag.`, 'info');
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const handleClearCart = () => {
    setCartCollection([]);
  };

  // 2. Wishlist Management callbacks
  const handleAddToWishlist = (product: Product) => {
    setWishlistCollection((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from saved folders.`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`"${product.name}" bookmarked into saved design folder.`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlistOnly = (productId: string) => {
    setWishlistCollection((prev) => prev.filter(product => product.id !== productId));
    showToast(`Archived item deleted.`, 'info');
  };

  // 3. Preferences switcher callback
  const handleSavePreferences = (country: CountryConfig, currency: CurrencyConfig) => {
    setCurrentCountry(country);
    setCurrentCurrency(currency);
    showToast(`Pricing updated to match delivery for ${country.name} (${currency.code})`, 'success');
    
    // Update URL parameters dynamically without reloading
    const params = new URLSearchParams(window.location.search);
    params.set('country', country.code.toLowerCase());
    params.set('currency', currency.code.toUpperCase());
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
    window.history.pushState({ path: newurl }, '', newurl);
  };

  const wishlistedIds = new Set<string>(wishlistCollection.map(p => p.id));

  return (
    <div className="min-h-screen bg-white flex flex-col relative select-none" id="mohd-mollura-home">
      
      {/* Dynamic Toast feedback panel */}
      {toast.show && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm bg-[#111111] text-white p-4 shadow-2xl flex items-start gap-3 border border-gray-800 animate-slide-in">
          <div className="mt-0.5">
            {toast.type === 'success' ? (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
            ) : (
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">i</span>
            )}
          </div>
          <div className="flex-1">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-gray-400">System Notification</p>
            <p className="font-sans text-xs text-gray-200 mt-1">{toast.msg}</p>
          </div>
          <button onClick={() => setToast(prev => ({ ...prev, show: false }))} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary header bar */}
      <Navbar
        currentCountry={currentCountry}
        currentCurrency={currentCurrency}
        onOpenCountryModal={() => setIsCountryModalOpen(true)}
        cartCount={cartCollection.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistCollection.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryClick={setActiveCategory}
        selectedBrand={selectedBrand}
        onBrandSelect={setSelectedBrand}
      />

      {/* Secondary promotional quick links */}
      <div className="bg-[#faf9f6] py-1 px-4 text-center border-b border-gray-100 text-[10.5px] font-mono tracking-wider text-gray-500 overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 sm:gap-10">
          <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> 100% Original Brand Assure</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-600 animate-pulse" /> Milan Salone del Mobile 2026 Launches</span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 text-indigo-500" /> Easy Return Corridors</span>
        </div>
      </div>

      {/* Main body modules layout */}
      <main className="flex-1" id="main-content-scroll">
        
        {/* Hero slideshow */}
        <HeroSlider />

        {/* Brand Focus promo groups */}
        <PromoCards
          onSearchChange={setSearchQuery}
          onCategoryClick={setActiveCategory}
        />

        {/* Dynamic products catalog with filter list */}
        <ProductGrid
          products={PRODUCTS_DATA}
          activeCategory={activeCategory}
          selectedBrand={selectedBrand}
          searchQuery={searchQuery}
          currency={currentCurrency}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          wishlistedIds={wishlistedIds}
          onQuickView={setQuickViewProduct}
        />

        {/* Luxury Design Consultation & trade enrollment banner */}
        <TradeProgram />
        
      </main>

      {/* Footer system */}
      <Footer />

      {/* Left sidebar interactive floating helper button to trigger country switcher */}
      <button
        onClick={() => setIsCountryModalOpen(true)}
        className="fixed bottom-6 right-6 z-45 bg-[#111] text-white hover:bg-[#222] p-4.5 rounded-full shadow-2xl flex items-center justify-center border border-gray-800 transition-all group focus:outline-none"
        title="Change Country Preferences"
        id="floating-pref-btn"
      >
        <span className="text-xl leading-none">{currentCountry.flag}</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-mono text-[10px] tracking-widest uppercase ml-0 group-hover:ml-2.5 whitespace-nowrap">
          {currentCountry.code} ({currentCurrency.code})
        </span>
      </button>

      {/* Sub drawers & configurations */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartCollection}
        currency={currentCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistCollection}
        currency={currentCurrency}
        onRemoveItem={handleRemoveFromWishlistOnly}
        onAddToCart={handleAddToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
        currency={currentCurrency}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        isWishlisted={quickViewProduct ? wishlistedIds.has(quickViewProduct.id) : false}
      />

      <CountryCurrencyModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        currentCountry={currentCountry}
        currentCurrency={currentCurrency}
        onSave={handleSavePreferences}
      />

    </div>
  );
}
