import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, ChevronRight, CheckCircle2, Ticket } from 'lucide-react';
import { CartItem, CurrencyConfig, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: CurrencyConfig;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmountPercent, setDiscountAmountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  
  // Shipping input forms
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    state: ''
  });

  if (!isOpen) return null;

  // Compute prices
  const subtotalEUR = cartItems.reduce((acc, item) => {
    const itemPriceEUR = item.product.basePriceEUR * (1 - (item.product.discountPercent || 0) / 100);
    return acc + itemPriceEUR * item.quantity;
  }, 0);

  const subtotalLocal = subtotalEUR * currency.rateToEUR;
  const discountLocal = discountApplied ? subtotalLocal * (discountAmountPercent / 100) : 0;
  
  // Standard shipping (free if order > ₹80,000 threshold or EUR eq, otherwise mock value)
  const shippingThresholdLocal = 80000;
  const shippingCostLocal = (subtotalLocal > shippingThresholdLocal || subtotalLocal === 0) ? 0 : 2500 * currency.rateToEUR / 90;
  const totalLocal = subtotalLocal - discountLocal + shippingCostLocal;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.toUpperCase().trim();
    if (code === 'MOHD10') {
      setDiscountApplied(true);
      setDiscountAmountPercent(10);
      setPromoError('');
    } else if (code) {
      setPromoError('Invalid promo code. Try "MOHD10"');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingDetails.fullName || !shippingDetails.email || !shippingDetails.address || !shippingDetails.phone) {
      alert('Please fill out all mandatory shipping details.');
      return;
    }
    setCheckoutStep('success');
  };

  const handleCompleteDone = () => {
    onClearCart();
    setCheckoutStep('cart');
    setDiscountApplied(false);
    setPromoCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-container">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col animate-slide-in">
        {/* Header Drawer */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-800" />
            <h4 className="font-serif text-lg font-medium tracking-wide">
              {checkoutStep === 'cart' && 'Shopping Bag'}
              {checkoutStep === 'shipping' && 'Shipping & Payment'}
              {checkoutStep === 'success' && 'Order Confirmed'}
            </h4>
            <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body split into steps */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const basePrice = item.product.basePriceEUR * currency.rateToEUR;
                    const discountRate = (item.product.discountPercent || 0) / 100;
                    const finalItemPrice = basePrice * (1 - discountRate);

                    return (
                      <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover bg-gray-50 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-mono uppercase text-gray-400 tracking-wider font-semibold">
                            {item.product.brand}
                          </p>
                          <h5 className="font-serif text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {item.product.name}
                          </h5>
                          <p className="text-xs font-mono text-gray-500 mt-0.5">
                            {formatPrice(finalItemPrice)}
                          </p>

                          {/* Control row */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 text-gray-500 focus:outline-none"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs px-2.5 min-w-[24px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 text-gray-500 focus:outline-none"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-gray-400 hover:text-rose-600 transition-colors duration-150 p-1"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto" />
                  <p className="font-serif text-base text-gray-800">Your shopping bag is empty</p>
                  <p className="font-sans text-xs text-gray-400 max-w-[200px] mx-auto">
                    Browse our design classics and add items to your e-commerce bag.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 font-mono text-[10px] tracking-widest uppercase bg-[#111] text-white px-6 py-2.5 hover:bg-opacity-80 transition-opacity"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'shipping' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="bg-gray-50 p-3.5 border border-gray-100">
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">ORDER VALUATION</span>
                <p className="font-mono text-xs font-semibold text-gray-900 mt-1">Total Due: {formatPrice(totalLocal)}</p>
              </div>

              <div className="space-y-3">
                <h6 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 font-semibold">
                  Delivery Information
                </h6>
                <div>
                  <label className="block text-[10.5px] font-mono text-gray-500 uppercase">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.fullName}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                    placeholder="Enter full name"
                    className="mt-1 w-full border border-gray-200 py-1.5 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10.5px] font-mono text-gray-500 uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="mt-1 w-full border border-gray-200 py-1.5 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-mono text-gray-500 uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      placeholder="Include country code"
                      className="mt-1 w-full border border-gray-200 py-1.5 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-mono text-gray-500 uppercase">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    placeholder="Appt, Suite, Street name"
                    className="mt-1 w-full border border-gray-200 py-1.5 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10.5px] font-mono text-gray-500 uppercase">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      placeholder="e.g. Mumbai"
                      className="mt-1 w-full border border-gray-200 py-1.5 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-mono text-gray-500 uppercase">ZIP/Pin *</label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      placeholder="000 000"
                      className="mt-1 w-full border border-gray-200 py-1.5 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <h6 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 font-semibold">
                  Secure Payment Gateway (Mock)
                </h6>
                <div className="bg-emerald-50 border border-emerald-100 p-3 text-[11px] text-emerald-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Order Placement: Demo Gateway (No real card required).</span>
                </div>
                <button
                  type="submit"
                  className="w-full font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-emerald-800 py-3.5 transition-colors duration-150 rounded-none shadow"
                  id="checkout-pay-btn"
                >
                  Pay & Confirm Purchase ({formatPrice(totalLocal)})
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h5 className="font-serif text-2xl font-light text-gray-900">Purchase Completed!</h5>
              <div className="bg-gray-50 p-4 border border-gray-100 text-left font-mono text-xs text-gray-600 space-y-2 max-w-sm mx-auto">
                <p><span className="text-gray-400">Order ID:</span> MOHD-8294715-IN</p>
                <p><span className="text-gray-400">Deliver To:</span> {shippingDetails.fullName}</p>
                <p><span className="text-gray-400">Address:</span> {shippingDetails.address}, {shippingDetails.city}</p>
                <p><span className="text-gray-400">Shipping Mode:</span> Standard Air (Customs Cleared)</p>
                <p className="border-t border-gray-200 pt-2 font-semibold text-black">
                  Paid Amount: {formatPrice(totalLocal)}
                </p>
              </div>
              <p className="font-sans text-xs text-gray-400 max-w-xs mx-auto">
                Congratulations on configuring classic designer beauty. A courier tracking link has been scheduled for your records. (This is a mock successful transaction)
              </p>
              <button
                onClick={handleCompleteDone}
                className="font-mono text-[10.5px] tracking-widest uppercase bg-black text-white px-8 py-3.5 hover:bg-opacity-80 transition-all rounded-none"
              >
                Return to Shop Home
              </button>
            </div>
          )}

        </div>

        {/* Footer Area with Pricing summary for Cart Step */}
        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
            
            {/* Promo code input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Ticket className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter coupon (MOHD10)"
                  disabled={discountApplied}
                  className="w-full text-xs pl-8 pr-2 py-2 border border-gray-200 bg-white placeholder-gray-400 focus:outline-none focus:border-black uppercase rounded-none"
                />
              </div>
              <button
                type="submit"
                disabled={discountApplied}
                className={`font-mono text-[10px] tracking-widest uppercase py-2 px-4 transition-colors rounded-none ${
                  discountApplied ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-not-allowed' : 'bg-black text-white hover:bg-opacity-80'
                }`}
              >
                {discountApplied ? 'Applied' : 'Apply'}
              </button>
            </form>
            {promoError && <p className="text-[11px] text-rose-600 font-mono">{promoError}</p>}
            {discountApplied && (
              <p className="text-[11px] text-emerald-600 font-mono">
                ✓ 10% Discount applied successfully.
              </p>
            )}

            {/* Price breakdown */}
            <div className="space-y-2 text-xs font-mono text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="text-gray-900 font-medium">{formatPrice(subtotalLocal)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-rose-600">
                  <span>MOHD10 Promo Code (10%)</span>
                  <span>-{formatPrice(discountLocal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Customs Duties & Express Shipping</span>
                {shippingCostLocal === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase text-[10px] tracking-wider">Free Delivery</span>
                ) : (
                  <span className="text-gray-900">{formatPrice(shippingCostLocal)}</span>
                )}
              </div>
              
              {shippingCostLocal > 0 && (
                <p className="text-[9.5px] text-gray-400 text-right italic font-sans">
                  Spend {formatPrice(shippingThresholdLocal - subtotalLocal)} more for Free delivery to India!
                </p>
              )}

              <div className="flex justify-between text-sm text-[#111] font-semibold border-t border-gray-200 pt-3">
                <span className="uppercase tracking-wider">Estimated Total</span>
                <span className="text-base font-bold">{formatPrice(totalLocal)}</span>
              </div>
            </div>

            {/* Check out CTA */}
            <button
              onClick={() => setCheckoutStep('shipping')}
              className="w-full font-mono text-[11px] tracking-widest uppercase bg-black text-white hover:bg-emerald-800 py-4 transition-colors flex items-center justify-center gap-2 shadow"
              id="begin-checkout-btn"
            >
              <span>Proceed to Check Out</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
