import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = query.trim() === ''
    ? products.slice(0, 4)
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.designer.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by object name, material (Travertine, Oak, Brass) or designer..."
            className="flex-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100 flex items-center gap-2 text-xs text-stone-500 overflow-x-auto">
          <span className="font-medium text-stone-700">Quick Searches:</span>
          {['Travertine', 'Smoked Oak', 'Washi Lamp', 'Gotland Stoneware', 'Linen'].map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-white border border-stone-200 rounded text-[11px] text-stone-700 hover:border-stone-400"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto divide-y divide-stone-100">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              No architectural objects matched "{query}". Try "Travertine" or "Lighting".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 px-2 rounded transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border border-stone-200"
                  />
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                      {item.designer} · {item.category}
                    </div>
                    <h4 className="font-serif text-sm text-stone-900 group-hover:text-amber-900">
                      {item.name}
                    </h4>
                    <span className="text-xs text-stone-500">{item.material.split('&')[0]}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-stone-900 block">
                    ${item.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-amber-800 flex items-center gap-0.5 justify-end">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
