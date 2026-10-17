import { Product, Lookbook, Review, Order } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Sylvan Travertine Coffee Table',
    subtitle: 'Honed Roman Travertine with Soft Chamfered Edge',
    designer: 'Studio Ilse & Soren',
    category: 'Tables',
    price: 1840,
    originalPrice: 2100,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    isBestseller: true,
    material: 'Natural Italian Travertine & Solid Ash Base',
    origin: 'Tivoli, Italy',
    dimensions: '120cm W x 70cm D x 36cm H',
    weight: '58 kg',
    description: 'An architectural centerpiece carved from a single slab of Roman travertine. Each table reveals natural mineral veins, cavities, and subtle color gradations celebrating ancient geologic history.',
    provenance: 'Quarried sustainably in Tivoli and hand-finished with an organic matte sealant by second-generation stone artisans.',
    images: [
      'https://images.unsplash.com/photo-1533779283484-84e14e914586?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Warm Alabaster', hex: '#E6DFD5', imageIndex: 0 },
      { name: 'Oatmeal Vein', hex: '#D2C7B7', imageIndex: 1 },
      { name: 'Smoked Charcoal Stone', hex: '#4A4744', imageIndex: 2 }
    ],
    sizes: ['Standard (120x70cm)', 'Grand (150x85cm)'],
    features: [
      'Solid vein-cut Italian travertine slab',
      'Hand-chamfered eased edges for tactile softness',
      'Matte breathable water-resistant impregnator seal',
      'Felt-padded acoustic footing for hardwood preservation'
    ]
  },
  {
    id: 'prod-2',
    name: 'Kanso Low Lounge Chair',
    subtitle: 'Sculptural Solid Smoked Oak & Belgian Wool Bouclé',
    designer: 'Morten Kaasgaard',
    category: 'Seating',
    price: 1420,
    rating: 4.95,
    reviewCount: 38,
    inStock: true,
    isNew: true,
    material: 'FSC-Certified Smoked White Oak & Heavy Bouclé',
    origin: 'Aarhus, Denmark',
    dimensions: '78cm W x 82cm D x 74cm H (Seat: 40cm)',
    weight: '24 kg',
    description: 'A contemplative low-slung chair inspired by Japanese joinery and mid-century Scandinavian proportions. The sculpted oak backrest cradles the lumbar naturally, paired with textured wool upholstery.',
    provenance: 'Crafted from slow-growth Danish oak seasoned over 18 months, assembled using traditional mortise-and-tenon joints with zero visible screws.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Ecru Bouclé', hex: '#EDE8E1', imageIndex: 0 },
      { name: 'Caramel Shearling', hex: '#B88257', imageIndex: 1 },
      { name: 'Umber Slub', hex: '#3E342B', imageIndex: 2 }
    ],
    sizes: ['Standard Lounge', 'Extended Footstool Edition'],
    features: [
      'Mortise and tenon joinery without mechanical fasteners',
      '100% Belgian wool bouclé with 80,000 Martindale rub count',
      'High-resilience foam core with ethically sourced feather topper',
      'Hand-applied organic beeswax finish'
    ]
  },
  {
    id: 'prod-3',
    name: 'Akari Column Paper Floor Lamp',
    subtitle: 'Handmade Mulberry Washi Paper & Solid Brass Spindle',
    designer: 'Kenzo Tange Studio',
    category: 'Lighting',
    price: 680,
    originalPrice: 750,
    rating: 4.88,
    reviewCount: 64,
    inStock: true,
    isBestseller: true,
    material: 'Echizen Washi Paper, Bamboo Ribbing & Unlacquered Brass',
    origin: 'Fukui Prefecture, Japan',
    dimensions: '34cm Diameter x 138cm H',
    weight: '6.2 kg',
    description: 'Transforming electric light into soft solar warmth through pleated washi paper. The subtle bamboo ribs cast organic linear shadows, elevating bedrooms and living alcoves with ambient stillness.',
    provenance: 'Made in an artisan workshop that has produced Echizen paper since 1888, using wild kozo mulberry bark boiled in mountain spring water.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Natural Washi', hex: '#FAF6ED', imageIndex: 0 },
      { name: 'Warm Amber Raw', hex: '#F0E2C8', imageIndex: 1 },
      { name: 'Muted Taupe Washi', hex: '#DBD2C4', imageIndex: 2 }
    ],
    features: [
      'Warm LED system (2200K - 2700K sunset hue transition)',
      'Smooth rotary tactile dimmer dial on weighted brass base',
      'Braided cotton cable with brass switch plug',
      'Includes custom protective transport canister'
    ]
  },
  {
    id: 'prod-4',
    name: 'Vessel No. 04 Fluted Amphora',
    subtitle: 'Coarse Sand Stoneware with Matte Chalk Glaze',
    designer: 'Atelier Oona',
    category: 'Ceramics',
    price: 290,
    rating: 4.92,
    reviewCount: 29,
    inStock: true,
    material: 'Iron-Rich Coarse Stoneware Clay',
    origin: 'Gotland, Sweden',
    dimensions: '26cm Diameter x 42cm H',
    weight: '4.8 kg',
    description: 'A monolithic stoneware silhouette shaped on a slow wheel. The rhythmic vertical ribbing catches natural daylight across the day, creating an ever-changing tactile shadow play.',
    provenance: 'Hand-thrown on a manual kick wheel using Swedish clay, wood-fired for 48 hours to create spontaneous mineral speckling.',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Raw Chalk', hex: '#ECE8DF', imageIndex: 0 },
      { name: 'Volcanic Ash', hex: '#585552', imageIndex: 1 },
      { name: 'Terracotta Earth', hex: '#B86F51', imageIndex: 2 }
    ],
    features: [
      'Watertight glazed interior for fresh floral arrangements',
      'Unglazed exterior with tactile raw earth tooth',
      'Individually numbered and stamped on underside base'
    ]
  },
  {
    id: 'prod-5',
    name: 'Helios Monolithic Fluted Pendant',
    subtitle: 'Cast Terracotta & Matte Black Anodized Aluminum',
    designer: 'Lukas Weisz',
    category: 'Lighting',
    price: 520,
    rating: 4.86,
    reviewCount: 19,
    inStock: true,
    isNew: true,
    material: 'Cast Terracotta & Architectural Anodized Aluminum',
    origin: 'Vienna, Austria',
    dimensions: '44cm Diameter x 28cm H',
    weight: '3.9 kg',
    description: 'A dome pendant featuring an inverted fluted baffle that bounces light downward with zero glare. Ideal above dining counters and sculptural wooden work desks.',
    provenance: 'Precision slip-cast in Austria and fired at 1150°C to achieve a dense, porous matte exterior reminiscent of Roman brickwork.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Ochre Terracotta', hex: '#9E5D42', imageIndex: 0 },
      { name: 'Bone White', hex: '#F2EDE4', imageIndex: 1 }
    ],
    features: [
      '3-meter adjustable fabric-sleeved suspension cord',
      'Includes matching ceiling canopy with concealed fixings',
      'CRI 98 museum-quality color rendering index'
    ]
  },
  {
    id: 'prod-6',
    name: 'Heirloom Waffle Linen Throw & Coverlet',
    subtitle: 'Stone-Washed Normandy Flax with Raw Fringed Hem',
    designer: 'Atelier Textiel',
    category: 'Textiles',
    price: 340,
    rating: 4.96,
    reviewCount: 52,
    inStock: true,
    material: '100% French Normandy Flax (380 gsm)',
    origin: 'Normandy, France',
    dimensions: '220cm x 240cm (Full/Queen/King)',
    weight: '2.1 kg',
    description: 'Heavyweight dimensional waffle weave that breathes in summer and retains gentle body heat in winter. Pre-washed with pumice stone for effortless drapes.',
    provenance: 'Spun from zero-irrigation dew-retted flax in Northern France, dyed with closed-loop eco dyes in Ghent.',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Undyed Flax', hex: '#D6CBB8', imageIndex: 0 },
      { name: 'Slate Moss', hex: '#777A6C', imageIndex: 1 },
      { name: 'Charcoal Wash', hex: '#403E3C', imageIndex: 0 }
    ],
    sizes: ['Throw (150x200cm)', 'King Bed Coverlet (240x260cm)'],
    features: [
      'Naturally hypoallergenic and anti-static',
      'Softens with every wash without pilling',
      'OEKO-TEX Class 1 Certified toxin-free'
    ]
  },
  {
    id: 'prod-7',
    name: 'Arch Totem Sculptural Bookends (Pair)',
    subtitle: 'Cast Solid Bronze with Hand-Chiseled Patina',
    designer: 'Elena Marchesi',
    category: 'Objects',
    price: 380,
    rating: 4.9,
    reviewCount: 16,
    inStock: true,
    material: 'Solid Investment Cast Bronze',
    origin: 'Bologna, Italy',
    dimensions: '14cm W x 8cm D x 22cm H each',
    weight: '7.4 kg total',
    description: 'Weighty architectural arches that honor classical Roman aqueduct curves. Substantial enough to steady heavy art monographs while functioning as standalone shelf sculptures.',
    provenance: 'Cast using the traditional lost-wax process in an art foundry dating back to 1924.',
    images: [
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Aged Verdigris Bronze', hex: '#58675F', imageIndex: 0 },
      { name: 'Burnished Gold Bronze', hex: '#A38852', imageIndex: 1 }
    ],
    features: [
      'Substantial 7.4kg counterweight for oversized art tomes',
      'Non-marking micro-suede under-base pads',
      'Signed certificate of authenticity by the sculptor'
    ]
  },
  {
    id: 'prod-8',
    name: 'Nara Minimalist Oak Dining Bench',
    subtitle: 'Solid Quarter-Sawn White Oak with Finger-Joint Details',
    designer: 'Studio Kanso',
    category: 'Seating',
    price: 940,
    originalPrice: 1100,
    rating: 4.84,
    reviewCount: 22,
    inStock: true,
    material: 'Solid Quarter-Sawn European White Oak',
    origin: 'Kyoto, Japan',
    dimensions: '160cm W x 38cm D x 45cm H',
    weight: '21 kg',
    description: 'A restrained communal bench with gentle continuous radius curves and traditional exposed wooden butterfly dowels that highlight natural wood grain tension.',
    provenance: 'Kiln-dried over 90 days and hand-planed with Japanese kanna planes for a silky non-plastic touch.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80'
    ],
    colors: [
      { name: 'Natural White Oak', hex: '#DBC3A3', imageIndex: 0 },
      { name: 'Smoked Bog Oak', hex: '#3B3632', imageIndex: 1 }
    ],
    sizes: ['140cm (Seats 2-3)', '160cm (Seats 3)', '190cm (Seats 4)'],
    features: [
      'Solid slab construction without veneer',
      'Traditional butterfly key reinforcement',
      'Zero-VOC natural plant oil and carnauba wax seal'
    ]
  }
];

