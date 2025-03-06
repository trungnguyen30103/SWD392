export const mockCategories = [
  { value: 'labubu', label: 'Labubu Collection' },
  { value: 'designer', label: 'Designer Toys' },
  { value: 'plush', label: 'Plush Toys' },
  { value: 'blind-box', label: 'Blind Boxes' },
  { value: 'limited', label: 'Limited Editions' },
  { value: 'accessories', label: 'Toy Accessories' },
  { value: 'sets', label: 'Collector Sets' },
  { value: 'mini-figures', label: 'Mini Figures' }
];

export const mockProducts = [
  {
    id: 1001,
    name: "Labubu Classic Edition",
    price: 49.99,
    category: "labubu",
    stock: 15,
    description: "The original Labubu figure in classic pink coloring. Designed by Kasing Lung, this 8-inch figure features the iconic sharp teeth and playful expression that made Labubu famous.",
    image: "https://img.alicdn.com/imgextra/i4/3028217037/O1CN01vvMrzY2BvB9qz3sB7_!!3028217037.jpg",
    featured: true,
    sku: "LAB-001-CLS",
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-04-12T08:30:00Z"
  },
  {
    id: 1002,
    name: "Labubu Halloween Special",
    price: 59.99,
    category: "labubu",
    stock: 8,
    description: "Limited Halloween edition of the popular Labubu figure. Features a spooky orange and black color scheme with glow-in-the-dark teeth. Perfect for collectors and Halloween enthusiasts.",
    image: "https://i.ebayimg.com/images/g/Op4AAOSwJ59jRD3K/s-l1600.png",
    featured: true,
    sku: "LAB-002-HLW",
    weight: 0.48,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-05-15T10:15:00Z"
  },
  {
    id: 1003,
    name: "Labubu Plush Toy",
    price: 34.99,
    category: "plush",
    stock: 45,
    description: "Soft and cuddly version of the popular Labubu character. Made with premium plush material and embroidered details for a huggable alternative to the vinyl figure.",
    image: "https://lzd-img-global.slatic.net/g/p/2eadb11cd24d72ce6e9d9ebc3298e95d.jpg_720x720q80.jpg",
    featured: false,
    sku: "LAB-003-PLH",
    weight: 0.25,
    dimensions: {
      length: 25,
      width: 15,
      height: 10
    },
    ageRecommendation: "3+",
    material: "Polyester Plush",
    created_at: "2023-03-23T15:40:00Z"
  },
  {
    id: 1004,
    name: "Labubu Gold Edition",
    price: 89.95,
    category: "limited",
    stock: 3,
    description: "Extremely rare gold-plated Labubu figure. Limited to 500 pieces worldwide, each with numbered authentication certificate. A must-have for serious Labubu collectors.",
    image: "https://i.ebayimg.com/images/g/1tAAAOSwvydjVCqV/s-l1600.jpg",
    featured: true,
    sku: "LAB-004-GLD",
    weight: 0.6,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "14+",
    material: "Vinyl with Gold Finish",
    created_at: "2023-06-08T09:20:00Z"
  },
  {
    id: 1005,
    name: "Labubu Mini Series - 6 Pack",
    price: 79.99,
    category: "mini-figures",
    stock: 23,
    description: "Collection of six miniature Labubu figures in various colors. Each figure stands 3 inches tall and features the same detailed design as the full-sized version.",
    image: "https://i.ebayimg.com/images/g/G9gAAOSwAFdjg-vQ/s-l1600.jpg",
    featured: true,
    sku: "LAB-005-MIN",
    weight: 0.5,
    dimensions: {
      length: 25,
      width: 20,
      height: 10
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-02-14T11:05:00Z"
  },
  {
    id: 1006,
    name: "Zimomo Space Explorer",
    price: 44.50,
    category: "designer",
    stock: 17,
    description: "Zimomo in an astronaut suit ready for space exploration. This designer toy stands 7 inches tall and features movable arms and a removable helmet.",
    image: "https://ae01.alicdn.com/kf/S775fb2f80f63488dbe042035da6119deI.jpg",
    featured: false,
    sku: "ZIM-001-SPC",
    weight: 0.4,
    dimensions: {
      length: 18,
      width: 12,
      height: 7
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-05-30T16:25:00Z"
  },
  {
    id: 1007,
    name: "Labubu Transparent Edition",
    price: 52.95,
    category: "labubu",
    stock: 9,
    description: "Special clear transparent edition of the Labubu figure. The crystalline appearance gives this Labubu a unique ghostly quality that stands out in any collection.",
    image: "https://i.ebayimg.com/images/g/iYoAAOSwXHtjReAV/s-l1600.jpg",
    featured: false,
    sku: "LAB-007-CLR",
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "8+",
    material: "Clear Vinyl",
    created_at: "2023-01-20T14:10:00Z"
  },
  {
    id: 1008,
    name: "Mystery Blind Box - Monster Series",
    price: 24.99,
    category: "blind-box",
    stock: 5,
    description: "Mystery blind box from the Monster Series. Each box contains one of 12 possible collectible figures. Which one will you get? Includes the possibility of a rare chase figure!",
    image: "https://i.ebayimg.com/images/g/DfIAAOSwsB9jVBRr/s-l1600.jpg",
    featured: false,
    sku: "BLB-008-MNS",
    weight: 0.3,
    dimensions: {
      length: 10,
      width: 10,
      height: 12
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-04-03T13:45:00Z"
  },
  {
    id: 1009,
    name: "Labubu Display Case",
    price: 29.95,
    category: "accessories",
    stock: 0,
    description: "Premium acrylic display case designed specifically for Labubu figures. Protects your collectible from dust and damage while showcasing it beautifully.",
    image: "https://i.ebayimg.com/images/g/l4wAAOSw6aVkJ4M9/s-l1600.jpg",
    featured: false,
    sku: "ACC-009-DSP",
    weight: 0.8,
    dimensions: {
      length: 25,
      width: 15,
      height: 15
    },
    ageRecommendation: "All ages",
    material: "Acrylic",
    created_at: "2023-06-28T17:30:00Z"
  },
  {
    id: 1010,
    name: "Labubu Winter Edition",
    price: 54.50,
    category: "labubu",
    stock: 2,
    description: "Winter-themed Labubu in cool blue and white colors, wearing a tiny knitted scarf. Limited seasonal release perfect for holiday gifting.",
    image: "https://cf.shopee.ph/file/sg-11134201-22110-uw3nbh3oxokve5",
    featured: true,
    sku: "LAB-010-WNT",
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-02-05T12:15:00Z"
  },
  {
    id: 1011,
    name: "Collector's Ultimate Labubu Set",
    price: 199.99,
    category: "sets",
    stock: 7,
    description: "Premium collector's set featuring five exclusive Labubu figures in metallic finishes: gold, silver, bronze, copper, and platinum. Comes in luxury gift packaging with authentication certificate.",
    image: "https://i.ebayimg.com/images/g/67wAAOSwx3Zjwge3/s-l1600.jpg",
    featured: true,
    sku: "LAB-011-ULT",
    weight: 2.5,
    dimensions: {
      length: 40,
      width: 30,
      height: 15
    },
    ageRecommendation: "14+",
    material: "Vinyl with Metallic Finish",
    created_at: "2023-05-10T09:50:00Z"
  },
  {
    id: 1012,
    name: "Labubu Black & White Edition",
    price: 49.95,
    category: "labubu",
    stock: 11,
    description: "Classic monochrome version of Labubu in striking black and white. Perfect for minimalist collectors or as a striking display piece that works with any decor.",
    image: "https://pbs.twimg.com/media/FLch8-WWQAM_TTv.jpg",
    featured: false,
    sku: "LAB-012-BNW",
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-03-12T15:00:00Z"
  },
  {
    id: 1013,
    name: "Labubu DIY Blank Edition",
    price: 39.99,
    category: "designer",
    stock: 24,
    description: "Blank white Labubu figure for customization. Perfect for artists and DIY enthusiasts to create their own unique Labubu designs using acrylic or spray paints.",
    image: "https://i.ebayimg.com/images/g/q3EAAOSw9dRjC1vQ/s-l1600.jpg",
    featured: false,
    sku: "LAB-013-DIY",
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "12+",
    material: "Vinyl",
    created_at: "2023-07-18T11:20:00Z"
  },
  {
    id: 1014,
    name: "Zimomo Flower Fairy",
    price: 44.99,
    category: "designer",
    stock: 14,
    description: "Adorable Zimomo figure dressed as a flower fairy with delicate petal wings and a flowery headpiece. From the Fantasy Series collection.",
    image: "https://cf.shopee.ph/file/sg-11134201-23020-q9krotdgvhnv8f",
    featured: false,
    sku: "ZIM-014-FLR",
    weight: 0.35,
    dimensions: {
      length: 15,
      width: 10,
      height: 18
    },
    ageRecommendation: "8+",
    material: "Vinyl",
    created_at: "2023-06-14T09:15:00Z"
  },
  {
    id: 1015,
    name: "Labubu Mini Keychain Set",
    price: 29.99,
    category: "accessories",
    stock: 38,
    description: "Set of 3 miniature Labubu keychains in red, blue, and green. Each keychain features a 2-inch Labubu figure with metal clasp and ring.",
    image: "https://img.alicdn.com/imgextra/i4/2201233572159/O1CN01wYsJ6o1r1VG2Wrnfp_!!2201233572159.jpg_Q75.jpg_.webp",
    featured: false,
    sku: "LAB-015-KEY",
    weight: 0.15,
    dimensions: {
      length: 12,
      width: 8,
      height: 2
    },
    ageRecommendation: "8+",
    material: "Vinyl with Metal Hardware",
    created_at: "2023-05-05T14:30:00Z"
  },
  {
    id: 1016,
    name: "Labubu Glow-in-the-Dark Edition",
    price: 59.95,
    category: "labubu",
    stock: 6,
    description: "Special edition Labubu that glows an eerie green in the dark. Standard Labubu size and design with phosphorescent material that charges in light and glows for hours.",
    image: "https://img.alicdn.com/imgextra/i2/2211009086290/O1CN01BNXW8Y1sSFXwxRl4u_!!2211009086290.jpg",
    featured: true,
    sku: "LAB-016-GLW",
    weight: 0.45,
    dimensions: {
      length: 20,
      width: 12,
      height: 8
    },
    ageRecommendation: "8+",
    material: "Glow-in-the-Dark Vinyl",
    created_at: "2023-04-22T10:40:00Z"
  }
];

// Helper function to get a product by ID
export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === 'all') return mockProducts;
  return mockProducts.filter(product => product.category === category);
};

// Statistics helpers
export const getProductsStatistics = () => {
  return {
    totalProducts: mockProducts.length,
    inStockProducts: mockProducts.filter(p => p.stock > 0).length,
    lowStockProducts: mockProducts.filter(p => p.stock > 0 && p.stock <= 5).length,
    outOfStockProducts: mockProducts.filter(p => p.stock === 0).length,
    featuredProducts: mockProducts.filter(p => p.featured).length,
    categoryCounts: mockProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {})
  };
};

