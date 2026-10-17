import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Flame, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Product, ScreenId } from '../types';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectScreen: (screen: ScreenId) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onSelectScreen,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Tables', 'Seating', 'Lighting', 'Ceramics', 'Textiles', 'Objects'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF6F0] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs text-amber-800 tracking-wider uppercase font-semibold">
                <span>The Autumn 2026 Collection</span>
                <span aria-hidden="true">·</span>
                <span>Curated Drop 04</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.12]">
                Tactile Stillness &amp; Ancient Stone
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                Sculptural furniture and ambient washi lighting designed for restorative domestic spaces. 
                Carved from raw Italian Roman travertine and seasoned Danish smoked oak.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    const heroProduct = products.find(p => p.id === 'prod-1') || products[0];
                    onSelectProduct(heroProduct);
                  }}
                  className="px-6 py-3.5 bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Sylvan Table</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectScreen('lookbook')}
                  className="px-6 py-3.5 bg-transparent border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs uppercase tracking-widest font-medium transition-all rounded-sm flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-stone-600" />
                  <span>Kyoto Lookbook</span>
                </button>
              </div>

              {/* Curated Drop Micro-Metrics */}
              <div className="pt-6 border-t border-stone-200/80 flex items-center gap-8 text-xs text-stone-500">
                <div>
                  <span className="block text-stone-900 font-semibold text-base font-serif">100%</span>
                  <span>Natural Provenance</span>
                </div>
                <div className="w-px h-8 bg-stone-300" />
                <div>
                  <span className="block text-stone-900 font-semibold text-base font-serif">Limited</span>
                  <span>Numbered Editions</span>
                </div>
                <div className="w-px h-8 bg-stone-300" />
                <div>
                  <span className="block text-stone-900 font-semibold text-base font-serif">Global</span>
                  <span>White-Glove Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-6 relative">
              <div 
                onClick={() => {
                  const heroProduct = products.find(p => p.id === 'prod-1') || products[0];
                  onSelectProduct(heroProduct);
                }}
                className="group cursor-pointer relative rounded-lg overflow-hidden shadow-2xl bg-stone-200 aspect-[4/3] sm:aspect-[16/11]"
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
                  alt="Kyoto Courtyard Living featuring Sylvan Travertine Table"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-transparent" />

                {/* Overlaid Tag */}
                <div className="absolute top-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-stone-200 text-xs text-stone-900 font-medium flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                  <span>Featured Editorial Residence · Kyoto</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-stone-300">Edition Piece</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white">Sylvan Honed Travertine Table</h3>
                    <p className="text-xs text-stone-300 font-mono mt-0.5">$1,840 USD · Tivoli Roman Quarry</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Curated Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1.5">
              Available Editions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              Curated Masterpieces
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 pt-10">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isRecentlyAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with Actions */}
                <div className="relative aspect-[4/5] bg-stone-100 rounded-md overflow-hidden border border-stone-200/60 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Badges without generic pill spam */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-stone-900 text-stone-100 text-[10px] uppercase font-semibold px-2 py-0.5 tracking-wider rounded-sm">
                        New Release
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-amber-800 text-amber-50 text-[10px] uppercase font-semibold px-2 py-0.5 tracking-wider rounded-sm">
                        Signature Drop
                      </span>
                    )}
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-600 shadow-sm'
                          : 'bg-white/80 backdrop-blur-sm text-stone-700 hover:text-stone-950 hover:bg-white shadow-sm'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-stone-700 hover:text-stone-950 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      title="Quick Preview"
                      aria-label="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Add Overlay Bar on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full py-2.5 px-3 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors ${
                        isRecentlyAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-900/90 backdrop-blur-md text-white hover:bg-stone-900'
                      }`}
                    >
                      {isRecentlyAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Quick Add · ${product.price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Metadata (Clean Unboxed Typography) */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <span>{product.designer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.origin.split(',')[0]}</span>
                  </div>

                  <h3 className="font-serif text-lg text-stone-900 font-normal leading-snug group-hover:text-amber-900 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-1">
                    {product.subtitle}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-stone-900 font-semibold text-sm">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="font-mono text-stone-400 line-through text-[11px]">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-stone-600">
                      <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-stone-400">({product.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Spatial Story / Lookbook Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="relative rounded-xl overflow-hidden bg-stone-900 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-semibold">
                  <span>Interactive Spatial Experience</span>
                  <span aria-hidden="true">·</span>
                  <span>Screen 03</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                  The Kyoto Courtyard Residence
                </h2>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                  Explore full architectural interior compositions with interactive product hotspots. 
                  Tap tagged pieces within real living spaces to preview finish pairings and instant specifications.
                </p>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectScreen('lookbook')}
                  className="px-6 py-3.5 bg-white text-stone-900 hover:bg-stone-100 text-xs font-semibold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Launch Spatial Lookbook</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Ambient Room Image */}
            <div className="lg:col-span-7 relative h-72 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Kyoto Courtyard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent lg:hidden block" />

              {/* Pulsing Hotspot Hint */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>3 Interactive Pieces Tagged</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Philosophy / Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Our Guiding Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-2">
            The Atelier Principles
          </h2>
          <p className="text-stone-600 text-sm mt-3 font-light">
            Rejecting disposable trends in favor of enduring organic materials and multi-generational joinery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg bg-white border border-stone-200/80 space-y-3">
            <span className="text-xs font-mono text-amber-800 font-semibold uppercase">01 / Provenance</span>
            <h3 className="font-serif text-xl text-stone-900">Geologic Honesty</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              We never utilize synthetic veneers or simulated grain. Every slab of Roman travertine and white oak retains authentic natural pores, fissures, and mineral veins.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-white border border-stone-200/80 space-y-3">
            <span className="text-xs font-mono text-amber-800 font-semibold uppercase">02 / Craft</span>
            <h3 className="font-serif text-xl text-stone-900">Slow Hand-Assembly</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              From Echizen washi mulberry paper harvested in Fukui to Belgian linen woven on heritage shuttle looms, each piece honors ancestral European and Japanese techniques.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-white border border-stone-200/80 space-y-3">
            <span className="text-xs font-mono text-amber-800 font-semibold uppercase">03 / Care</span>
            <h3 className="font-serif text-xl text-stone-900">White-Glove Delivery</h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Every substantial furniture piece includes bespoke wooden crating, room-of-choice placement, unboxing, debris removal, and leveling by specialized art handlers.
            </p>
          </div>
        </div>
      </section>

      {/* Private Drops / Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 text-center">
        <div className="p-10 sm:p-14 rounded-xl bg-stone-100 border border-stone-200 space-y-4">
          <span className="text-xs uppercase tracking-widest text-amber-900 font-medium">
            Private Access
          </span>
          <h2 className="font-serif text-3xl text-stone-900">
            Receive Curator Monographs &amp; Early Drops
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto font-light">
            Subscribers receive first access to limited-edition travertine carvings, ceramic numbered releases, and invitations to seasonal exhibitions.
          </p>

          <form onSubmit={handleSubscribe} className="pt-4 max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-2.5 bg-white border border-stone-300 rounded-sm text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 text-white hover:bg-stone-800 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
            >
              Join
            </button>
          </form>

          {subscribed && (
            <p className="text-xs text-emerald-700 font-medium pt-2">
              Thank you. You have been granted private access to Collection Drop 05.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
