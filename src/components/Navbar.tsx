import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronDown, Globe, Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { CountryConfig, CurrencyConfig } from '../types';

interface NavbarProps {
  currentCountry: CountryConfig;
  currentCurrency: CurrencyConfig;
  onOpenCountryModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

export default function Navbar({
  currentCountry,
  currentCurrency,
  onOpenCountryModal,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryClick,
  selectedBrand,
  onBrandSelect
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const categories = ['All', 'Furniture', 'Lighting', 'Accessories', 'Art de la table'];
  const popularBrands = ['All Brands', 'Cassina', 'B&B Italia', 'Flos', 'Louis Poulsen', 'Vitra', 'Artemide', 'Poltrona Frau', 'Knoll', 'Georg Jensen'];

  const handleCategorySelect = (cat: string) => {
    onCategoryClick(cat);
    setMobileMenuOpen(false);
  };

  const handleBrandSelect = (brand: string) => {
    onBrandSelect(brand === 'All Brands' ? '' : brand);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40" id="mohd-header-nav">
      {/* 1. TOP ANNOUNCEMENT / PROMO BAR */}
      <div className="w-full bg-[#111111] text-white text-[11px] font-mono uppercase tracking-widest py-2.5 px-4 sm:px-8 border-b border-[#222222] transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Slider Promo banner */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Salone del Mobile 2026: Use code <strong className="text-white underline">MOHD10</strong> for an extra 10% Off</span>
          </div>

          <div className="flex items-center gap-6 text-[10px] sm:text-[11px] justify-center">
            {/* Delivery banner info */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-300" />
              100% Original Certified Design
            </span>

            {/* Support and Phone */}
            <span className="text-gray-400 flex items-center gap-1">
              <Phone className="w-3" />
              +39 090 6258945
            </span>

            {/* Country / Currency switcher trigger */}
            <button
              onClick={onOpenCountryModal}
              className="flex items-center gap-1.5 hover:text-gray-300 border-l border-gray-800 pl-4 py-0.5 focus:outline-none transition-colors"
              id="currency-selector"
            >
              <span className="text-sm">{currentCountry.flag}</span>
              <span className="font-semibold">{currentCountry.code}</span>
              <span className="text-gray-400 font-normal">({currentCurrency.symbol} {currentCurrency.code})</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="w-full py-5 px-4 sm:px-8 max-w-7xl mx-auto" id="main-header-row">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left section: Mobile menu and brand picker info */}
          <div className="flex items-center gap-4 lg:w-1/4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-800 hover:bg-gray-50 rounded"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Custom high-end text for architect program */}
            <div className="hidden lg:block">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Professional Service</p>
              <a href="#trade" className="text-[12px] font-medium text-gray-800 hover:underline">Trade Program</a>
            </div>
          </div>

          {/* Middle section: Brand Logo */}
          <div className="flex flex-col items-center justify-center text-center lg:w-2/4">
            <a href="/" className="inline-block transition-transform hover:scale-[1.01]">
              <span className="font-serif text-3xl sm:text-4xl font-light tracking-[0.35em] text-[#000000] block select-none">
                MOHD
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] text-gray-400 uppercase block -mt-1 pl-1">
                mollura home design
              </span>
            </a>
          </div>

          {/* Right section: Icons (Login, Wishlist, Cart) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3 lg:w-1/4">
            {/* Search toggler for small screens is the input itself which lives on navigation bar */}

            <button
              onClick={() => {}}
              className="p-2 text-gray-800 hover:bg-gray-50 rounded-full transition-colors relative group hidden sm:inline-flex"
              title="My Account"
            >
              <User className="w-5 h-5" />
              <span className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
                Log In
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-gray-800 hover:bg-gray-50 rounded-full transition-colors relative group"
              title="Wishlist"
              id="wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-mono leading-none w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={onOpenCart}
              className="p-2 text-gray-800 hover:bg-gray-50 rounded-full transition-colors relative group"
              title="Shopping Bag"
              id="cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-mono leading-none w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar below logo / inside header */}
        <div className="mt-4 max-w-lg mx-auto relative group">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-gray-400 group-hover:text-black transition-colors" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search icon designer, category like lighting, brand..."
            className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm font-sans border border-gray-200 rounded-none bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black py-1.5 px-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. DESKTOP SYSTEM REGULAR CATEGORIES */}
      <nav className="hidden lg:block border-t border-gray-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Main categories */}
          <div className="flex space-x-8">
            {categories.map((cat) => {
              const isActive = (cat === 'All' && activeCategory === '') || (cat === activeCategory);
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryClick(cat === 'All' ? '' : cat)}
                  className={`py-3.5 text-[11px] font-mono uppercase tracking-widest transition-all relative outline-none focus:outline-none ${
                    isActive
                      ? 'text-black font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                      : 'text-gray-500 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-none'
                  }`}
                >
                  {cat === 'All' ? 'Inspiration Catalog' : cat}
                </button>
              );
            })}
          </div>

          {/* Quick brand filtration shortcut */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <span className="text-gray-400">Brand Filter:</span>
            <select
              value={selectedBrand || 'All Brands'}
              onChange={(e) => handleBrandSelect(e.target.value)}
              className="border-none bg-transparent font-medium py-1 px-2 text-gray-800 pr-6 capitalize cursor-pointer focus:outline-none hover:text-black"
            >
              {popularBrands.map((b) => (
                <option key={b} value={b} className="bg-white text-gray-900 font-sans">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer container */}
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-2xl z-10 py-5 px-6 animate-slide-in overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-serif tracking-widest text-[#111] text-lg font-light">MOHD SHOP</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 -mr-1 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu options list */}
            <div className="mt-6 flex-1 flex flex-col gap-6">
              <div>
                <p className="text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-2">Shop Categories</p>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`text-left py-1 text-sm font-sans font-medium transition-colors ${
                        (cat === 'All' && activeCategory === '') || (cat === activeCategory)
                          ? 'text-emerald-700 underline font-semibold'
                          : 'text-gray-800 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-mono uppercase text-gray-400 tracking-wider mb-2">Designer Brands</p>
                <div className="flex flex-col gap-2.5">
                  {popularBrands.map((brandName) => (
                    <button
                      key={brandName}
                      onClick={() => handleBrandSelect(brandName)}
                      className={`text-left py-0.5 text-xs font-sans transition-colors ${
                        brandName === selectedBrand || (brandName === 'All Brands' && !selectedBrand)
                          ? 'text-black font-semibold'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {brandName}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <a
                  href="#trade"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:underline"
                >
                  Architect & Design Trade Program
                </a>
              </div>
            </div>

            <div className="mt-auto border-t border-gray-100 pt-5 text-center">
              <p className="text-[10px] font-mono text-gray-400">CURRENCY / COUNTRY</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCountryModal();
                }}
                className="mt-2 w-full text-xs font-semibold py-2.5 border border-black text-black text-center hover:bg-black hover:text-white transition-all uppercase tracking-wider"
              >
                {currentCountry.flag} {currentCountry.name} ({currentCurrency.symbol} {currentCurrency.code})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
