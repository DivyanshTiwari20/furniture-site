import React from 'react';

interface Promo {
  id: string;
  brand: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
}

interface PromoCardsProps {
  onSearchChange: (query: string) => void;
  onCategoryClick: (category: string) => void;
}

export default function PromoCards({ onSearchChange, onCategoryClick }: PromoCardsProps) {
  const promos: Promo[] = [
    {
      id: "soriana-sofa",
      brand: "Cassina",
      title: "The Soriana Suite",
      subtitle: "Experience revolutionary comfort wrapped in chrome architecture",
      tag: "EXPLORE ESSENTIALS",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "camaleonda-sofa",
      brand: "B&B Italia",
      title: "Camaleonda Modular",
      subtitle: "Uncompromising 1970 tufted luxury modular design",
      tag: "VIEW MODULAR GROUPS",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "ic-t1-lamp",
      brand: "Flos",
      title: "IC Balance Lights",
      subtitle: "Poetic spheres of blown-glass resting on fine brass rods",
      tag: "THE LIGHT SHOP",
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "eames-lounge-chair",
      brand: "Vitra",
      title: "Eames Classics",
      subtitle: "Curated molded plywood designs redefining premium comfort",
      tag: "SHOP ARMCHAIRS",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const handlePromoClick = (promo: Promo) => {
    // Scroll smoothly to catalog
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Set search query to brand or name
    onSearchChange(promo.brand);
  };

  return (
    <section className="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto" id="heritage-promos">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="font-mono text-[10px] sm:text-[11px] text-gray-400 tracking-[0.35em] uppercase">CURATED SELECTIONS</span>
        <h3 className="font-serif text-2xl sm:text-3.5xl font-light tracking-tight mt-1">Design Legends & Collections</h3>
        <p className="font-sans text-xs text-gray-500 mt-2">
          Discover original design staples from the world's most acclaimed creatives and luxury manufacturers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            onClick={() => handlePromoClick(promo)}
            className="group relative h-[360px] overflow-hidden cursor-pointer bg-gray-100 flex flex-col justify-end"
          >
            {/* Background image & Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-[1] transition-opacity group-hover:opacity-90"></div>
            </div>

            {/* Promo text details */}
            <div className="relative z-10 p-6 text-white space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-300 block">
                {promo.brand}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                {promo.title}
              </h4>
              <p className="font-sans text-[11px] sm:text-xs text-gray-200 font-light leading-relaxed line-clamp-2">
                {promo.subtitle}
              </p>
              
              <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold text-white tracking-[0.2em] pt-2 border-b border-white/30 pb-0.5 group-hover:border-white transition-all">
                {promo.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