export const LOOKBOOKS: Lookbook[] = [
  {
    id: 'lookbook-1',
    title: 'The Kyoto Courtyard Residence',
    subtitle: 'A serene study in natural light, low seating, and travertine stillness',
    location: 'Higashiyama, Kyoto',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    description: 'Bathed in morning sunlight filtered through cedar louvers, this living salon pairs the Roman travertine table with low-slung bouclé lounge chairs for quiet conversation.',
    hotspots: [
      { id: 'hs-1', productId: 'prod-1', x: 48, y: 64, title: 'Sylvan Travertine Coffee Table', price: 1840 },
      { id: 'hs-2', productId: 'prod-2', x: 28, y: 55, title: 'Kanso Low Lounge Chair', price: 1420 },
      { id: 'hs-3', productId: 'prod-3', x: 82, y: 38, title: 'Akari Column Floor Lamp', price: 680 }
    ]
  },
  {
    id: 'lookbook-2',
    title: 'The Copenhagen Atelier Loft',
    subtitle: 'Harmonizing warm ceramics and architectural lighting in an open studio',
    location: 'Christianshavn, Copenhagen',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    description: 'An expansive industrial brick studio softened by raw linen textiles, hand-thrown clay vessels, and ambient brass pendants.',
    hotspots: [
      { id: 'hs-4', productId: 'prod-4', x: 62, y: 48, title: 'Vessel No. 04 Fluted Amphora', price: 290 },
      { id: 'hs-5', productId: 'prod-5', x: 40, y: 25, title: 'Helios Monolithic Pendant', price: 520 },
      { id: 'hs-6', productId: 'prod-6', x: 74, y: 72, title: 'Heirloom Waffle Linen Throw', price: 340 }
    ]
  },
  {
    id: 'lookbook-3',
    title: 'The Engadin Alpine Pavilion',
    subtitle: 'Textured minimalism high above the Swiss pine timberline',
    location: 'St. Moritz, Switzerland',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    description: 'Floor-to-ceiling glass framing snowclad peaks, anchored internally by raw stone tables, tactile sheepskin, and solid oak joinery.',
    hotspots: [
      { id: 'hs-7', productId: 'prod-1', x: 50, y: 68, title: 'Sylvan Travertine Table', price: 1840 },
      { id: 'hs-8', productId: 'prod-8', x: 22, y: 62, title: 'Nara Oak Dining Bench', price: 940 },
      { id: 'hs-9', productId: 'prod-7', x: 80, y: 52, title: 'Arch Totem Bronze Bookends', price: 380 }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Astrid Lindqvist',
    location: 'Stockholm, Sweden',
    rating: 5,
    date: 'October 4, 2026',
    verified: true,
    comment: 'The travertine table arrived in an exquisite wooden crate. The stone texture is unbelievably rich to touch—cool, velvety, with delicate shell inclusions. Truly heirloom quality that anchors our living room.',
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    author: 'Julian Vance',
    location: 'London, UK',
    rating: 5,
    date: 'September 28, 2026',
    verified: true,
    comment: 'The Kanso lounge chair is astonishingly comfortable despite its low profile. The smoked oak grain is museum level, and the bouclé fabric has just the right tactile depth.',
    helpfulCount: 18
  },
  {
    id: 'rev-3',
    author: 'Mina Takahashi',
    location: 'Tokyo, Japan',
    rating: 5,
    date: 'September 15, 2026',
    verified: true,
    comment: 'The Akari lamp emits the most flattering evening luminescence. It creates a tranquil mood that completely changes how our apartment feels after a long day in the city.',
    helpfulCount: 15
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8921-AT',
    date: 'October 12, 2026',
    status: 'In Transit',
    carrier: 'White Glove Freight Express',
    trackingNumber: 'WG-99201-9401-EU',
    estimatedDelivery: 'Oct 20, 2026',
    items: [
      {
        productId: 'prod-1',
        name: 'Sylvan Travertine Coffee Table',
        price: 1840,
        quantity: 1,
        color: 'Warm Alabaster',
        image: 'https://images.unsplash.com/photo-1533779283484-84e14e914586?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'prod-4',
        name: 'Vessel No. 04 Fluted Amphora',
        price: 290,
        quantity: 1,
        color: 'Raw Chalk',
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 2130,
    shipping: 0,
    discount: 150,
    total: 1980,
    shippingAddress: {
      fullName: 'Aman Sharma',
      street: '448 Strand Promenade, Apt 6B',
      city: 'London',
      state: 'Greater London',
      zip: 'WC2R 0QS'
    }
  },
  {
    id: 'ORD-7614-AT',
    date: 'August 19, 2026',
    status: 'Delivered',
    carrier: 'DHL Climate Neutral',
    trackingNumber: 'DHL-8472-0012-GB',
    estimatedDelivery: 'Aug 24, 2026',
    items: [
      {
        productId: 'prod-3',
        name: 'Akari Column Paper Floor Lamp',
        price: 680,
        quantity: 1,
        color: 'Natural Washi',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 680,
    shipping: 0,
    discount: 0,
    total: 680,
    shippingAddress: {
      fullName: 'Aman Sharma',
      street: '448 Strand Promenade, Apt 6B',
      city: 'London',
      state: 'Greater London',
      zip: 'WC2R 0QS'
    }
  }
];
