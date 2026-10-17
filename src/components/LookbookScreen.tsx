import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Plus, 
  Check, 
  ShoppingBag, 
  Eye, 
  Filter, 
  SlidersHorizontal 
} from 'lucide-react';
import { Lookbook, Product, ScreenId } from '../types';
import { LOOKBOOKS } from '../data/mockData';

interface LookbookScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectScreen: (screen: ScreenId) => void;
}

export const LookbookScreen: React.FC<LookbookScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onSelectScreen,
}) => {
  const [activeLookbookId, setActiveLookbookId] = useState<string>('lookbook-1');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs-1');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2500);

  const activeLookbook = LOOKBOOKS.find(l => l.id === activeLookbookId) || LOOKBOOKS[0];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  // Find products tagged in the active lookbook
  const taggedProducts = activeLookbook.hotspots
    .map(hs => products.find(p => p.id === hs.productId))
    .filter((p): p is Product => !!p);

  // Filter full catalog below
  const filteredCatalog = products.filter(p => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesPrice = p.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full pb-24">
      {/* Header Introduction */}
      <section className="bg-[#F7F4EE] border-b border-stone-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-amber-800 uppercase tracking-widest font-semibold">
              <span>Spatial Lookbooks</span>
              <span aria-hidden="true">·</span>
              <span>Screen 03</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 font-normal">
              Architectural Living Spaces
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              Explore meticulously curated rooms conceived by our architectural fellows. 
              Click the interactive pins to examine material harmonies, scale relationships, and exact craftsmanship provenance.
            </p>
          </div>

          {/* Lookbook Switcher Tabs */}
          <div className="flex items-center gap-2 pt-8 overflow-x-auto pb-1">
            {LOOKBOOKS.map((lb) => {
              const isActive = lb.id === activeLookbookId;
              return (
                <button
                  key={lb.id}
                  onClick={() => {
                    setActiveLookbookId(lb.id);
                    setActiveHotspotId(lb.hotspots[0]?.id || null);
                  }}
                  className={`px-4 py-2.5 rounded-sm text-xs tracking-wider uppercase font-medium transition-all text-left flex items-center gap-2 border ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white/80 text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lb.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Interactive Hotspot Room Canvas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="space-y-6">
          {/* Room Ambient Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-900 font-medium">
                {activeLookbook.location}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-0.5">
                {activeLookbook.title}
              </h2>
            </div>
            <p className="text-xs text-stone-500 max-w-md font-light">
              {activeLookbook.description}
            </p>
          </div>

          {/* Interactive Image Frame */}
          <div className="relative rounded-xl overflow-hidden shadow-xl bg-stone-950 aspect-[16/10] sm:aspect-[16/9] border border-stone-300">
            <img
              src={activeLookbook.imageUrl}
              alt={activeLookbook.title}
              className="w-full h-full object-cover transition-opacity duration-700"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-stone-950/15 pointer-events-none" />

            {/* Hotspots */}
            {activeLookbook.hotspots.map((hs) => {
              const isSelected = activeHotspotId === hs.id;
              const product = products.find(p => p.id === hs.productId);

              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  {/* Pin Button */}
                  <button
                    onClick={() => setActiveHotspotId(hs.id)}
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white scale-110 shadow-lg ring-4 ring-white/60'
                        : 'bg-white/90 text-stone-900 hover:bg-white hover:scale-105 shadow-md'
                    }`}
                    title={hs.title}
                    aria-label={`View ${hs.title}`}
                  >
                    <Plus className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'rotate-45' : ''}`} />
                    
                    {/* Pulsing ring animation */}
                    {!isSelected && (
                      <span className="absolute inset-0 rounded-full bg-white opacity-40 animate-ping" />
                    )}
                  </button>

                  {/* Tooltip Card (Appears if active) */}
                  {isSelected && product && (
                    <div 
                      onClick={() => onSelectProduct(product)}
                      className="absolute left-1/2 bottom-full mb-3 transform -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md p-3.5 rounded-lg shadow-2xl border border-stone-200 z-30 cursor-pointer animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 rounded object-cover border border-stone-200"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-semibold text-stone-900 truncate">
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs text-stone-900 font-medium block mt-0.5">
                            ${product.price}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="text-amber-800 font-medium flex items-center gap-1">
                          <span>View Detail</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="px-2.5 py-1 bg-stone-900 text-white rounded text-[10px] font-semibold uppercase hover:bg-stone-800"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tagged Items Shelf (Shop The Space) */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-stone-900">
                Objects Featured in this Composition ({taggedProducts.length})
              </h3>
              <span className="text-xs text-stone-500">
                Click any piece to open full specifications
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {taggedProducts.map((prod) => {
                const isRecentlyAdded = addedId === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="p-4 rounded-lg bg-white border border-stone-200 hover:border-stone-400 transition-all cursor-pointer flex gap-4 items-center group"
                  >
                    <div className="w-20 h-20 rounded bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                        {prod.designer}
                      </div>
                      <h4 className="font-serif text-sm text-stone-900 font-medium truncate group-hover:text-amber-900">
                        {prod.name}
                      </h4>
                      <div className="font-mono text-xs font-semibold text-stone-900">
                        ${prod.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, prod)}
                      className={`p-2.5 rounded-full text-xs transition-colors flex-shrink-0 ${
                        isRecentlyAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-900 hover:text-white'
                      }`}
                      title="Add to Bag"
                    >
                      {isRecentlyAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="border-t border-stone-200 pt-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                Complete Archive
              </span>
              <h2 className="font-serif text-3xl text-stone-900 mt-1">
                Spatial Catalogue &amp; Materials
              </h2>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* Category tabs */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-md">
                {['All', 'Seating', 'Lighting', 'Tables', 'Ceramics', 'Textiles', 'Objects'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded text-xs transition-colors ${
                      categoryFilter === cat
                        ? 'bg-white text-stone-900 shadow-xs font-medium'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Price Filter */}
              <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-md">
                <span className="text-stone-500">Max:</span>
                <span className="font-mono font-medium text-stone-900">${maxPrice}</span>
                <input
                  type="range"
                  min="200"
                  max="2500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCatalog.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group cursor-pointer space-y-2 bg-white p-3 rounded-lg border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/5] rounded overflow-hidden bg-stone-100">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[11px] text-stone-500">{p.material.split('&')[0]}</div>
                <h4 className="font-serif text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                  {p.name}
                </h4>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-mono font-medium text-stone-900">${p.price}</span>
                  <span className="text-stone-500 text-[11px]">{p.origin.split(',')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
