import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  currency: CurrencyConfig;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  currency,
  onRemoveItem,
  onAddToCart
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="wishlist-drawer-container">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h4 className="font-serif text-lg font-medium tracking-wide">Saved Design Classics</h4>
            <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {wishlistItems.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List items */}
        <div className="flex-1 overflow-y-auto p-5">
          {wishlistItems.length > 0 ? (
            <div className="space-y-4">
              {wishlistItems.map((product) => {
                const basePrice = product.basePriceEUR * currency.rateToEUR;
                const discountRate = (product.discountPercent || 0) / 100;
                const finalPrice = basePrice * (1 - discountRate);

                return (
                  <div key={product.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider font-semibold">
                          {product.brand}
                        </p>
                        <h5 className="font-serif text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h5>
                        <p className="text-xs font-mono text-gray-500 mt-0.5">
                          {formatPrice(finalPrice)}
                        </p>
                      </div>

                      {/* CTA layout */}
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveItem(product.id);
                          }}
                          className="flex items-center gap-1.5 font-mono text-[9px] font-semibold tracking-wider uppercase border border-black bg-black text-white hover:bg-transparent hover:text-black px-2.5 py-1.5 transition-colors"
                          id={`wish-add-cart-${product.id}`}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                        
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-gray-400 hover:text-rose-600 font-mono text-[10px] flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-gray-200 mx-auto" />
              <p className="font-serif text-base text-gray-800">Your wishlist is empty</p>
              <p className="font-sans text-xs text-gray-400 max-w-[200px] mx-auto">
                Tap the heart on any luxury piece to archive it inside your personal collection folder.
              </p>
              <button
                onClick={onClose}
                className="mt-4 font-mono text-[10px] tracking-widest uppercase bg-[#111] text-white px-6 py-2.5 hover:bg-opacity-80 transition-opacity"
              >
                Close Folder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
