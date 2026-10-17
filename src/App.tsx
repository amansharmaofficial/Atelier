import React, { useState } from 'react';
import { Product, ScreenId, ViewMode, CartItem, Order } from './types';
import { PRODUCTS, INITIAL_ORDERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { LookbookScreen } from './components/LookbookScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { DeviceFrame } from './components/DeviceFrame';
import { MultiScreenArtboard } from './components/MultiScreenArtboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Cart state initialized with an item for realistic immediate review
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS[0], // Sylvan Travertine Table
      quantity: 1,
      selectedColor: 'Warm Alabaster',
      selectedSize: 'Standard (120x70cm)',
    },
    {
      id: 'cart-2',
      product: PRODUCTS[2], // Akari Floor Lamp
      quantity: 1,
      selectedColor: 'Natural Washi',
    }
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-2', 'prod-4']);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Cart actions
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      } else {
        return [
          ...prevCart,
          {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            product,
            quantity,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
          },
        ];
      }
    });

    showToast(`Added ${quantity}× ${product.name} to Bag`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Removed piece from Bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Commission ${newOrder.id} successfully recorded!`);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Render individual screen component
  const renderCurrentScreenContent = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onSelectScreen={setCurrentScreen}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => setCurrentScreen('home')}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            allProducts={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onSelectScreen={setCurrentScreen}
          />
        );
      case 'lookbook':
        return (
          <LookbookScreen
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectScreen={setCurrentScreen}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            onSelectScreen={setCurrentScreen}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            orders={orders}
            wishlistProducts={wishlistProducts}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={handleSelectProduct}
            onSelectScreen={setCurrentScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-lg shadow-2xl border border-stone-700 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Brand Navbar with Screen Switcher & View Mode Toggles */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        cartCount={cartItemCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setCurrentScreen('profile')}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Area Based on View Mode */}
      <main className="flex-1">
        {viewMode === 'all-screens' ? (
          /* Artboard Mode: Render all 5 screens concurrently side-by-side */
          <MultiScreenArtboard
            products={PRODUCTS}
            currentProduct={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onSelectScreen={(screen) => {
              setCurrentScreen(screen);
              setViewMode('responsive');
            }}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
            wishlistIds={wishlistIds}
            wishlistProducts={wishlistProducts}
            onToggleWishlist={handleToggleWishlist}
            orders={orders}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ) : viewMode === 'mobile-device' ? (
          /* Mobile Device Frame Simulation */
          <DeviceFrame activeScreenTitle={currentScreen.toUpperCase()}>
            {renderCurrentScreenContent()}
          </DeviceFrame>
        ) : (
          /* Standard Full Responsive Web Application */
          renderCurrentScreenContent()
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartDrawerOpen(false);
          setCurrentScreen('checkout');
        }}
        onSelectScreen={setCurrentScreen}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFullDetails={(p) => {
          handleSelectProduct(p);
        }}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* Visual Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />

      {/* Architectural Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Column 1: Brand & Ethos */}
            <div className="space-y-3">
              <span className="font-serif text-2xl tracking-[0.25em] text-white block">
                ATELIER
              </span>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                An international design studio and curated domestic archive celebrating raw geologic materials, Japanese joinery, and quiet living spaces.
              </p>
              <div className="text-[11px] text-stone-500 pt-2 font-mono">
                Copenhagen · Kyoto · Tivoli
              </div>
            </div>

            {/* Column 2: Architectural Screens */}
            <div className="space-y-3">
              <h4 className="font-serif text-white text-sm">App Screens</h4>
              <ul className="space-y-2 text-stone-400">
                <li>
                  <button onClick={() => setCurrentScreen('home')} className="hover:text-white transition-colors">
                    01. Discovery &amp; Curated Drops
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentScreen('product-detail')} className="hover:text-white transition-colors">
                    02. Product Detail &amp; Provenance
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentScreen('lookbook')} className="hover:text-white transition-colors">
                    03. Spatial Lookbook &amp; Pins
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentScreen('checkout')} className="hover:text-white transition-colors">
                    04. Direct Commission &amp; Checkout
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentScreen('profile')} className="hover:text-white transition-colors">
                    05. Orders Tracking &amp; Wishlist
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Material Disciplines */}
            <div className="space-y-3">
              <h4 className="font-serif text-white text-sm">Disciplines</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Vein-Cut Roman Travertine</li>
                <li>Smoked Danish White Oak</li>
                <li>Echizen Handcrafted Washi</li>
                <li>Gotland Kick-Wheel Stoneware</li>
                <li>Normandy Dew-Retted Flax</li>
              </ul>
            </div>

            {/* Column 4: Client Services */}
            <div className="space-y-3">
              <h4 className="font-serif text-white text-sm">Concierge &amp; Care</h4>
              <ul className="space-y-2 text-stone-400">
                <li>White-Glove In-Home Placement</li>
                <li>Architectural Project CAD Pricing</li>
                <li>60-Day Domestic Trial</li>
                <li>Bespoke Dimension Commissioning</li>
                <li>Authenticity Certificate Dossier</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <div>
              &copy; {new Date().getFullYear()} Atelier Curated Living S.r.l. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Privacy Policy</span>
              <span>Terms of Commission</span>
              <span>White-Glove Protocols</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
