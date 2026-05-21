import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product, CurrencyConfig } from '../types';

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  selectedBrand: string;
  searchQuery: string;
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistedIds: Set<string>;
  onQuickView: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export default function ProductGrid({
  products,
  activeCategory,
  selectedBrand,
  searchQuery,
  currency,
  onAddToCart,
  onAddToWishlist,
  wishlistedIds,
  onQuickView
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filterReadyToShip, setFilterReadyToShip] = useState(false);
  const [filterBestSeller, setFilterBestSeller] = useState(false);

  // Filter products based on search, category, brand, and sub-flags
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesigner = product.designer.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesDesigner && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (activeCategory && product.category !== activeCategory) {
        return false;
      }

      // 3. Brand Filter
      if (selectedBrand && product.brand !== selectedBrand) {
        return false;
      }

      // 4. Availability checkboxes
      if (filterReadyToShip && !product.isReadyToShip) {
        return false;
      }

      // 5. Bestseller checkbox
      if (filterBestSeller && !product.isBestSeller) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, activeCategory, selectedBrand, filterReadyToShip, filterBestSeller]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => {
        const priceA = a.basePriceEUR * (1 - (a.discountPercent || 0) / 100);
        const priceB = b.basePriceEUR * (1 - (b.discountPercent || 0) / 100);
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => {
        const priceA = a.basePriceEUR * (1 - (a.discountPercent || 0) / 100);
        const priceB = b.basePriceEUR * (1 - (b.discountPercent || 0) / 100);
        return priceB - priceA;
      });
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    // "featured" retains database ordering (isBestSeller / original sequence)
    return list;
  }, [filteredProducts, sortBy]);

  return (
    <section className="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-gray-100" id="catalog">
      {/* Visual Header / stats with category label */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-gray-100">
        <div>
          <span className="font-mono text-[9px] text-gray-400 tracking-[0.35em] uppercase">MOHD ARCHIVE CATALOG</span>
          <h4 className="font-serif text-2xl sm:text-3xl font-light tracking-tight mt-0.5">
            {activeCategory || 'Complete Design Collection'}
            {selectedBrand && <span className="text-gray-400 font-sans text-xl font-normal lowercase"> by {selectedBrand}</span>}
          </h4>
          <p className="font-mono text-[10.5px] text-gray-500 mt-1">
            Displaying {sortedProducts.length} premium designer products found
          </p>
        </div>

        {/* Quick Toolbar with sorting & filtering options */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Ready to ship checkbox */}
          <label className="flex items-center gap-2 text-[11px] font-mono text-gray-600 hover:text-black cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterReadyToShip}
              onChange={(e) => setFilterReadyToShip(e.target.checked)}
              className="accent-black h-3.5 w-3.5 border-gray-300 focus:ring-black cursor-pointer"
            />
            <span>In-Stock Express</span>
          </label>

          {/* Best Seller checkbox */}
          <label className="flex items-center gap-2 text-[11px] font-mono text-gray-600 hover:text-black cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterBestSeller}
              onChange={(e) => setFilterBestSeller(e.target.checked)}
              className="accent-black h-3.5 w-3.5 border-gray-300 focus:ring-black cursor-pointer"
            />
            <span>Bestsellers</span>
          </label>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-gray-700 border border-gray-200 py-1.5 px-3 bg-[#fafafa]">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border-none bg-transparent outline-none focus:outline-none cursor-pointer pr-1"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Rating & Popularity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main product card grid list */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8" id="product-grid-container">
          {sortedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              currency={currency}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              isWishlisted={wishlistedIds.has(prod.id)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-200">
          <Sparkles className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="font-serif text-lg text-gray-800">No matching design items found</p>
          <p className="font-sans text-xs text-gray-400 max-w-sm mx-auto mt-2.5">
            We couldn't find items matching your search criteria. Try removing filters or changing the search query.
          </p>
          <button
            onClick={() => {
              setFilterBestSeller(false);
              setFilterReadyToShip(false);
              setSortBy('featured');
            }}
            className="mt-6 font-mono text-[10px] tracking-widest uppercase border border-black px-6 py-2.5 hover:bg-black hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
