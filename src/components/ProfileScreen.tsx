import React, { useState } from 'react';
import { 
  Package, 
  Heart, 
  MapPin, 
  MessageSquare, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Trash2, 
  ShoppingBag,
  ExternalLink,
  Shield,
  Download
} from 'lucide-react';
import { Order, Product, ScreenId } from '../types';

interface ProfileScreenProps {
  orders: Order[];
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onSelectScreen: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  orders,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  onSelectScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'concierge'>('orders');
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryText.trim()) {
      setInquirySent(true);
      setTimeout(() => {
        setInquiryText('');
        setInquirySubject('');
        setInquirySent(false);
      }, 4000);
    }
  };

  return (
    <div className="w-full pb-24">
      {/* Profile Header */}
      <section className="bg-[#FAF6F0] border-b border-stone-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-18 h-18 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-2xl shadow-md border-2 border-stone-300">
                AS
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-amber-800 uppercase tracking-widest font-semibold">
                  <span>Patron Member</span>
                  <span aria-hidden="true">·</span>
                  <span>Screen 05</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                  Aman Sharma
                </h1>
                <p className="text-xs text-stone-500">
                  Member since 2024 · amansharma05664@gmail.com
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-stone-300 pt-4 md:pt-0 md:pl-8 text-xs text-stone-600">
              <div>
                <span className="block font-mono text-xl font-medium text-stone-900">
                  {orders.length}
                </span>
                <span>Commissions</span>
              </div>
              <div className="w-px h-8 bg-stone-300" />
              <div>
                <span className="block font-mono text-xl font-medium text-stone-900">
                  {wishlistProducts.length}
                </span>
                <span>Saved Objects</span>
              </div>
              <div className="w-px h-8 bg-stone-300" />
              <div>
                <span className="block font-serif text-xl text-stone-900">Tier I</span>
                <span>Collector Courtesy</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-8 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-sm text-xs tracking-wider uppercase font-medium flex items-center gap-2 transition-all ${
                activeTab === 'orders'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Commissions &amp; Tracking ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2 rounded-sm text-xs tracking-wider uppercase font-medium flex items-center gap-2 transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Saved Wishlist ({wishlistProducts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2 rounded-sm text-xs tracking-wider uppercase font-medium flex items-center gap-2 transition-all ${
                activeTab === 'addresses'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Residences &amp; Delivery</span>
            </button>

            <button
              onClick={() => setActiveTab('concierge')}
              className={`px-4 py-2 rounded-sm text-xs tracking-wider uppercase font-medium flex items-center gap-2 transition-all ${
                activeTab === 'concierge'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Curator Concierge</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Tab 1: Orders and Tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-stone-900">
                Commission History &amp; White-Glove Tracking
              </h2>
              <span className="text-xs text-stone-500">
                Updated in real-time with GPS telemetry
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-stone-200 space-y-4">
                <Package className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg text-stone-900">No Historical Commissions</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  When you commission objects from Atelier, you can track production and white-glove delivery here.
                </p>
                <button
                  onClick={() => onSelectScreen('home')}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-medium"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const isDelivered = order.status === 'Delivered';
                const isInTransit = order.status === 'In Transit';
                const isInProduction = order.status === 'In Production' || order.status === 'Processing';

                return (
                  <div key={order.id} className="p-6 rounded-lg bg-white border border-stone-200 space-y-6 shadow-xs">
                    {/* Order Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 text-xs">
                      <div>
                        <div className="font-mono text-sm font-semibold text-stone-900">{order.id}</div>
                        <div className="text-stone-500 text-[11px]">Commissioned on {order.date}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                        <span className="font-mono text-sm font-semibold text-stone-900">
                          ${order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Live Visual Tracker Stepper */}
                    <div className="py-2">
                      <div className="text-xs font-medium text-stone-900 mb-3 flex items-center justify-between">
                        <span>Delivery Telemetry · Carrier: {order.carrier}</span>
                        <span className="font-mono text-stone-600">{order.trackingNumber}</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        {/* Step 1 */}
                        <div className="space-y-1.5">
                          <div className="h-1.5 rounded-full bg-emerald-600 w-full" />
                          <div className="text-[11px] font-semibold text-stone-900">Ordered</div>
                          <div className="text-[10px] text-stone-400">Validated</div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-1.5">
                          <div className={`h-1.5 rounded-full w-full ${
                            isInProduction || isInTransit || isDelivered ? 'bg-emerald-600' : 'bg-stone-200'
                          }`} />
                          <div className="text-[11px] font-semibold text-stone-900">Joinery &amp; Crated</div>
                          <div className="text-[10px] text-stone-400">Workshop</div>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-1.5">
                          <div className={`h-1.5 rounded-full w-full ${
                            isInTransit || isDelivered ? 'bg-emerald-600' : 'bg-stone-200'
                          }`} />
                          <div className="text-[11px] font-semibold text-stone-900">Art Freight</div>
                          <div className="text-[10px] text-stone-400">In Transit</div>
                        </div>

                        {/* Step 4 */}
                        <div className="space-y-1.5">
                          <div className={`h-1.5 rounded-full w-full ${
                            isDelivered ? 'bg-emerald-600' : 'bg-stone-200'
                          }`} />
                          <div className="text-[11px] font-semibold text-stone-900">Installed</div>
                          <div className="text-[10px] text-stone-400">{order.estimatedDelivery}</div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-stone-100 pt-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded object-cover border border-stone-200"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-medium text-stone-900 truncate">
                              {item.name}
                            </h4>
                            <div className="text-xs text-stone-500">
                              {item.color} · Qty: {item.quantity}
                            </div>
                          </div>
                          <div className="font-mono text-xs font-semibold text-stone-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address and Actions */}
                    <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
                      <div>
                        Destination: <span className="text-stone-800 font-medium">{order.shippingAddress.street}, {order.shippingAddress.city}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => alert(`Simulated downloading PDF Bill of Lading & Authenticity Certificate for ${order.id}`)}
                          className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 font-medium"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Provenance Dossier (PDF)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Saved Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-stone-900">
                Curator Wishlist ({wishlistProducts.length})
              </h2>
              <span className="text-xs text-stone-500">
                Objects reserved in your private registry
              </span>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-stone-200 space-y-4">
                <Heart className="w-10 h-10 text-stone-400 mx-auto" />
                <h3 className="font-serif text-lg text-stone-900">Your Registry is Empty</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Click the heart icon on any piece across the Discovery catalog or Lookbooks to save it here.
                </p>
                <button
                  onClick={() => onSelectScreen('home')}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-medium"
                >
                  Browse Pieces
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-lg bg-white border border-stone-200 space-y-3 flex flex-col justify-between"
                  >
                    <div 
                      onClick={() => onSelectProduct(prod)}
                      className="cursor-pointer space-y-3"
                    >
                      <div className="aspect-[4/3] rounded overflow-hidden bg-stone-100">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-[11px] text-stone-500">{prod.designer}</div>
                      <h4 className="font-serif text-base text-stone-900 font-medium">
                        {prod.name}
                      </h4>
                      <div className="font-mono text-sm font-semibold text-stone-900">
                        ${prod.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => onAddToCart(prod)}
                        className="flex-1 py-2 px-3 bg-stone-900 text-white rounded text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(prod)}
                        className="p-2 border border-stone-200 rounded text-stone-400 hover:text-rose-600 hover:border-rose-300"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Residences */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-stone-900">
              Registered Residences &amp; Studios
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-white border-2 border-stone-900 space-y-3 relative">
                <span className="absolute top-4 right-4 text-[10px] bg-stone-900 text-white px-2 py-0.5 uppercase tracking-wider font-medium rounded-sm">
                  Primary Residence
                </span>
                <div className="font-serif text-lg text-stone-900">Strand Loft</div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div>Aman Sharma</div>
                  <div>448 Strand Promenade, Penthouse 6B</div>
                  <div>London, Greater London WC2R 0QS</div>
                  <div>United Kingdom</div>
                  <div className="pt-2 text-stone-500">Service Lift Available · 2.4m Door Clearance</div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-white border border-stone-200 space-y-3">
                <div className="font-serif text-lg text-stone-900">Kyoto Studio Alcove</div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div>Aman Sharma c/o Kanso Studio</div>
                  <div>Higashiyama-ku 12-4</div>
                  <div>Kyoto 605-0862</div>
                  <div>Japan</div>
                  <div className="pt-2 text-stone-500">Traditional tatami mats · Socks-only crew required</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Curator Concierge */}
        {activeTab === 'concierge' && (
          <div className="max-w-2xl bg-white p-8 rounded-lg border border-stone-200 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                Private Advisory
              </span>
              <h2 className="font-serif text-2xl text-stone-900 mt-1">
                Consult With An Architectural Curator
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                Need bespoke travertine dimensions, material sample swatches, or an on-site spatial CAD rendering? 
                Our senior fellows in Copenhagen and Milan respond within 4 business hours.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Subject / Object Reference</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sylvan Travertine Table in 180cm Custom Length"
                  value={inquirySubject}
                  onChange={(e) => setInquirySubject(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Inquiry / Architectural Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your space dimensions, floor surface type, or finish questions..."
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-stone-900 text-white rounded text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
              >
                Send Curator Inquiry
              </button>

              {inquirySent && (
                <p className="text-xs text-emerald-700 font-medium">
                  Your inquiry has been routed to Head Curator Soren Møller. You will receive sample confirmation shortly.
                </p>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
