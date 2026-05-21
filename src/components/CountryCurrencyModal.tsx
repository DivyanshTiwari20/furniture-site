import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CountryConfig, CurrencyConfig, COUNTRIES, CURRENCIES } from '../types';

interface CountryCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCountry: CountryConfig;
  currentCurrency: CurrencyConfig;
  onSave: (country: CountryConfig, currency: CurrencyConfig) => void;
}

export default function CountryCurrencyModal({
  isOpen,
  onClose,
  currentCountry,
  currentCurrency,
  onSave
}: CountryCurrencyModalProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState(currentCountry.code);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(currentCurrency.code);

  if (!isOpen) return null;

  const handleConfirmSave = () => {
    const country = COUNTRIES.find((c) => c.code === selectedCountryCode) || currentCountry;
    const currency = CURRENCIES[selectedCurrencyCode] || currentCurrency;
    onSave(country, currency);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow" id="country-currency-modal">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/55 transition-opacity" onClick={onClose}></div>

      {/* Container */}
      <div className="relative bg-white w-full max-w-md p-6 sm:p-8 shadow-2xl z-10 rounded-none animate-scale-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-400 block font-semibold">PREFERENCES</span>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-gray-900 mt-1">Shipping & Currency</h3>
            <p className="font-sans text-xs text-gray-500 mt-2">
              Select your delivery destination, language preference, and display currency. Prices convert dynamically in real-time.
            </p>
          </div>

          {/* 1. Country Picker */}
          <div className="space-y-2.5">
            <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Select Delivery Destination
            </label>
            <div className="grid grid-cols-1 gap-2">
              {COUNTRIES.map((ctry) => {
                const isSelected = ctry.code === selectedCountryCode;
                return (
                  <button
                    key={ctry.code}
                    onClick={() => {
                      setSelectedCountryCode(ctry.code);
                      setSelectedCurrencyCode(ctry.currency); // Auto-align default local currency
                    }}
                    className={`flex items-center justify-between p-3.5 border transition-all text-left rounded-none ${
                      isSelected
                        ? 'border-black bg-black/5 text-black font-semibold'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{ctry.flag}</span>
                      <div className="text-xs">
                        <p className="font-medium text-gray-900">{ctry.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">Language: {ctry.language}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-700" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Currency Picker */}
          <div className="space-y-2.5">
            <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Choose Currency
            </label>
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {Object.values(CURRENCIES).map((curr) => {
                const isSelected = curr.code === selectedCurrencyCode;
                return (
                  <button
                    key={curr.code}
                    onClick={() => setSelectedCurrencyCode(curr.code)}
                    className={`py-3 px-2 border text-center transition-all ${
                      isSelected
                        ? 'border-black bg-black text-white font-bold'
                        : 'border-gray-200 hover:border-gray-400 text-gray-700 bg-white'
                    }`}
                  >
                    <span className="block text-sm font-semibold">{curr.symbol}</span>
                    <span className="block text-[9px] text-gray-400 mt-1">{curr.code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Confirm buttons */}
          <div className="pt-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 font-mono text-xs tracking-widest uppercase border border-gray-200 py-3 text-gray-600 hover:text-black hover:border-black transition-colors rounded-none"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSave}
              className="flex-1 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-emerald-800 py-3 transition-colors rounded-none shadow"
              id="confirm-preferences-btn"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
