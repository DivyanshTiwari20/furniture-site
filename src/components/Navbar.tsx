import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X, Phone, ShieldCheck } from 'lucide-react';
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

interface SubcategoryColumn {
  title: string;
  items: string[];
}

interface FeaturedItem {
  title: string;
  image: string;
}

interface MegamenuCategory {
  columns: SubcategoryColumn[];
  brands: string[];
  featured: FeaturedItem[];
}

// Highly stylized designer brand text logo component matching premium labels
function BrandLogoRenderer({ name }: { name: string }) {
  const normalized = name.toLowerCase().trim();
  
  if (normalized === 'antoniolupi') {
    return (
      <span className="font-sans font-black text-[12px] lowercase tracking-tighter text-black select-none">
        antoniolupi
      </span>
    );
  }
  if (normalized === 'falper.') {
    return (
      <span className="font-serif font-extrabold text-[14px] tracking-tight text-black select-none">
        falper<span className="text-red-600 font-sans font-black">.</span>
      </span>
    );
  }
  if (normalized === 'agape') {
    return (
      <span className="font-mono font-bold text-[11px] tracking-[0.18em] text-black select-none uppercase">
        agape
      </span>
    );
  }
  if (normalized === 'boffi') {
    return (
      <span className="font-serif font-black text-[15px] text-[#000000] tracking-wide select-none">
        Boffi
      </span>
    );
  }
  if (normalized === 'jacuzzi') {
    return (
      <span className="font-serif italic font-bold text-[13px] tracking-tight text-gray-900 select-none">
        Jacuzzi
      </span>
    );
  }
  if (normalized === 'cielo') {
    return (
      <span className="font-sans font-medium text-[13px] tracking-[0.2em] text-[#111111] select-none uppercase">
        cielo
      </span>
    );
  }
  if (normalized === 'rexa') {
    return (
      <span className="font-mono font-bold tracking-[0.3em] text-[10px] text-black select-none uppercase">
        REXA
      </span>
    );
  }
  if (normalized === 'inbani') {
    return (
      <span className="font-sans font-light tracking-[0.05em] text-[11px] text-gray-900 select-none flex items-center justify-start gap-1">
        <span className="text-black font-extrabold text-[11px] leading-none">▪</span>inbani
      </span>
    );
  }

  // Curated Fallbacks styling for other top design houses
  if (normalized === 'cassina') {
    return <span className="font-serif font-bold text-[13px] tracking-wider uppercase text-black">Cassina</span>;
  }
  if (normalized === 'b&b italia') {
    return <span className="font-sans font-black text-[12px] tracking-widest text-[#000] uppercase">B&B Italia</span>;
  }
  if (normalized === 'flos') {
    return <span className="font-mono text-[12px] font-black uppercase text-gray-800">FLOS</span>;
  }
  if (normalized === 'louis poulsen') {
    return <span className="font-serif italic text-[11px] font-medium text-black">louis poulsen</span>;
  }
  if (normalized === 'vitra') {
    return <span className="font-sans font-bold text-[13px] tracking-wide text-black lowercase">vitra.</span>;
  }
  if (normalized === 'artemide') {
    return <span className="font-serif font-bold text-[14px] text-red-600 tracking-tight lowercase">Artemide</span>;
  }

  return (
    <span className="font-sans font-bold text-[11px] tracking-widest text-[#222] uppercase select-none hover:opacity-70 transition-opacity">
      {name}
    </span>
  );
}

