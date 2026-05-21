import React, { useState } from 'react';
import { Send, CheckCircle, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export default function TradeProgram() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    website: '',
    profession: 'Interior Designer'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert('Please fill in Name, Company, and Email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#faf9f6] py-16 px-4 sm:px-8 border-t border-b border-gray-100" id="trade">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left column: Visual explanation of program */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-gray-400 font-semibold block">
              ARCHITECTS & DECORATORS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-gray-900 leading-tight">
              Are you an architect or interior designer?
            </h3>
            <p className="font-serif text-xl font-light italic text-[#555555]">
              Join our trade program and access over 600 design brands.
            </p>
          </div>

          <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-lg font-light">
            Since 1968, we have been partnering with professionals worldwide to furnish exclusive hotels, restaurants, corporate headquarters, and luxury private residences. Join the Mohd Trade network to receive unmatched conditions, personal support, and direct Italian logistic corridors.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-sans">
            <div className="bg-white p-4 border border-gray-150 space-y-1.5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-gray-400 font-bold">01 / BRAND INDEX</span>
              <p className="font-medium text-gray-900 leading-tight">Over 600 Design Brands</p>
              <p className="text-[11px] text-gray-500 font-light leading-snug">Access catalog designs in one single account.</p>
            </div>
            <div className="bg-white p-4 border border-gray-150 space-y-1.5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-gray-400 font-bold">02 / TAX EXEMPTION</span>
              <p className="font-medium text-gray-900 leading-tight">Exclusive Pricing & Terms</p>
              <p className="text-[11px] text-gray-500 font-light leading-snug">VAT tax deductions and personalized project quotations.</p>
            </div>
            <div className="bg-white p-4 border border-gray-150 space-y-1.5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-gray-400 font-bold">03 / SUPPORT</span>
              <p className="font-medium text-gray-900 leading-tight">Technical Assistance</p>
              <p className="text-[11px] text-gray-500 font-light leading-snug">Direct technical drafts, finish swatches, and drawing specifications.</p>
            </div>
            <div className="bg-white p-4 border border-gray-150 space-y-1.5 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-gray-400 font-bold">04 / LOGISTICS</span>
              <p className="font-medium text-gray-900 leading-tight">Dedicated Logistics</p>
              <p className="text-[11px] text-gray-500 font-light leading-snug">Custom clearance support, white-globe delivery options.</p>
            </div>
          </div>
        </div>

        {/* Right column: Interactive enrollment interface */}
        <div className="bg-white p-6 sm:p-8 border border-gray-150 shadow-sm relative">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-xl font-light text-gray-900">Application Received</h4>
              <p className="font-sans text-xs text-gray-400 max-w-sm mx-auto">
                Thank you for applying to the Mohd design partner network. One of our dedicated account designers will contact you at <strong>{formData.email}</strong> within 24 working hours once we verify your trade credentials.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 font-mono text-[10px] tracking-widest uppercase border border-black px-6 py-2.5 hover:bg-black hover:text-white transition-colors"
              >
                Register Another Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
                <Sparkles className="w-5 h-5 text-gray-800" />
                <span className="font-serif text-lg font-light text-gray-900">Request Trade Account Access</span>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400">Full Professional Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Architect Alessandro Rossi"
                  className="mt-1 w-full border border-gray-200 py-2.5 px-3.5 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400">Agency or Architectural firm name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Rossi & Associates Design Lab"
                  className="mt-1 w-full border border-gray-200 py-2.5 px-3.5 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Professional Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@rossistudio.it"
                    className="mt-1 w-full border border-gray-200 py-2.5 px-3.5 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-gray-400">Website or Instagram Portfolio</label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="www.rossistudio.it"
                      className="w-full pl-8 border border-gray-200 py-2.5 px-3.5 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-gray-400">Area of Expertise</label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="mt-1 w-full border border-gray-200 py-2.5 px-3.5 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:border-black rounded-none"
                >
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Architect">Architect</option>
                  <option value="Home Decorator / Stager">Home Decorator / Stager</option>
                  <option value="Real Estate Developer">Real Estate Developer</option>
                  <option value="Showroom Coordinator & Trader">Showroom Coordinator & Trader</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-emerald-800 py-3.5 transition-colors duration-200 flex items-center justify-center gap-2 rounded-none"
                  id="trade-submit-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Partnership Request</span>
                </button>
              </div>

              <p className="text-[10px] text-gray-400 leading-snug text-center">
                By clicking, you consent to our security rules and confirm you hold legal professional status in your shipping country. Let's draft beauty.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
