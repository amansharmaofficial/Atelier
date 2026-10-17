export interface Product {
  id: string;
  name: string;
  subtitle: string;
  designer: string;
  category: 'Seating' | 'Lighting' | 'Ceramics' | 'Tables' | 'Textiles' | 'Objects';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  material: string;
  origin: string;
  dimensions: string;
  weight: string;
  description: string;
  provenance: string;
  images: string[];
  colors: { name: string; hex: string; imageIndex?: number }[];
  sizes?: string[];
  features: string[];
}

export interface LookbookHotspot {
  id: string;
  productId: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  price: number;
}

export interface Lookbook {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  imageUrl: string;
  description: string;
  hotspots: LookbookHotspot[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'In Production' | 'In Transit' | 'Delivered';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
  helpfulCount: number;
}

export type ScreenId = 'home' | 'product-detail' | 'lookbook' | 'checkout' | 'profile';
export type ViewMode = 'responsive' | 'mobile-device' | 'all-screens';
