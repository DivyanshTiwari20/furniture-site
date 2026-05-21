import React, { useState } from 'react';
import { Mail, ArrowRight, HelpCircle, Check, ShieldCheck, MapPin } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111] text-[#fafafa] font-sans pt-16 pb-12 px-4 sm:px-8 border-t border-gray-800" id="mohd-classic-footer">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Row 1: Brand Info & Newsletter Subscription */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand Bio */}
          <div className="space-y-4">
            <span className="font-serif text-2xl tracking-[0.3em] text-white">MOHD</span>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-gray-400 -mt-2">Mollura Home Design</p>
            <p className="text-[11.5px] text-gray-400 leading-relaxed font-light">
              Since 1968, we have been presenting and representing authentic luxury interior designs around the globe. Authenticity, beauty, and personalized project drafts are our commitments.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>Messina · Milan · New York · Worldwide</span>
            </div>
          </div>

          {/* Quick links: Categories */}
          <div className="space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#999] font-semibold border-b border-gray-800 pb-1.5">
              Design Categories
            </h5>
            <ul className="space-y-2 text-xs text-gray-400 font-light font-mono">
              <li><a href="#catalog" className="hover:text-white transition-colors">Furniture Collection</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Luxury Light Shop</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Table Accessories</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">In Stock Express</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">The Sale Archives</a></li>
            </ul>
          </div>

          {/* Quick links: Customer Service */}
          <div className="space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#999] font-semibold border-b border-gray-800 pb-1.5">
              Customer Experience
            </h5>
            <ul className="space-y-2 text-xs text-gray-400  font-light font-mono">
              <li><span className="cursor-pointer hover:text-white transition-colors">Secure Payment Modes</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Shipping & Customs Handling</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Right of Withdrawal</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">FAQ Support Desk</span></li>
              <li><a href="#trade" className="text-emerald-400 hover:underline">Trade Portal Login</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#999] font-semibold border-b border-gray-800 pb-1.5">
              The design Letter
            </h5>
            <p className="text-[11.5px] text-gray-400 font-light leading-relaxed">
              Subscribe to receive curated interior design forecasts, exclusive private sales launches, and Milan design trends.
            </p>

            {subscribed ? (
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs flex items-center gap-2 font-mono">
                <Check className="w-4 h-4" />
                <span>Subscribed successfully. Welcome!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@domain.com"
                    className="w-full text-xs pl-8 pr-2 py-2.5 bg-neutral-900 border border-neutral-800 placeholder-neutral-500 text-white focus:outline-none focus:border-white rounded-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-black p-2.5 hover:bg-neutral-200 transition-colors flex items-center justify-center rounded-none"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Row 2: Customer confidence banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left py-4 text-gray-400 font-light text-xs font-serif italic border-b border-gray-800 pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Guaranteed 100% Original Products. Luxury design certifcation in your box.</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <HelpCircle className="w-6 h-6 text-sky-400" />
            <span>Need advice? Our designers are live at <strong className="text-white">+39 090 6258945</strong>.</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Mail className="w-6 h-6 text-purple-400" />
            <span>Over 600 official high-end manufacturer permissions directly in Italy.</span>
          </div>
        </div>

        {/* Row 3: Bottom company copyright details */}
        <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 pt-4 text-[10.5px] text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} MOHD (Mollura Home Design S.r.l.). All rights reserved. P.IVA 01195940833.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Cookie Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Aesthetic Core Licensing</span>
            <span className="hover:text-gray-300 cursor-pointer">INR India Config</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
