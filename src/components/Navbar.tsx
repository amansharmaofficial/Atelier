import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Layers, 
  Smartphone, 
  Monitor, 
  Grid3X3,
  ChevronRight,
  Compass,
  Package,
  User
} from 'lucide-react';
import { ScreenId, ViewMode } from '../types';

interface NavbarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  viewMode,
  onViewModeChange,
}) => {
  const screens: { id: ScreenId; label: string; number: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Discovery Home', number: '01', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'product-detail', label: 'Product Detail', number: '02', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'lookbook', label: 'Lookbook & Hotspots', number: '03', icon: <Grid3X3 className="w-3.5 h-3.5" /> },
    { id: 'checkout', label: 'Cart & Checkout', number: '04', icon: <Package className="w-3.5 h-3.5" /> },
    { id: 'profile', label: 'Orders & Wishlist', number: '05', icon: <User className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Top Utility & Screen Switcher Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-stone-400 font-medium uppercase tracking-wider text-[11px] hidden sm:inline">
            Screens:
          </span>
          <div className="flex items-center gap-1">
            {screens.map((screen) => {
              const isActive = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => onSelectScreen(screen.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-amber-600/90 text-white shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                  title={`Jump to ${screen.label}`}
                >
                  <span className="text-[10px] opacity-75 font-mono">{screen.number}</span>
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Controls: Full Web vs Mobile Mockup vs Artboard */}
        <div className="flex items-center gap-1.5 border-l border-stone-700 pl-3">
          <span className="text-[11px] text-stone-400 hidden md:inline">View Mode:</span>
          <div className="flex items-center gap-0.5 bg-stone-800 p-0.5 rounded">
            <button
              onClick={() => onViewModeChange('responsive')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 px-2 transition-colors ${
                viewMode === 'responsive' ? 'bg-stone-700 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Full responsive desktop web view"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline text-[10px]">Desktop</span>
            </button>
            <button
              onClick={() => onViewModeChange('mobile-device')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 px-2 transition-colors ${
                viewMode === 'mobile-device' ? 'bg-stone-700 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Simulate iPhone 16 Pro device frame"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline text-[10px]">Mobile</span>
            </button>
            <button
              onClick={() => onViewModeChange('all-screens')}
              className={`p-1 rounded text-[11px] flex items-center gap-1 px-2 transition-colors ${
                viewMode === 'all-screens' ? 'bg-amber-700 text-white font-medium' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="View all screens simultaneously in an artboard gallery"
            >
              <Layers className="w-3 h-3" />
              <span className="hidden sm:inline text-[10px]">All Screens</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left Navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs tracking-widest uppercase font-medium text-stone-700">
          <button
            onClick={() => onSelectScreen('home')}
            className={`transition-colors hover:text-stone-900 pb-1 ${
              currentScreen === 'home' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Collections
          </button>
          <button
            onClick={() => onSelectScreen('lookbook')}
            className={`transition-colors hover:text-stone-900 pb-1 ${
              currentScreen === 'lookbook' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Spatial Lookbook
          </button>
          <button
            onClick={() => onSelectScreen('product-detail')}
            className={`transition-colors hover:text-stone-900 pb-1 ${
              currentScreen === 'product-detail' ? 'text-stone-900 border-b-2 border-stone-900 font-semibold' : ''
            }`}
          >
            Featured Object
          </button>
        </nav>

        {/* Center Brand Identity */}
        <div 
          onClick={() => onSelectScreen('home')}
          className="cursor-pointer text-center group flex flex-col items-center"
        >
          <span className="font-serif text-2xl tracking-[0.22em] text-stone-900 font-normal">
            ATELIER
          </span>
          <span className="text-[9px] tracking-[0.35em] text-stone-500 uppercase -mt-0.5">
            Curated Living
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-700 hover:text-stone-950 transition-colors flex items-center gap-1.5 rounded-full hover:bg-stone-100"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4" />
            <span className="text-xs text-stone-500 hidden sm:inline">Search</span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative rounded-full hover:bg-stone-100"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 py-1.5 px-3 bg-stone-900 text-stone-50 hover:bg-stone-800 transition-colors text-xs font-medium rounded-full shadow-sm"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag</span>
            <span className="w-4 h-4 bg-stone-700 text-white text-[10px] rounded-full flex items-center justify-center font-mono">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => onSelectScreen('profile')}
            className="p-1.5 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            title="User Account & Orders"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
