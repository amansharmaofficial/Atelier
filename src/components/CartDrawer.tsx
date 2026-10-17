import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, ScreenId } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onSelectScreen: (screen: ScreenId) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-stone-900" />
              <h2 className="font-serif text-xl text-stone-900 font-normal">
                Atelier Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded text-stone-500 hover:text-stone-900"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-200">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500">
                  Select pieces from our autumn release to start your collection.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onSelectScreen('home');
                  }}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-medium"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover border border-stone-200"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] uppercase text-stone-500 font-medium">
                      {item.product.designer}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-stone-600">
                      {item.selectedColor}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono font-medium text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="font-mono text-xs font-semibold text-stone-900">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>White-Glove Delivery</span>
                  <span className="text-emerald-700 font-medium">Complimentary</span>
                </div>
                <div className="border-t border-stone-100 pt-2 flex justify-between text-base font-serif text-stone-900">
                  <span>Estimated Total</span>
                  <span className="font-mono font-medium">${subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-stone-900 text-white rounded text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Complimentary white-glove installation included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
