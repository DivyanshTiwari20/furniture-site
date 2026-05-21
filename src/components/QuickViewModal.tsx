import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  currency,
  onAddToCart,
  onAddToWishlist,
  isWishlisted
}: QuickViewModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!isOpen || !product) return null;

  const basePrice = product.basePriceEUR * currency.rateToEUR;
  const discountRate = (product.discountPercent || 0) / 100;
  const finalPrice = basePrice * (1 - discountRate);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="quick-view-modal">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl shadow-2xl z-10 flex flex-col md:flex-row rounded-none overflow-hidden max-h-[90vh] md:max-h-[85vh] animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-black hover:text-white rounded-full transition-all text-gray-500 shadow focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col justify-between overflow-y-auto">
          {/* Main Display Image */}
          <div className="aspect-square bg-white flex items-center justify-center border border-gray-100 overflow-hidden relative">
            <img
              src={product.gallery[selectedImageIdx] || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          {/* Thumbnails Gallery */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1.5 justify-center md:justify-start">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-14 h-14 border bg-white flex-shrink-0 focus:outline-none transition-all ${
                    idx === selectedImageIdx ? 'border-black ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Luxury badges */}
          <div className="hidden md:flex flex-col gap-3.5 mt-6 border-t border-gray-100 pt-5 text-[11px] text-gray-500">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-700 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">100% Authentic Product</p>
                <p className="font-light">Directly certified by {product.brand} custom vaults.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Truck className="w-4.5 h-4.5 text-[#111111] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Express Insured Courier</p>
                <p className="font-light">Customs cleared, delivered straight to your door step.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white border-l border-gray-100">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-400 block font-semibold">
                {product.brand}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-light text-gray-900 mt-1 leading-snug">
                {product.name}
              </h2>
              <p className="font-sans text-xs text-gray-500 italic mt-0.5">
                by {product.designer}
              </p>
            </div>

            {/* Ratings & SKU row */}
            <div className="flex items-center gap-4 text-xs font-mono border-y border-gray-100 py-2.5 text-gray-500">
              <div className="flex items-center gap-1 text-gray-900 font-medium">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span>SKU: {product.sku}</span>
            </div>

            {/* Prices */}
            <div className="space-y-1">
              <p className="font-mono text-[10.5px] text-gray-400 uppercase tracking-wider">Estimated Cost</p>
              {product.discountPercent ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-mono text-rose-600 font-bold">
                    {formatPrice(finalPrice)}
                  </span>
                  <span className="text-sm font-mono text-gray-400 line-through">
                    {formatPrice(basePrice)}
                  </span>
                  <span className="bg-rose-50 text-rose-700 text-[10px] font-mono uppercase px-2 py-0.5">
                    Save {product.discountPercent}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-mono text-gray-900 font-medium">
                  {formatPrice(finalPrice)}
                </span>
              )}
            </div>

            {/* Detailed description */}
            <div className="space-y-1.5 text-xs text-gray-600 leading-relaxed font-sans">
              <p className="font-medium text-gray-900">About this design classic</p>
              <p className="font-light">{product.description}</p>
            </div>

            {/* Specifications Lists */}
            <div className="bg-gray-50 p-4 space-y-2 border border-gray-100 text-[11px] font-mono">
              <p className="font-semibold text-gray-800 uppercase tracking-widest text-[9px] border-b border-gray-200 pb-1 mb-2">Technical Details</p>
              <p><span className="text-gray-400">Dimensions:</span> <span className="text-gray-800">{product.dimensions}</span></p>
              <p><span className="text-gray-400">Materials:</span> <span className="text-gray-800">{product.materials}</span></p>
              {product.designerBio && (
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <p className="text-gray-400 uppercase text-[8.5px] font-semibold tracking-wider">Designer Bio</p>
                  <p className="text-gray-600 font-sans italic text-[11.5px] mt-1">"{product.designerBio}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-emerald-800 py-4 transition-colors flex items-center justify-center gap-2 shadow"
              id="modal-add-to-bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={() => onAddToWishlist(product)}
              className={`w-12 border flex items-center justify-center transition-colors focus:outline-none ${
                isWishlisted
                  ? 'border-rose-200 bg-rose-50 text-rose-500'
                  : 'border-gray-200 hover:border-black text-gray-700 hover:bg-gray-50'
              }`}
              title="Add into Wishlist"
              id="modal-wishlist-toggle"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
