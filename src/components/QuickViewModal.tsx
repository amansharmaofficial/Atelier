import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color: string) => void;
  onViewFullDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullDetails,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, 1, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Gallery Side */}
          <div className="bg-stone-100 p-4 flex flex-col justify-between">
            <div className="aspect-[4/5] rounded overflow-hidden relative">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded uppercase font-medium">
                {product.origin.split(',')[0]}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 pt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-stone-900' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-wider">
                <span>{product.designer}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
              </div>

              <h3 className="font-serif text-2xl text-stone-900 mt-1">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-xl font-medium text-stone-900">
                  ${product.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-600" />
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Finish */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  <div className="text-[11px] text-stone-600">
                    Finish: <span className="font-medium text-stone-900">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          selectedColor === c.name ? 'ring-2 ring-stone-900 ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors ${
                    added ? 'bg-emerald-700 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded border transition-colors ${
                    isWishlisted ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-stone-300 text-stone-700 hover:text-stone-900'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onViewFullDetails(product);
                }}
                className="w-full py-2.5 text-xs text-stone-700 hover:text-stone-950 font-medium flex items-center justify-center gap-1.5 hover:bg-stone-50 rounded"
              >
                <span>View Full Specifications &amp; Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
