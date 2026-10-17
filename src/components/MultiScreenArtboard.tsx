import React, { useState } from 'react';
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Layers, 
  Compass, 
  Grid3X3, 
  Package, 
  User, 
  Smartphone 
} from 'lucide-react';
import { Product, ScreenId, Order, CartItem } from '../types';
import { HomeScreen } from './HomeScreen';
import { ProductDetailScreen } from './ProductDetailScreen';
import { LookbookScreen } from './LookbookScreen';
import { CheckoutScreen } from './CheckoutScreen';
import { ProfileScreen } from './ProfileScreen';

interface MultiScreenArtboardProps {
  products: Product[];
  currentProduct: Product;
  onSelectProduct: (product: Product) => void;
  onSelectScreen: (screen: ScreenId) => void;
  cart: CartItem[];
  onAddToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
  wishlistIds: string[];
  wishlistProducts: Product[];
  onToggleWishlist: (product: Product) => void;
  orders: Order[];
  onQuickView: (product: Product) => void;
}

export const MultiScreenArtboard: React.FC<MultiScreenArtboardProps> = ({
  products,
  currentProduct,
  onSelectProduct,
  onSelectScreen,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  wishlistIds,
  wishlistProducts,
  onToggleWishlist,
  orders,
  onQuickView,
}) => {
  const [zoomScale, setZoomScale] = useState<number>(0.65);

  const screenConfigs: {
    id: ScreenId;
    title: string;
    number: string;
    desc: string;
    component: React.ReactNode;
  }[] = [
    {
      id: 'home',
      title: 'Discovery & Curated Drops',
      number: 'SCREEN 01',
      desc: 'Editorial hero, drop schedule, category tabs, and curated drops grid.',
      component: (
        <HomeScreen
          products={products}
          onSelectProduct={onSelectProduct}
          onSelectScreen={onSelectScreen}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickView={onQuickView}
        />
      ),
    },
    {
      id: 'product-detail',
      title: 'Product Detail & Provenance',
      number: 'SCREEN 02',
      desc: 'Multi-angle image gallery, material swatches, dimensions, and verified reviews.',
      component: (
        <ProductDetailScreen
          product={currentProduct}
          onBack={() => onSelectScreen('home')}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistIds.includes(currentProduct.id)}
          allProducts={products}
          onSelectProduct={onSelectProduct}
          onSelectScreen={onSelectScreen}
        />
      ),
    },
    {
      id: 'lookbook',
      title: 'Spatial Lookbooks & Pins',
      number: 'SCREEN 03',
      desc: 'Interactive architectural interior rooms with pinpoint coordinates and shop-the-space tray.',
      component: (
        <LookbookScreen
          products={products}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          onSelectScreen={onSelectScreen}
        />
      ),
    },
    {
      id: 'checkout',
      title: 'Atelier Bag & Checkout',
      number: 'SCREEN 04',
      desc: 'Multi-step white-glove destination entry, payment credentials, and order calculation.',
      component: (
        <CheckoutScreen
          cart={cart}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onClearCart={onClearCart}
          onOrderPlaced={onOrderPlaced}
          onSelectScreen={onSelectScreen}
        />
      ),
    },
    {
      id: 'profile',
      title: 'Orders, Telemetry & Wishlist',
      number: 'SCREEN 05',
      desc: 'Live delivery stage tracker, registered estates, and saved collector objects.',
      component: (
        <ProfileScreen
          orders={orders}
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          onSelectScreen={onSelectScreen}
        />
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-stone-900 text-stone-100 py-8 px-4 sm:px-6">
      {/* Control Toolbar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-widest font-semibold">
            <Layers className="w-4 h-4" />
            <span>Interactive Artboard Overview</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mt-1">
            5 Multi-Screen Architecture Deck
          </h1>
          <p className="text-xs text-stone-400 font-light mt-0.5">
            Compare all screens simultaneously or click "Open Screen" to enter interactive single-screen mode.
          </p>
        </div>

        {/* Zoom Stepper */}
        <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
          <span className="text-xs text-stone-400">Scale:</span>
          <button
            onClick={() => setZoomScale(Math.max(0.4, zoomScale - 0.1))}
            className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-amber-400 min-w-12 text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            onClick={() => setZoomScale(Math.min(1.0, zoomScale + 0.1))}
            className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-700"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomScale(0.65)}
            className="p-1 rounded text-stone-300 hover:text-white hover:bg-stone-700 ml-1"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screens Gallery Canvas */}
      <div className="overflow-x-auto py-8">
        <div className="flex gap-10 min-w-max pb-12">
          {screenConfigs.map((screen) => (
            <div key={screen.id} className="flex flex-col items-center">
              {/* Screen Metadata Header */}
              <div className="w-[420px] mb-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-amber-400 text-[10px] tracking-wider block font-semibold">
                    {screen.number}
                  </span>
                  <h3 className="font-serif text-base text-white">{screen.title}</h3>
                </div>

                <button
                  onClick={() => onSelectScreen(screen.id)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-amber-700 text-white rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors border border-stone-700 shadow-sm"
                >
                  <span>Open Screen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scaled Screen Container (Simulating Mobile Handset) */}
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'top center',
                  width: '420px',
                  height: '880px',
                }}
                className="bg-stone-950 p-3 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-stone-800 flex flex-col transition-transform duration-200"
              >
                {/* Frame Screen */}
                <div className="w-full h-full bg-[#FAF8F5] text-stone-900 rounded-[38px] overflow-y-auto scrollbar-thin relative flex flex-col">
                  {/* Status Bar */}
                  <div className="h-10 bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between text-[11px] font-semibold text-stone-800 border-b border-stone-200/40">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-stone-950 rounded-full mx-auto" />
                    <span>5G · 100%</span>
                  </div>

                  {/* Render Screen Component */}
                  <div className="flex-1">
                    {screen.component}
                  </div>
                </div>
              </div>

              {/* Screen Description footer */}
              <div className="w-[420px] mt-4 text-[11px] text-stone-400 text-center font-light">
                {screen.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