// Megamenu visual dataset containing realistic classifications, brands, and featured items matching the designer look
const MEGAMENU_DATA: Record<string, MegamenuCategory> = {
  Furniture: {
    columns: [
      {
        title: 'Living Room furniture',
        items: ['Sofas', 'Armchairs', 'Coffee Tables', 'Bookcases', 'TV Units', 'Sideboards']
      },
      {
        title: 'Dining Room',
        items: ['Dining Tables', 'Chairs', 'Stools', 'Benches', 'Cabinets']
      },
      {
        title: 'Bedroom',
        items: ['Luxurious Beds', 'Wardrobes', 'Bedside Tables', 'Dressers']
      }
    ],
    brands: ['Cassina', 'B&B Italia', 'Vitra', 'Knoll', 'Poltrona Frau', 'cielo', 'Boffi', 'antoniolupi'],
    featured: [
      {
        title: 'Iconic Designer Sofas',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Minimalist Dining Collections',
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Lighting: {
    columns: [
      {
        title: 'Indoor Lighting',
        items: ['Suspension Lamps', 'Table Lamps', 'Floor Lamps', 'Wall Lamps', 'Ceiling Lamps']
      },
      {
        title: 'Outdoor & Garden',
        items: ['Garden Lights', 'Floor Lights', 'Wall Appliques', 'Portable LED Lanterns']
      },
      {
        title: 'Architectural System',
        items: ['Recessed Spotlights', 'Track Light Systems', 'Linear LED Profiles']
      }
    ],
    brands: ['Flos', 'Artemide', 'Louis Poulsen', 'cielo', 'agape', 'Boffi', 'inbani', 'REXA'],
    featured: [
      {
        title: 'Sculptural Suspensions',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Portable Radiant Orbs',
        image: 'https://images.unsplash.com/photo-1543242595-c26124596399?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Kitchen: {
    columns: [
      {
        title: 'Kitchen furniture',
        items: ['Cabinets', 'Kitchen Islands', 'Larders', 'Worktops', 'Drawer Liners']
      },
      {
        title: 'Fittings & Mixers',
        items: ['Sinks', 'Satin Steel Mixers', 'Water Purifiers']
      },
      {
        title: 'Smart Appliances',
        items: ['Ovens', 'Refrigerators', 'Inductions', 'Exhaust Hoods']
      }
    ],
    brands: ['Boffi', 'antoniolupi', 'falper.', 'agape', 'cielo', 'REXA', 'inbani', 'Jacuzzi'],
    featured: [
      {
        title: 'Monolithic Islands Marble',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'State of Art Kitchens',
        image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Bathroom: {
    columns: [
      {
        title: 'Bathroom furniture',
        items: ['Cabinets', 'Wash basins', 'Bathtubs', 'Spa & wellness', 'Showers', 'Sanitary ware', 'Faucets']
      },
      {
        title: 'Furnishings and accessories',
        items: ['Mirrors', 'Accessories', 'Textiles', 'Rugs', 'Laundry']
      },
      {
        title: 'Radiators',
        items: [] // rendered as single header block only, matching screenshot
      },
      {
        title: 'Wall & floor covering',
        items: [] // rendered as single header block only, matching screenshot
      },
      {
        title: 'Gift Card',
        items: [] // rendered as single header block only, matching screenshot
      }
    ],
    brands: ['antoniolupi', 'falper.', 'agape', 'Boffi', 'Jacuzzi', 'cielo', 'REXA', 'inbani'],
    featured: [
      {
        title: 'Freestanding Washbasins',
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Marble Bathrooms',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Office: {
    columns: [
      {
        title: 'Office settings',
        items: ['Desks', 'Task Chairs', 'Modular Storage', 'Archive Units']
      },
      {
        title: 'Desk accessories',
        items: ['Storage Caddies', 'Letter Shelves', 'Premium Desk Mats', 'Baskets']
      },
      {
        title: 'Acoustic Screens',
        items: []
      }
    ],
    brands: ['Vitra', 'Knoll', 'cielo', 'antoniolupi', 'falper.', 'REXA', 'Boffi', 'agape'],
    featured: [
      {
        title: 'The Ergonomic Workspace',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'USM Modular Credenzas',
        image: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Accessories: {
    columns: [
      {
        title: 'Home Decor',
        items: ['Vases', 'Sculptures', 'Wall Mirrors', 'Clocks', 'Candles & Scents']
      },
      {
        title: 'Textiles',
        items: ['Cushions', 'Throws & Blankets', 'Carpets & Rugs']
      },
      {
        title: 'Organization',
        items: ['Boxes & Caddies', 'Coat Hangers', 'Magazine Racks']
      }
    ],
    brands: ['Vitra', 'cielo', 'agape', 'falper.', 'antoniolupi', 'Boffi', 'inbani', 'Jacuzzi'],
    featured: [
      {
        title: 'Polished Table Accents',
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Signature Home Ceramics',
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Outdoor: {
    columns: [
      {
        title: 'Sundeck & Lounge',
        items: ['Outdoor Sofas', 'Sunbeds', 'Lounge Chairs', 'Hammock Nets']
      },
      {
        title: 'Garden Dining',
        items: ['Weatherproof Tables', 'Outdoor Armchairs', 'Outdoor Stools']
      },
      {
        title: 'Outdoor Lights',
        items: ['Floor Lanterns', 'Teak Parasols', 'Firepits']
      }
    ],
    brands: ['B&B Italia', 'Cassina', 'antoniolupi', 'cielo', 'REXA', 'Boffi', 'Jacuzzi', 'agape'],
    featured: [
      {
        title: 'Sunlit Veranda Oasis',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'All-Weather Premium comfort',
        image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  Brand: {
    columns: [
      {
        title: 'Italian Furniture Icons',
        items: ['Cassina', 'B&B Italia', 'Poltrona Frau', 'Knoll']
      },
      {
        title: 'Lighting Powerhouses',
        items: ['Flos', 'Artemide', 'Louis Poulsen']
      },
      {
        title: 'Sanitary Masterpieces',
        items: ['antoniolupi', 'falper.', 'agape', 'cielo']
      }
    ],
    brands: ['Cassina', 'B&B Italia', 'Vitra', 'Flos', 'Artemide', 'Knoll', 'Poltrona Frau', 'Louis Poulsen'],
    featured: [
      {
        title: 'Cassina Showroom Milano',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Vitra Design Campus',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  'In Stock': {
    columns: [
      {
        title: 'Ready Furniture',
        items: ['Soriana Sofa Group', 'Camaleonda Tufted', 'Eames Lounge Chair']
      },
      {
        title: 'Ready Lighting',
        items: ['IC Lights T1', 'PH 5 Pendant Lamp', 'Flowerpot VP9 Portable']
      },
      {
        title: 'Immediate Decor',
        items: ['Toolbox Storage Caddy', 'HK Cobra Pitcher', 'Freestanding Washbasin']
      }
    ],
    brands: ['Flos', 'Cassina', 'Vitra', 'Louis Poulsen', 'Artemide', 'Knoll', 'B&B Italia', 'cielo'],
    featured: [
      {
        title: 'Fast Dispatch Courier',
        image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'Signature Gift Selections',
        image: 'https://images.unsplash.com/photo-1513201099495-a6697de52639?auto=format&fit=crop&q=80&w=400'
      }
    ]
  }
};

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
  
  // Mobile accordion tracks which category sub-menu is expanded in the sidebar drawer
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  
  // Desktop hovered category for the interactive hover-activated megamenu dropdown list
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Exact categories matching the user request & screenshot layout
  const categories = ['Furniture', 'Lighting', 'Kitchen', 'Bathroom', 'Office', 'Accessories', 'Outdoor', 'Brand', 'In Stock'];
  const popularBrands = ['All Brands', 'Cassina', 'B&B Italia', 'Flos', 'Louis Poulsen', 'Vitra', 'Artemide', 'Poltrona Frau', 'Knoll', 'Georg Jensen'];

  const handleCategorySelect = (cat: string) => {
    onCategoryClick(cat);
    onSearchChange(''); // Reset search when clicking direct categories
    setMobileMenuOpen(false);
  };

  const handleSubcategorySelect = (category: string, sub: string) => {
    onCategoryClick(category);
    onSearchChange(sub); // populate search input to narrow grid immediately
    setHoveredCategory(null);
    setMobileMenuOpen(false);
  };

  const handleBrandSelect = (brand: string) => {
    onBrandSelect(brand === 'All Brands' ? '' : brand);
    setMobileMenuOpen(false);
  };

  const handleBrandClick = (brandName: string) => {
    // Also trigger category reset or set brand
    onBrandSelect(brandName);
    onCategoryClick(''); // reset category to view all of this brand
    setHoveredCategory(null);
    setMobileMenuOpen(false);
    // Scroll cleanly to catalog
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm" id="mohd-header-nav">
      {/* 1. TOP ANNOUNCEMENT / PROMO BAR */}
      <div className="w-full bg-[#111111] text-white text-[11px] font-mono uppercase tracking-widest py-2.5 px-4 sm:px-8 border-b border-[#222222] transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Slider Promo banner */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>Salone del Mobile 2026: Use code <strong className="text-white underline">MOHD10</strong> for an extra 10% Off</span>
          </div>

          <div className="flex items-center gap-6 text-[10px] sm:text-[11px] justify-center">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-300" />
              100% Original Certified Design
            </span>

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
      <div className="w-full py-4 sm:py-5 px-4 sm:px-8 max-w-7xl mx-auto" id="main-header-row">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left section: Mobile menu and brand picker info */}
          <div className="flex items-center gap-4 lg:w-1/4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Professional trade program links */}
            <div className="hidden lg:block">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Professional Service</p>
              <a href="#trade" className="text-[12px] font-medium text-gray-800 hover:underline">Trade Program</a>
            </div>
          </div>

          {/* Middle section: Brand Logo */}
          <div className="flex flex-col items-center justify-center text-center lg:w-2/4">
            <a href="/" className="inline-block transition-transform hover:scale-[1.01]" onClick={(e) => {
              e.preventDefault();
              onCategoryClick('');
              onSearchChange('');
              onBrandSelect('');
            }}>
              <span className="font-serif text-2xl sm:text-4xl font-light tracking-[0.35em] text-[#000000] block select-none">
                MOHD
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] text-gray-400 uppercase block -mt-1 pl-1">
                mollura home design
              </span>
            </a>
          </div>

          {/* Right section: Icons (Login, Wishlist, Cart) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3 lg:w-1/4">
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
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-mono leading-none w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar below logo */}
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

      {/* 3. DESKTOP SYSTEM CATEGORIES WRAPPED WITH HOVER DETECTOR FOR DYNAMIC MEGAMENU */}
      <nav 
        className="hidden lg:block border-t border-gray-100 bg-[#ffffff] relative"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Categories Tab Row */}
          <div className="flex space-x-7">
            {categories.map((cat) => {
              const hoverActive = hoveredCategory === cat;
              const filterActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onClick={() => handleCategorySelect(cat)}
                  className={`py-4 text-[12px] font-sans font-medium tracking-wide transition-all relative outline-none focus:outline-none ${
                    filterActive
                      ? 'text-red-500 font-bold before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-red-500'
                      : hoverActive
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick brand picker */}
          <div className="flex items-center gap-1 font-mono text-[11px] py-3 text-gray-400">
            <span>Designer filters:</span>
            <select
              value={selectedBrand || 'All Brands'}
              onChange={(e) => handleBrandSelect(e.target.value)}
              className="border-none bg-transparent font-medium py-1 px-1 text-gray-800 pr-5 capitalize cursor-pointer focus:outline-none hover:text-black"
            >
              {popularBrands.map((b) => (
                <option key={b} value={b} className="bg-white text-gray-900 font-sans text-xs">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3B) HOVER DYNAMIC DESKTOP MEGAMENU OVERLAY POPUP */}
        {hoveredCategory && MEGAMENU_DATA[hoveredCategory] && (
          <div 
            className="absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-2xl z-50 text-left pt-8 pb-10 px-8 select-none transition-all duration-300 animate-slide-down"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
              {/* Left Column: Subcategories and Columns (8 of 12 columns) */}
              <div className="col-span-8 grid grid-cols-3 gap-6 pr-6">
                {MEGAMENU_DATA[hoveredCategory].columns.map((col, idx) => {
                  const hasItems = col.items && col.items.length > 0;
                  return (
                    <div key={idx} className="flex flex-col">
                      <h5 className="font-sans font-bold text-[13.5px] uppercase tracking-wide text-black mb-3">
                        {col.title}
                      </h5>
                      
                      {hasItems ? (
                        <ul className="space-y-2">
                          {col.items.map((subItem) => (
                            <li key={subItem}>
                              <button
                                onClick={() => handleSubcategorySelect(hoveredCategory, subItem)}
                                className="text-[12px] text-gray-500 hover:text-black hover:underline text-left block transition-colors py-0.5"
                              >
                                {subItem}
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic">Curated Luxury Experience</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Top Brands logo grid + 2 side-by-side Featured design cards (4 of 12 columns) */}
              <div className="col-span-4 border-l border-gray-100 pl-8 flex flex-col justify-between">
                
                {/* Brand Logos section */}
                <div className="mb-6">
                  <h5 className="font-sans font-bold text-[12.5px] uppercase tracking-wide text-gray-400 mb-4">
                    Top Brands
                  </h5>
                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 items-center">
                    {MEGAMENU_DATA[hoveredCategory].brands.map((bName) => (
                      <button
                        key={bName}
                        onClick={() => handleBrandClick(bName)}
                        className="flex items-center justify-start text-left hover:scale-[1.04] transition-transform opacity-95 hover:opacity-100 active:scale-95"
                        title={`View brand ${bName}`}
                      >
                        <BrandLogoRenderer name={bName} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured cards side by side section */}
                <div>
                  <h5 className="font-sans font-bold text-[12.5px] uppercase tracking-wide text-gray-400 mb-3.5">
                    Featured Design
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    {MEGAMENU_DATA[hoveredCategory].featured.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        onClick={() => handleSubcategorySelect(hoveredCategory, feat.title === 'Living Room Icons' ? 'Sofa' : feat.title === 'Sculptural Suspensions' ? 'Lamp' : 'Design')}
                        className="group/feat flex flex-col cursor-pointer"
                      >
                        <div className="aspect-[4/3] rounded-sm overflow-hidden bg-gray-50 border border-gray-100 mb-1.5 relative">
                          <img
                            src={feat.image}
                            alt={feat.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/feat:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/feat:bg-black/5 transition-colors duration-300"></div>
                        </div>
                        <p className="font-sans text-[11px] font-semibold text-gray-900 tracking-tight leading-tight group-hover/feat:text-red-600 transition-colors">
                          {feat.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION MENU (Fully responsive with Nested accordions) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/45 transition-opacity duration-350"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Drawer container */}
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-2xl z-10 py-5 px-6 animate-slide-in overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-serif tracking-widest text-[#111] text-lg font-light">MOHD SHOP</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 -mr-1 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu options list with full responsive touch targets */}
            <div className="mt-6 flex-1 flex flex-col gap-6">
              <div>
                <p className="text-[9px] font-mono uppercase text-gray-400 tracking-widest mb-3">Shop Categories</p>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    const isExpanded = activeAccordion === cat;
                    const nested = MEGAMENU_DATA[cat];
                    
                    return (
                      <div key={cat} className="flex flex-col border-b border-gray-50 last:border-b-0 py-1.5">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleCategorySelect(cat)}
                            className={`text-left text-sm font-sans font-semibold transition-colors py-1.5 flex-1 ${
                              isSelected ? 'text-red-600 underline' : 'text-gray-800 hover:text-black'
                            }`}
                          >
                            {cat}
                          </button>
                          
                          {/* Expansion toggler for subcategory list in mobile */}
                          {nested && (
                            <button
                              onClick={() => setActiveAccordion(isExpanded ? null : cat)}
                              className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded"
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-black' : ''}`} />
                            </button>
                          )}
                        </div>

                        {/* Nested Subcategories List Accordion */}
                        {isExpanded && nested && (
                          <div className="mt-1 pl-3 bg-gray-50/50 rounded-sm p-2 flex flex-col gap-3 pb-3 border-l-2 border-red-200">
                            {nested.columns.map((col, colIdx) => (
                              <div key={colIdx} className="flex flex-col gap-1">
                                <span className="font-sans font-bold text-[10px] text-gray-400 uppercase tracking-wider">
                                  {col.title}
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {col.items.map((subIt) => (
                                    <button
                                      key={subIt}
                                      onClick={() => handleSubcategorySelect(cat, subIt)}
                                      className="font-sans text-[11px] text-gray-600 hover:text-red-600 bg-white border border-gray-200 px-2 py-0.5 rounded-sm active:bg-gray-100 transition-colors"
                                    >
                                      {subIt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                            
                            {/* Nested Brands */}
                            {nested.brands.length > 0 && (
                              <div className="mt-1">
                                <span className="font-sans font-bold text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                                  Category Brands
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {nested.brands.map((bName) => (
                                    <button
                                      key={bName}
                                      onClick={() => handleBrandClick(bName)}
                                      className="font-mono text-[10px] bg-black text-white px-2 py-0.5 rounded-sm hover:-translate-y-0.5 transition-transform"
                                    >
                                      {bName}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-mono uppercase text-gray-400 tracking-widest mb-2.5">Designer Brands</p>
                <div className="flex flex-col gap-2">
                  {popularBrands.map((brandName) => (
                    <button
                      key={brandName}
                      onClick={() => handleBrandSelect(brandName)}
                      className={`text-left py-1 text-xs font-sans transition-colors ${
                        brandName === selectedBrand || (brandName === 'All Brands' && !selectedBrand)
                          ? 'text-red-600 font-bold'
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
                  className="flex items-center gap-2 text-xs font-medium text-gray-800 hover:underline"
                >
                  Architect & Design Trade Program
                </a>
              </div>
            </div>

            <div className="mt-auto border-t border-gray-100 pt-5 text-center">
              <p className="text-[9px] font-mono text-gray-400 tracking-widest">CURRENCY / COUNTRY</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCountryModal();
                }}
                className="mt-2 w-full text-xs font-semibold py-2.5 border border-black text-black text-center hover:bg-black hover:text-white transition-all uppercase tracking-wider rounded-none"
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