// Top selling products
export const topSellingProducts = [
  {
    id: 1001,
    name: "Labubu Classic Edition",
    totalSold: 284,
    revenue: 14196.16
  },
  {
    id: 1011,
    name: "Collector's Ultimate Labubu Set",
    totalSold: 98,
    revenue: 19599.02
  },
  {
    id: 1002,
    name: "Labubu Halloween Special",
    totalSold: 176,
    revenue: 10558.24
  },
  {
    id: 1016,
    name: "Labubu Glow-in-the-Dark Edition",
    totalSold: 145,
    revenue: 8692.75
  },
  {
    id: 1010,
    name: "Labubu Winter Edition",
    totalSold: 132,
    revenue: 7194.00
  }
];

// Mock inventory alerts
export const inventoryAlerts = [
  {
    id: 1010,
    name: "Labubu Winter Edition",
    stock: 2,
    threshold: 5,
    status: "critical"
  },
  {
    id: 1004,
    name: "Labubu Gold Edition",
    stock: 3,
    threshold: 5,
    status: "critical"
  },
  {
    id: 1008,
    name: "Mystery Blind Box - Monster Series",
    stock: 5,
    threshold: 10,
    status: "warning"
  },
  {
    id: 1016,
    name: "Labubu Glow-in-the-Dark Edition",
    stock: 6,
    threshold: 10,
    status: "warning"
  },
  {
    id: 1009,
    name: "Labubu Display Case",
    stock: 0,
    threshold: 5,
    status: "out-of-stock"
  }
];
