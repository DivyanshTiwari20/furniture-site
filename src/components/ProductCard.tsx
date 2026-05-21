import React from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  currency,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onQuickView
}: ProductCardProps) {
  // Convert standard base price (EUR) to active currency
  const convertedPrice = product.basePriceEUR * currency.rateToEUR;
  
  // Calculate sale prices if discount exists
  const hasDiscount = product.discountPercent ? product.discountPercent > 0 : false;
  const originalPrice = convertedPrice;
  const finalPrice = hasDiscount
    ? convertedPrice * (1 - (product.discountPercent || 0) / 100)
    : convertedPrice;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div
      className="group flex flex-col bg-white border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 relative"
      id={`product-card-${product.id}`}
    >
      {/* Visual Badges container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-black text-white font-mono text-[8px] tracking-widest uppercase px-2 py-0.5">
            Best Seller
          </span>
        )}
        {product.isReadyToShip && (
          <span className="bg-[#f0f9f4] text-emerald-800 border border-emerald-100 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5">
            Ready to Ship
          </span>
        )}
        {product.isNew && (
          <span className="bg-sky-50 text-sky-800 border border-sky-100 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5">
            New In
          </span>
        )}
        {hasDiscount && (
          <span className="bg-rose-600 text-white font-mono text-[8.5px] font-semibold tracking-wider uppercase px-2 py-0.5">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      {/* Visual Hover utilities: Wishlist */}
      <button
        onClick={() => onAddToWishlist(product)}
        className="absolute top-3 right-3 z-10 w-8.5 h-8.5 rounded-full bg-white/95 hover:bg-black hover:text-white text-gray-700 shadow flex items-center justify-center transition-all focus:outline-none"
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        id={`wish-toggle-${product.id}`}
      >
        <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image Frame */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        
        {/* Luxury screen utilities on hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-10 h-10 rounded-full bg-white text-black hover:bg-black hover:text-white shadow flex items-center justify-center transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
            title="Quick View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-10 h-10 rounded-full bg-white text-black hover:bg-black hover:text-white shadow flex items-center justify-center transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
            title="Add to Shopping Bag"
            id={`add-bag-icon-${product.id}`}
          >
            <ShoppingBag className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Product Description Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Brand & Category line */}
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            <span className="font-semibold text-gray-800">{product.brand}</span>
            <span>{product.subCategory}</span>
          </div>

          {/* Product Name */}
          <h5 className="font-serif text-[13px] sm:text-[14px] font-medium text-gray-900 group-hover:text-emerald-800 tracking-wide line-clamp-1 transition-colors">
            {product.name}
          </h5>

          {/* Designer name */}
          <p className="font-sans text-[11px] text-gray-500 italic font-light">
            by {product.designer}
          </p>
        </div>

        {/* Rating and price tag footer */}
        <div className="pt-3 border-t border-gray-50 flex items-baseline justify-between mt-3">
          {/* Ratings */}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono text-[10.5px] font-medium text-gray-700">{product.rating.toFixed(1)}</span>
            <span className="font-mono text-[9px] text-gray-400">({product.reviewsCount})</span>
          </div>

          {/* Price element */}
          <div className="text-right">
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] font-mono text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-[13px] sm:text-[14px] font-mono text-rose-600 font-semibold">
                  {formatPrice(finalPrice)}
                </span>
              </div>
            ) : (
              <span className="text-[13px] sm:text-[14px] font-mono text-gray-900 font-medium">
                {formatPrice(finalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Button below for easy touch screens */}
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full border border-gray-200 text-[#111111] hover:bg-black hover:text-white hover:border-black font-mono text-[10px] tracking-widest uppercase py-2.5 transition-colors focus:outline-none"
          id={`add-bag-btn-${product.id}`}
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
