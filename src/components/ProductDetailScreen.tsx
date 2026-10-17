import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { Product, Review, ScreenId } from '../types';
import { REVIEWS } from '../data/mockData';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, color: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectScreen: (screen: ScreenId) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  allProducts,
  onSelectProduct,
  onSelectScreen,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('provenance');
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="w-full pb-24">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span>Atelier</span>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-stone-900 font-medium">{product.name}</span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
              }
            }}
            className="flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Viewport */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={`${product.name} - View ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />

              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-sm text-[11px] text-white tracking-wider uppercase font-medium">
                {product.origin}
              </div>

              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-stone-700 font-mono">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-stone-900 shadow-md ring-1 ring-stone-900'
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-stone-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Material Highlight Card */}
            <div className="p-6 rounded-lg bg-stone-100/70 border border-stone-200 text-xs text-stone-700 space-y-2">
              <span className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] block">
                Material Authenticity Guarantee
              </span>
              <p className="leading-relaxed">
                {product.provenance}
              </p>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 tracking-wider uppercase font-medium">
                <span>By {product.designer}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-800">{product.category}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1 leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-stone-600 mt-2 font-light">
                {product.subtitle}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl text-stone-900 font-medium">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-stone-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-stone-500 font-light">USD</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-700">
                <div className="flex items-center text-amber-600">
                  <Star className="w-4 h-4 fill-amber-600" />
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Color / Finish Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-900">Finish &amp; Tone:</span>
                  <span className="text-stone-600 font-medium">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColor(color.name);
                          if (color.imageIndex !== undefined && product.images[color.imageIndex]) {
                            setSelectedImageIndex(color.imageIndex);
                          }
                        }}
                        className={`group relative p-1 rounded-full transition-all ${
                          isSelected
                            ? 'ring-2 ring-stone-900 ring-offset-2'
                            : 'hover:ring-1 hover:ring-stone-400 ring-offset-1'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-stone-900">Dimensions / Edition:</div>
                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 rounded text-xs text-center border font-medium transition-all ${
                        selectedSize === size
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-sm bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm text-stone-900 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-sm text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-sm border transition-colors ${
                    isWishlisted
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 bg-white'
                  }`}
                  title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Instant Checkout Shortcut */}
              <button
                onClick={() => {
                  onAddToCart(product, quantity, selectedColor, selectedSize);
                  onSelectScreen('checkout');
                }}
                className="w-full py-3 px-6 rounded-sm text-xs uppercase tracking-wider font-semibold border border-stone-800 text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Instant Checkout
              </button>
            </div>

            {/* Delivery & Service Assurance */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-center">
              <div className="p-3 rounded bg-stone-50 border border-stone-100 flex flex-col items-center gap-1 text-[11px] text-stone-600">
                <Truck className="w-4 h-4 text-stone-800" />
                <span className="font-medium text-stone-900">White-Glove</span>
                <span className="text-[10px] text-stone-500">Unpack &amp; Placed</span>
              </div>
              <div className="p-3 rounded bg-stone-50 border border-stone-100 flex flex-col items-center gap-1 text-[11px] text-stone-600">
                <ShieldCheck className="w-4 h-4 text-stone-800" />
                <span className="font-medium text-stone-900">10-Yr Warranty</span>
                <span className="text-[10px] text-stone-500">Solid Joinery</span>
              </div>
              <div className="p-3 rounded bg-stone-50 border border-stone-100 flex flex-col items-center gap-1 text-[11px] text-stone-600">
                <RotateCcw className="w-4 h-4 text-stone-800" />
                <span className="font-medium text-stone-900">60-Day Trial</span>
                <span className="text-[10px] text-stone-500">In Your Space</span>
              </div>
            </div>

            {/* Collapsible Accordions */}
            <div className="border-t border-stone-200 divide-y divide-stone-200 text-xs">
              {/* Accordion 1 */}
              <div>
                <button
                  onClick={() => toggleAccordion('provenance')}
                  className="w-full py-3.5 flex items-center justify-between text-left font-medium text-stone-900 hover:text-amber-800"
                >
                  <span>01. Design Provenance &amp; Architect Vision</span>
                  {openAccordion === 'provenance' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'provenance' && (
                  <div className="pb-4 text-stone-600 space-y-2 leading-relaxed">
                    <p>{product.description}</p>
                    <p className="text-[11px] text-stone-500">
                      Designed by {product.designer}. Assembled by master craftspeople in {product.origin}.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2 */}
              <div>
                <button
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-3.5 flex items-center justify-between text-left font-medium text-stone-900 hover:text-amber-800"
                >
                  <span>02. Material Specifications</span>
                  {openAccordion === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'materials' && (
                  <div className="pb-4 text-stone-600 space-y-2">
                    <p className="font-medium text-stone-800">{product.material}</p>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3 */}
              <div>
                <button
                  onClick={() => toggleAccordion('dimensions')}
                  className="w-full py-3.5 flex items-center justify-between text-left font-medium text-stone-900 hover:text-amber-800"
                >
                  <span>03. Dimensions &amp; Net Weight</span>
                  {openAccordion === 'dimensions' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'dimensions' && (
                  <div className="pb-4 text-stone-600 space-y-1 font-mono text-[11px]">
                    <div>Dimensions: {product.dimensions}</div>
                    <div>Net Weight: {product.weight}</div>
                    <div className="pt-2 text-[11px] text-stone-500 font-sans">
                      Delivered in custom high-density foam-lined wooden crating.
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="border-t border-stone-200 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                Collector Voices
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-1">
                Verified Reviews ({product.reviewCount})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl font-medium text-stone-900">{product.rating}</span>
              <div className="text-xs text-stone-500">
                <div className="flex text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-600" />
                  ))}
                </div>
                <span>100% Recommended</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="p-6 rounded-lg bg-white border border-stone-200 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-600">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-600" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-light">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <div>
                    <span className="font-medium text-stone-900 block">{rev.author}</span>
                    <span>{rev.location}</span>
                  </div>
                  <span className="text-emerald-700 font-medium">Verified Owner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Sell Recommendations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="border-t border-stone-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-stone-900">
              Harmonizes Well In The Space
            </h2>
            <button
              onClick={() => onSelectScreen('home')}
              className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1"
            >
              <span>View All Pieces</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectProduct(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer space-y-2"
              >
                <div className="aspect-[4/3] rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[11px] text-stone-500">{rel.designer}</div>
                <h4 className="font-serif text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                  {rel.name}
                </h4>
                <div className="font-mono text-xs text-stone-900 font-medium">
                  ${rel.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
