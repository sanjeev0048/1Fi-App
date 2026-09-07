import React, { useState, useEffect, useMemo } from 'react';
import {
  Search, Filter, ChevronLeft, ChevronRight, Check, Star, ShieldCheck,
  Zap, ArrowRight, RefreshCw, X, ShoppingBag, Store, Award, Info,
  TrendingDown, Percent, CreditCard, ChevronDown, SlidersHorizontal, Sparkles
} from 'lucide-react';
import './animations.css';
// ==========================================
// 1. MOCK DATA & SERVICE LAYER (API Ready)
// ==========================================

const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'laptops', name: 'Laptops & PCs', icon: 'Laptop' },
  { id: 'mobiles', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'audio', name: 'Audio & Sound', icon: 'Headphones' },
  { id: 'wearables', name: 'Smartwatches', icon: 'Watch' },
  { id: 'appliances', name: 'Smart Appliances', icon: 'Tv' },
];

const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apple MacBook Pro 14" M3 Pro',
    category: 'laptops',
    shortDesc: 'Supercharged for pros with M3 Pro chip, 18GB RAM & 512GB SSD.',
    fullDesc: 'The 14-inch MacBook Pro with M3 Pro takes power and efficiency further than ever. Featuring exceptional battery life, a stunning Liquid Retina XDR display, and an array of pro ports, this is the ultimate pro laptop.',
    price: 189900,
    mrp: 199900,
    rating: 4.9,
    reviewsCount: 328,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    variants: {
      color: ['Space Black', 'Silver'],
      storage: ['512GB SSD', '1TB SSD', '2TB SSD']
    },
    specs: [
      { label: 'Processor', value: 'Apple M3 Pro chip (11-core CPU, 14-core GPU)' },
      { label: 'RAM', value: '18GB Unified Memory' },
      { label: 'Display', value: '14.2-inch Liquid Retina XDR (3024 x 1964)' },
      { label: 'Battery Life', value: 'Up to 18 hours video playback' },
      { label: 'Warranty', value: '1 Year Apple Official Warranty + 1Fi Care' }
    ],
    emiPlans: [
      { id: 'emi-6', durationMonths: 6, monthlyAmount: 31650, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-12', durationMonths: 12, monthlyAmount: 16290, totalInterest: 5580, interestRate: '5.5%', downPayment: 0, processingFee: 499 },
      { id: 'emi-18', durationMonths: 18, monthlyAmount: 11190, totalInterest: 11520, interestRate: '7.2%', downPayment: 0, processingFee: 999 },
      { id: 'emi-24', durationMonths: 24, monthlyAmount: 8690, totalInterest: 18660, interestRate: '8.5%', downPayment: 0, processingFee: 1299 }
    ]
  },
  {
    id: 'prod-2',
    name: 'iPhone 16 Pro Max 256GB',
    category: 'mobiles',
    shortDesc: 'Titanium design with A18 Pro chip, Camera Control & peak battery.',
    fullDesc: 'iPhone 16 Pro Max. Crafted with Grade 5 Titanium for incredible strength and lightweight feel. Features groundbreaking Camera Control button, 4K 120 fps Dolby Vision recording, and revolutionary battery life.',
    price: 144900,
    mrp: 149900,
    rating: 4.8,
    reviewsCount: 512,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ],
    variants: {
      color: ['Natural Titanium', 'Desert Titanium', 'Black Titanium', 'White Titanium'],
      storage: ['256GB', '512GB', '1TB']
    },
    specs: [
      { label: 'Display', value: '6.9-inch Super Retina XDR OLED ProMotion' },
      { label: 'Chipset', value: 'A18 Pro Bionic with 6-core GPU' },
      { label: 'Camera', value: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto' },
      { label: 'Build', value: 'Titanium with Ceramic Shield front' }
    ],
    emiPlans: [
      { id: 'emi-6', durationMonths: 6, monthlyAmount: 24150, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-12', durationMonths: 12, monthlyAmount: 12420, totalInterest: 4140, interestRate: '5.0%', downPayment: 0, processingFee: 499 },
      { id: 'emi-18', durationMonths: 18, monthlyAmount: 8530, totalInterest: 8640, interestRate: '6.8%', downPayment: 0, processingFee: 799 },
      { id: 'emi-24', durationMonths: 24, monthlyAmount: 6620, totalInterest: 13980, interestRate: '8.0%', downPayment: 0, processingFee: 999 }
    ]
  },
  {
    id: 'prod-3',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    category: 'audio',
    shortDesc: 'Industry-leading noise canceling with 8 microphones & Auto NC Optimizer.',
    fullDesc: 'Rewrite the rules of distraction-free listening. Magnificent sound engineered to perfection with HD Noise Canceling Processor QN1. Up to 30 hours battery with super fast charging.',
    price: 29990,
    mrp: 34990,
    rating: 4.7,
    reviewsCount: 189,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    variants: {
      color: ['Black', 'Silver', 'Midnight Blue']
    },
    specs: [
      { label: 'Type', value: 'Over-Ear Wireless Bluetooth 5.2' },
      { label: 'Battery', value: '30 hours (NC ON), 3-min charge = 3 hrs' },
      { label: 'Weight', value: '250g Ultra-lightweight' }
    ],
    emiPlans: [
      { id: 'emi-3', durationMonths: 3, monthlyAmount: 9996, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-6', durationMonths: 6, monthlyAmount: 4998, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-12', durationMonths: 12, monthlyAmount: 2580, totalInterest: 970, interestRate: '4.8%', downPayment: 0, processingFee: 199 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy Watch 6 Classic 47mm',
    category: 'wearables',
    shortDesc: 'Rotating bezel, personalized HR zones, sleep coaching & ECG sensor.',
    fullDesc: 'Refined classic design meets next-gen health monitoring. Track body composition, ECG, blood pressure, and advanced sleep insights directly from your wrist.',
    price: 36999,
    mrp: 42999,
    rating: 4.6,
    reviewsCount: 94,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    variants: {
      color: ['Black', 'Silver'],
      connectivity: ['Bluetooth', 'LTE / 4G']
    },
    specs: [
      { label: 'Display', value: '1.5-inch Sapphire Crystal Super AMOLED' },
      { label: 'Sensors', value: 'BioActive Sensor, Temperature, ECG, BIA' },
      { label: 'Water Resistance', value: '5ATM + IP68 / MIL-STD-810H' }
    ],
    emiPlans: [
      { id: 'emi-3', durationMonths: 3, monthlyAmount: 12333, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-6', durationMonths: 6, monthlyAmount: 6166, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-12', durationMonths: 12, monthlyAmount: 3180, totalInterest: 1160, interestRate: '5.2%', downPayment: 0, processingFee: 299 }
    ]
  },
  {
    id: 'prod-5',
    name: 'LG C3 55" 4K Smart OLED TV',
    category: 'appliances',
    shortDesc: 'Self-lit OLED pixels, α9 AI Processor Gen6, Dolby Vision IQ & Gaming 120Hz.',
    fullDesc: 'Experience unmatched contrast and vivid picture detail with LG C3 OLED. Equipped with webOS 23, Nvidia G-Sync support for zero-lag gaming, and immersive spatial audio.',
    price: 119990,
    mrp: 169990,
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'
    ],
    variants: {
      screenSize: ['55 Inch', '65 Inch', '77 Inch']
    },
    specs: [
      { label: 'Display Type', value: '4K Ultra HD Self-Lit OLED' },
      { label: 'Refresh Rate', value: '120Hz Native / VRR support' },
      { label: 'Sound Output', value: '40W 2.2 Channel Dolby Atmos' }
    ],
    emiPlans: [
      { id: 'emi-6', durationMonths: 6, monthlyAmount: 19998, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-12', durationMonths: 12, monthlyAmount: 10290, totalInterest: 3490, interestRate: '4.9%', downPayment: 0, processingFee: 499 },
      { id: 'emi-18', durationMonths: 18, monthlyAmount: 7090, totalInterest: 7630, interestRate: '6.5%', downPayment: 0, processingFee: 799 },
      { id: 'emi-24', durationMonths: 24, monthlyAmount: 5490, totalInterest: 11770, interestRate: '7.8%', downPayment: 0, processingFee: 999 }
    ]
  },
  {
    id: 'prod-6',
    name: 'iPad Air 11" M2 128GB Wi-Fi',
    category: 'laptops',
    shortDesc: 'Freshly redesigned with M2 chip, Liquid Retina Display & Pencil Pro support.',
    fullDesc: 'iPad Air is powered by the fast M2 chip. It features a brilliant Liquid Retina display, landscape front camera perfect for Center Stage FaceTime calls, and superfast Wi-Fi 6E.',
    price: 59900,
    mrp: 64900,
    rating: 4.8,
    reviewsCount: 215,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    ],
    variants: {
      color: ['Space Grey', 'Starlight', 'Purple', 'Blue'],
      storage: ['128GB', '256GB', '512GB']
    },
    specs: [
      { label: 'Processor', value: 'Apple M2 Chip (8-core CPU, 10-core GPU)' },
      { label: 'Screen Size', value: '11-inch Liquid Retina Display' },
      { label: 'Security', value: 'Touch ID integrated in Top Button' }
    ],
    emiPlans: [
      { id: 'emi-6', durationMonths: 6, monthlyAmount: 9983, totalInterest: 0, interestRate: '0%', downPayment: 0, processingFee: 0 },
      { id: 'emi-12', durationMonths: 12, monthlyAmount: 5140, totalInterest: 1780, interestRate: '5.1%', downPayment: 0, processingFee: 299 },
      { id: 'emi-18', durationMonths: 18, monthlyAmount: 3540, totalInterest: 3820, interestRate: '6.9%', downPayment: 0, processingFee: 499 }
    ]
  }
];

// Asynchronous Service Abstraction
const productService = {
  fetchProducts: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...MOCK_PRODUCTS];

        if (filters.category && filters.category !== 'all') {
          results = results.filter(p => p.category === filters.category);
        }

        if (filters.search) {
          const query = filters.search.toLowerCase().trim();
          results = results.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.shortDesc.toLowerCase().includes(query)
          );
        }

        if (filters.sortBy) {
          if (filters.sortBy === 'price-low') {
            results.sort((a, b) => a.price - b.price);
          } else if (filters.sortBy === 'price-high') {
            results.sort((a, b) => b.price - a.price);
          } else if (filters.sortBy === 'rating') {
            results.sort((a, b) => b.rating - a.rating);
          }
        }

        resolve(results);
      }, 350); // Simulated network delay
    });
  },

  getProductById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = MOCK_PRODUCTS.find(p => p.id === id);
        resolve(found || null);
      }, 200);
    });
  }
};

