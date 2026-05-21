import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      badge: "LIVE FROM MILAN",
      title: "Salone del Mobile 2026",
      subtitle: "Discover exclusive collections, previews, and direct order launches straight from the world's premier furniture and design fair in Milan.",
      ctaText: "Explore Previews & Collections",
      ctaLink: "#catalog",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600"
    },
    {
      id: 2,
      badge: "INSPIRED BY BEAUTY SINCE 1968",
      title: "Our Experience, Your Story",
      subtitle: "For over five decades, we have been designing and styling exclusive private and commercial properties internationally. Authenticy is our signature.",
      ctaText: "Discover Premium Services",
      ctaLink: "#experience",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600"
    },
    {
      id: 3,
      badge: "SHIPPING DIRECTLY TO INDIA",
      title: "In Stock & Ready to Ship",
      subtitle: "Why wait for design? Explore over 10,000 certified original pieces ready for direct courier shipment to your home or studio catalog.",
      ctaText: "Browse Ready to Ship",
      ctaLink: "#catalog",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[380px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900" id="hero-carousel">
      {/* Slide Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 bg-black/45 z-[1]"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />

            {/* Slide Content */}
            <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center items-start text-white">
              <div className="max-w-xl space-y-4 sm:space-y-6">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] text-gray-200 uppercase inline-block bg-white/10 backdrop-blur-md px-3 py-1 border border-white/20 select-none">
                  {slide.badge}
                </span>
                
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
                  {slide.title}
                </h2>
                
                <p className="font-sans text-xs sm:text-base text-gray-200 font-light leading-relaxed">
                  {slide.subtitle}
                </p>

                <div className="pt-2">
                  <a
                    href={slide.ctaLink}
                    className="group inline-flex items-center gap-2 bg-white text-black text-xs font-mono uppercase tracking-widest px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/30 bg-black/20 hover:bg-white hover:text-black hover:border-white transition-all text-white flex items-center justify-center focus:outline-none"
        aria-label="Previous Slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/30 bg-black/20 hover:bg-white hover:text-black hover:border-white transition-all text-white flex items-center justify-center focus:outline-none"
        aria-label="Next Slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Bullet Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'bg-white w-7' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
