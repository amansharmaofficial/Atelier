import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  Tag, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { CartItem, Order, ScreenId } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
  onSelectScreen: (screen: ScreenId) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  onSelectScreen,
}) => {
  // Form states
  const [formData, setFormData] = useState({
    fullName: 'Aman Sharma',
    email: 'amansharma05664@gmail.com',
    phone: '+44 20 7946 0912',
    street: '448 Strand Promenade, Apt 6B',
    city: 'London',
    state: 'Greater London',
    zip: 'WC2R 0QS',
    deliveryMethod: 'white-glove', // 'white-glove' | 'express'
    paymentMethod: 'card', // 'card' | 'apple-pay'
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = formData.deliveryMethod === 'express' ? 120 : 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const estimatedTax = Math.round((subtotal - discountAmount) * 0.08);
  const total = subtotal - discountAmount + shippingCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'ATELIER15' || clean === 'WELCOME15') {
      setDiscountPercent(15);
      setPromoMessage('15% Private Collector Courtesy Applied');
    } else if (clean === 'OCTOBER') {
      setDiscountPercent(10);
      setPromoMessage('10% Autumn Equinox Courtesy Applied');
    } else {
      setPromoMessage('Invalid invitation code. Try WELCOME15');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-AT`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: 'In Production',
        carrier: formData.deliveryMethod === 'express' ? 'Priority Art Courier' : 'White Glove Freight Express',
        trackingNumber: `WG-${Math.floor(10000 + Math.random() * 90000)}-${formData.zip.replace(/\s+/g, '')}`,
        estimatedDelivery: 'Oct 28, 2026',
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          color: item.selectedColor,
          image: item.product.images[0]
        })),
        subtotal,
        shipping: shippingCost,
        discount: discountAmount,
        total,
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        }
      };

      onOrderPlaced(newOrder);
      setCompletedOrder(newOrder);
      onClearCart();
      setIsProcessing(false);
    }, 1500);
  };

  // If order is completed, show celebratory order receipt screen
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <CheckCircle2 className="w-8 h-8 text-amber-400" />
        </div>

        <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Order Confirmed &amp; Commissioned
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-2">
          Thank you, {completedOrder.shippingAddress.fullName.split(' ')[0]}
        </h1>

        <p className="text-stone-600 text-sm mt-3 max-w-lg mx-auto font-light">
          Your commission <span className="font-mono font-medium text-stone-900">{completedOrder.id}</span> has been transmitted to our master workshops. 
          Our white-glove transport concierge will contact you with specific delivery scheduling windows.
        </p>

        {/* Order Card Preview */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-stone-200 text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs">
            <span className="text-stone-500">Tracking: {completedOrder.trackingNumber}</span>
            <span className="text-emerald-700 font-semibold">{completedOrder.status}</span>
          </div>

          <div className="divide-y divide-stone-100">
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-stone-900 truncate">{item.name}</h4>
                  <div className="text-[11px] text-stone-500">{item.color} · Qty: {item.quantity}</div>
                </div>
                <span className="font-mono text-xs font-medium">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium">
            <span>Total Commission</span>
            <span className="font-mono text-base font-semibold">${completedOrder.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onSelectScreen('profile')}
            className="px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center gap-2"
          >
            <span>View In Order Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectScreen('home')}
            className="px-6 py-3 border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
          >
            Return to Discovery
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-6 text-stone-400">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-3xl text-stone-900">Your Atelier Bag is Empty</h2>
        <p className="text-stone-500 text-sm mt-3 max-w-md mx-auto font-light">
          You haven't selected any architectural pieces yet. Explore our curated autumn catalog or the Kyoto Lookbook to begin.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => onSelectScreen('home')}
            className="px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors"
          >
            Explore Catalog
          </button>
          <button
            onClick={() => onSelectScreen('lookbook')}
            className="px-6 py-3 border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors"
          >
            View Spatial Lookbook
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-[#F7F4EE] border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-800 uppercase tracking-widest font-semibold">
                <span>Direct Commission</span>
                <span aria-hidden="true">·</span>
                <span>Screen 04</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">
                Atelier Bag &amp; Express Checkout
              </h1>
            </div>

            <button
              onClick={() => onSelectScreen('home')}
              className="text-xs text-stone-600 hover:text-stone-950 font-medium flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Browsing</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Form and Summary Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Checkout Multi-step Form */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              
              {/* Step 1: Customer Contact & Delivery Details */}
              <div className="p-6 rounded-lg bg-white border border-stone-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="font-serif text-lg text-stone-900 font-medium flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center">1</span>
                    <span>White-Glove Delivery Destination</span>
                  </h3>
                  <span className="text-xs text-stone-400">All fields required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email For Tracking Updates</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-medium mb-1">Street Address &amp; Suite</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">State / Region</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Postal Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Method */}
              <div className="p-6 rounded-lg bg-white border border-stone-200 space-y-4 shadow-xs">
                <div className="pb-3 border-b border-stone-100">
                  <h3 className="font-serif text-lg text-stone-900 font-medium flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center">2</span>
                    <span>Handling &amp; Placement Method</span>
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'white-glove' })}
                    className={`p-4 rounded border flex items-center justify-between cursor-pointer transition-all ${
                      formData.deliveryMethod === 'white-glove'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-stone-800" />
                      <div>
                        <div className="font-semibold text-stone-900">Complimentary White-Glove Installation</div>
                        <div className="text-stone-500 text-[11px]">Room placement, unpacking, crating removal &amp; leveling</div>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-emerald-700">Free</span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                    className={`p-4 rounded border flex items-center justify-between cursor-pointer transition-all ${
                      formData.deliveryMethod === 'express'
                        ? 'border-stone-900 bg-stone-50/80 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-700" />
                      <div>
                        <div className="font-semibold text-stone-900">Priority Dedicated Art Courier</div>
                        <div className="text-stone-500 text-[11px]">Direct non-stop climate-controlled transit with insured escort</div>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-stone-900">+$120</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="p-6 rounded-lg bg-white border border-stone-200 space-y-4 shadow-xs">
                <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                  <h3 className="font-serif text-lg text-stone-900 font-medium flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-mono flex items-center justify-center">3</span>
                    <span>Encrypted Payment</span>
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <Lock className="w-3 h-3 text-emerald-700" />
                    <span>256-bit TLS</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-3 px-4 rounded border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple-pay' })}
                    className={`py-3 px-4 rounded border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'apple-pay'
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400 bg-stone-50'
                    }`}
                  >
                    <span> Pay Express</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">Security Code (CVC)</label>
                        <input
                          type="text"
                          required
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-70 text-xs font-semibold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Commission...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Authorize Commission · ${total.toLocaleString()} USD</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Items & Pricing Tray */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-lg bg-stone-100/80 border border-stone-200/90 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 text-stone-900">
                <h3 className="font-serif text-lg font-medium">Selected Pieces ({cart.length})</h3>
                <span className="text-xs text-stone-500 font-mono">
                  {cart.reduce((n, i) => n + i.quantity, 0)} items
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-stone-200/60 max-h-[380px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-start">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded object-cover border border-stone-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                        {item.product.designer}
                      </div>
                      <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-stone-600">
                        {item.selectedColor} {item.selectedSize ? `· ${item.selectedSize}` : ''}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 pt-1">
                        <div className="flex items-center border border-stone-300 rounded bg-white text-xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-stone-600 hover:text-stone-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono font-medium text-stone-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-stone-600 hover:text-stone-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-semibold text-stone-900">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Courtesy code (e.g. WELCOME15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded text-xs text-stone-900 uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded text-xs uppercase font-medium hover:bg-stone-800"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 font-medium ${discountPercent > 0 ? 'text-emerald-700' : 'text-stone-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="border-t border-stone-200 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Private Collector Courtesy ({discountPercent}%)</span>
                    <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>White-Glove Delivery</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Estimated VAT &amp; Customs</span>
                  <span className="font-mono">${estimatedTax.toLocaleString()}</span>
                </div>

                <div className="border-t border-stone-200 pt-3 flex justify-between text-stone-900 font-medium text-base">
                  <span>Total</span>
                  <span className="font-mono font-semibold">${total.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-2 text-[11px] text-stone-500 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Insured against transit damage with 100% replacement guarantee.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-700" />
                  <span>Pre-scheduled 2-hour arrival window with courtesy call.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