// Formatter Helpers
const formatINR = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

// ==========================================
// 2. REUSABLE ATOMIC UI COMPONENTS
// ==========================================

const PrimaryButton = ({ children, onClick, disabled = false, loading = false, className = '', fullWidth = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative inline-flex items-center justify-center font-semibold text-sm rounded-xl px-5 py-3.5 transition-all duration-200 active:scale-95
        ${disabled ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30'}
        ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
          <span>Processing...</span>
        </span>
      ) : children}
    </button>
  );
};

const Badge = ({ children, variant = 'green' }) => {
  const styles = {
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${styles[variant] || styles.green}`}>
      {children}
    </span>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <div key={n} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 animate-pulse">
        <div className="w-full h-48 bg-slate-800/80 rounded-xl mb-4" />
        <div className="h-4 bg-slate-800/80 rounded w-3/4 mb-2" />
        <div className="h-3 bg-slate-800/80 rounded w-1/2 mb-4" />
        <div className="h-10 bg-slate-800/80 rounded-xl w-full" />
      </div>
    ))}
  </div>
);

const EmptyState = ({ title = 'No products found', message = 'Try adjusting your search query or filters.', onReset }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-slate-900/40 rounded-3xl border border-slate-800/60">
    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400 mb-4 shadow-inner">
      <Search className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-semibold text-slate-100 mb-1">{title}</h3>
    <p className="text-slate-400 text-sm max-w-sm mb-6">{message}</p>
    {onReset && (
      <button
        onClick={onReset}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
      >
        Clear All Filters
      </button>
    )}
  </div>
);

// ==========================================
// 3. MAIN SHOP TOP TABS BAR
// ==========================================

const ShopTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'brands', label: 'Top Brands', badge: '50+ Brands' },
    { id: 'stores', label: 'Nearby Stores', badge: '12 Near You' },
    { id: 'marketplace', label: '1Fi Marketplace', badge: 'Zero Down Payment' },
  ];

  return (
    <div className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-[52px] z-30 px-4 pt-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                ${isActive
                  ? 'text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'}`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                  ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 4. MARKETPLACE SUB-COMPONENTS
// ==========================================

const MarketplaceHeader = () => (
  <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/30 rounded-2xl p-6 sm:p-8 border border-slate-800/80 mb-6 relative overflow-hidden animate-fade-in">
    <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10 max-w-2xl">
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Instant EMI Approval Up to ₹5,00,000</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
        1Fi Marketplace
      </h1>
      <p className="text-slate-400 text-sm leading-relaxed">
        Shop premium electronics, gadgets, and home appliances with 0% interest EMI options, flexible tenure, and zero hidden processing charges.
      </p>
    </div>
  </div>
);

const SearchAndFilters = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy }) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Search Input & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laptops, smartphones, headphones..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-emerald-500/60 appearance-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
        {MOCK_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap
                ${isActive
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onSelect }) => {
  const lowestEmi = useMemo(() => {
    if (!product.emiPlans || product.emiPlans.length === 0) return null;
    return product.emiPlans.reduce((min, plan) => plan.monthlyAmount < min.monthlyAmount ? plan : min, product.emiPlans[0]);
  }, [product]);

  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/20 hover:-translate-y-0.5 cursor-pointer relative animate-fade-in-up"
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative w-full h-48 bg-slate-950/80 rounded-xl overflow-hidden mb-3 border border-slate-800/40 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-300">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {product.isFeatured && (
            <div className="absolute top-2 left-2">
              <Badge variant="purple">1Fi Best Choice</Badge>
            </div>
          )}
          {discountPct > 0 && (
            <div className="absolute top-2 right-2 bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md">
              {discountPct}% OFF
            </div>
          )}
        </div>

        {/* Product Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {product.shortDesc}
        </p>

        <div className="flex items-center gap-1 text-xs text-amber-400 mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="font-semibold text-slate-200">{product.rating}</span>
          <span className="text-slate-500 text-[11px]">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Pricing & EMI Highlight Footer */}
      <div className="pt-3 border-t border-slate-800/60">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base font-extrabold text-white">
            {formatINR(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-xs text-slate-500 line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>

        {lowestEmi && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Starting EMI</div>
              <div className="text-xs font-bold text-emerald-400">
                {formatINR(lowestEmi.monthlyAmount)} <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-md">
              {lowestEmi.durationMonths} Months
            </span>
          </div>
        )}

        <button className="w-full py-2.5 px-3 bg-slate-800 group-hover:bg-emerald-500 text-slate-200 group-hover:text-slate-950 text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5">
          <span>View EMI Options</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. PRODUCT DETAILS SCREEN & EMI SELECTOR
// ==========================================

const ProductDetailsScreen = ({ product, onBack, onProceedToCheckout }) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);
  const [selectedVariantColor, setSelectedVariantColor] = useState(product.variants?.color?.[0] || null);
  const [selectedVariantStorage, setSelectedVariantStorage] = useState(product.variants?.storage?.[0] || null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(product.emiPlans?.[0] || null);

  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="space-y-6 pb-24 animate-slide-fade-in">
      {/* Top Navigation Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
        <span className="text-xs text-slate-500 font-mono">ID: {product.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery & Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <div className="w-full h-72 sm:h-96 bg-slate-950 rounded-xl overflow-hidden mb-3 border border-slate-800/60 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
              />
            </div>
            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0
                      ${selectedImage === imgUrl ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Technical Specifications</span>
            </h3>
            <div className="space-y-3">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-none gap-1">
                  <span className="text-slate-400 font-medium">{spec.label}</span>
                  <span className="text-slate-200 font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Title, Variants & EMI Options */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="green">In Stock & EMI Ready</Badge>
              {discountPct > 0 && <Badge variant="amber">{discountPct}% Price Savings</Badge>}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
              {product.fullDesc}
            </p>

            <div className="flex items-baseline gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-2xl font-black text-white">{formatINR(product.price)}</span>
              {product.mrp > product.price && (
                <span className="text-sm text-slate-500 line-through">{formatINR(product.mrp)}</span>
              )}
              <span className="text-xs text-slate-400 ml-auto">Inclusive of all taxes</span>
            </div>
          </div>

          {/* Variants Selection */}
          {product.variants && (
            <div className="space-y-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
              {product.variants.color && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-2 block">
                    Select Finish / Color: <span className="text-emerald-400">{selectedVariantColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.color.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedVariantColor(color)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all
                          ${selectedVariantColor === color
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.variants.storage && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-2 block">
                    Select Memory Config: <span className="text-emerald-400">{selectedVariantStorage}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.storage.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => setSelectedVariantStorage(storage)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all
                          ${selectedVariantStorage === storage
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EMI Selection Container */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Select EMI Plan</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                1Fi Pre-Approved
              </span>
            </div>

            <div className="space-y-3">
              {product.emiPlans.map((plan) => {
                const isSelected = selectedEmiPlan?.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedEmiPlan(plan)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative flex items-center justify-between
                      ${isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all
                        ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600 bg-slate-800'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 font-black" />}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-white flex items-center gap-2">
                          <span>{formatINR(plan.monthlyAmount)}</span>
                          <span className="text-xs font-normal text-slate-400">/ month</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Tenure: <span className="text-slate-200 font-semibold">{plan.durationMonths} Months</span>
                          {plan.interestRate === '0%' && (
                            <span className="ml-2 text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              0% Interest
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400 font-medium">Interest: {plan.interestRate}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Proc Fee: {plan.processingFee === 0 ? 'FREE' : formatINR(plan.processingFee)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EMI Summary Calculation Box */}
          {selectedEmiPlan && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-200 mb-2 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Selected Payment Plan Summary</span>
                <span className="text-emerald-400 font-mono">{selectedEmiPlan.durationMonths} Months Plan</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monthly Installment</span>
                <span className="text-slate-200 font-semibold">{formatINR(selectedEmiPlan.monthlyAmount)} x {selectedEmiPlan.durationMonths}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Down Payment Required</span>
                <span className="text-emerald-400 font-bold">₹0 (Zero Down Payment)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Payable Amount</span>
                <span className="text-slate-200 font-semibold">
                  {formatINR(selectedEmiPlan.monthlyAmount * selectedEmiPlan.durationMonths + selectedEmiPlan.processingFee)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar for Mobile/Desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-4 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-xs text-slate-400">Monthly EMI Payable</div>
            <div className="text-lg font-black text-white">
              {selectedEmiPlan ? `${formatINR(selectedEmiPlan.monthlyAmount)}/mo` : 'Select a plan'}
            </div>
          </div>

          <PrimaryButton
            fullWidth
            onClick={() => onProceedToCheckout(product, selectedEmiPlan, { color: selectedVariantColor, storage: selectedVariantStorage })}
            disabled={!selectedEmiPlan}
            className="sm:w-auto min-w-[240px]"
          >
            <span>Proceed with EMI</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. CHECKOUT / LOAN CONFIRMATION MODAL
// ==========================================

const CheckoutModal = ({ isOpen, onClose, product, plan, variant }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !product || !plan) return null;

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 relative shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-lg bg-slate-800/50"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">1Fi Instant Credit Checkout</h3>
                <p className="text-xs text-slate-400">Review your finance agreement details</p>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 mb-5 space-y-3">
              <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400">Item</span>
                <span className="text-slate-200 font-semibold text-right max-w-[200px] truncate">{product.name}</span>
              </div>
              {variant?.color && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Selected Color</span>
                  <span className="text-slate-200 font-medium">{variant.color}</span>
                </div>
              )}
              {variant?.storage && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Configuration</span>
                  <span className="text-slate-200 font-medium">{variant.storage}</span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Monthly Installment</span>
                <span className="text-emerald-400 font-bold">{formatINR(plan.monthlyAmount)} / mo</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tenure</span>
                <span className="text-slate-200 font-semibold">{plan.durationMonths} Months</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Interest Rate</span>
                <span className="text-slate-200 font-semibold">{plan.interestRate}</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-bold">Down Payment</span>
                <span className="text-emerald-400 font-bold">₹0</span>
              </div>
            </div>

            <PrimaryButton
              fullWidth
              loading={loading}
              onClick={handleConfirm}
            >
              Confirm Loan & Order
            </PrimaryButton>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Your 1Fi EMI application for <span className="text-white font-semibold">{product.name}</span> has been approved instantly.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Done & Return to Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 7. PLACEHOLDER VIEWS FOR OTHER TABS
// ==========================================

const PlaceholderTab = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-900/30 rounded-3xl border border-slate-800/50 my-6">
    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
      {description}
    </p>
    <div className="mt-6 inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300">
      <span>Coming Soon in Next Update</span>
    </div>
  </div>
);

// ==========================================
// 8. MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [checkoutData, setCheckoutData] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load products based on filter changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    productService.fetchProducts({
      category: selectedCategory,
      search: searchQuery,
      sortBy: sortBy
    }).then((data) => {
      if (isMounted) {
        setProducts(data);
        setIsLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [selectedCategory, searchQuery, sortBy]);

  const handleProductSelect = (prod) => {
    setSelectedProduct(prod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setSelectedProduct(null);
  };

  const handleProceedToCheckout = (product, plan, variant) => {
    setCheckoutData({ product, plan, variant });
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* 1Fi Application Header / Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
            1Fi
          </div>
          <div>
            <div className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>1Fi App</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Smart Financial Super App</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Approved Limit:</span>
            <span className="text-white font-bold">₹2,50,000</span>
          </div>
        </div>
      </header>

      {/* Main Shop Tabs Navigation */}
      <ShopTabs activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setSelectedProduct(null);
      }} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: TOP BRANDS (Placeholder) */}
        {activeTab === 'brands' && (
          <PlaceholderTab
            title="Top Brands Directory"
            description="Explore direct-from-brand EMI tie-ups with Apple, Samsung, Sony, Dell, LG and over 50+ premium electronics partners."
            icon={Award}
          />
        )}

        {/* TAB 2: NEARBY STORES (Placeholder) */}
        {activeTab === 'stores' && (
          <PlaceholderTab
            title="Nearby Partner Stores"
            description="Find offline retail stores near your location offering 1Fi instant QR checkout and zero down payment financing."
            icon={Store}
          />
        )}

        {/* TAB 3: 1FI MARKETPLACE (Fully Implemented) */}
        {activeTab === 'marketplace' && (
          <div>
            {!selectedProduct ? (
              <>
                <MarketplaceHeader />

                <SearchAndFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

                {/* Product Grid / Skeleton / Empty State */}
                {isLoading ? (
                  <LoadingSkeleton />
                ) : products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={handleProductSelect}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    onReset={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSortBy('featured');
                    }}
                  />
                )}
              </>
            ) : (
              <ProductDetailsScreen
                product={selectedProduct}
                onBack={handleBackToGrid}
                onProceedToCheckout={handleProceedToCheckout}
              />
            )}
          </div>
        )}
      </main>

      {/* Checkout Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        product={checkoutData?.product}
        plan={checkoutData?.plan}
        variant={checkoutData?.variant}
      />
    </div>
  );
}
