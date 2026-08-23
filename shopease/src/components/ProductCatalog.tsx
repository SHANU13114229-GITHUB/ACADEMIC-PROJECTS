import { useState, useMemo } from "react";
import { Star, Eye, ShoppingCart, SlidersHorizontal, RefreshCw } from "lucide-react";
import { Product } from "../types";
import { formatCurrency } from "../utils/currency";

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export default function ProductCatalog({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onSelectProduct,
  onAddToCart
}: ProductCatalogProps) {
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false); // Mobile collapsible

  // Filter and Sort calculations
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    if (priceRange !== "all") {
      if (priceRange === "under-50") {
        result = result.filter((p) => p.price < 50);
      } else if (priceRange === "50-100") {
        result = result.filter((p) => p.price >= 50 && p.price <= 100);
      } else if (priceRange === "100-200") {
        result = result.filter((p) => p.price >= 100 && p.price <= 200);
      } else if (priceRange === "over-200") {
        result = result.filter((p) => p.price > 200);
      }
    }

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // "featured" sorting: featured items first, then by rating
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, minRating, sortOption]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange("all");
    setMinRating(0);
    setSortOption("featured");
  };

  return (
    <div id="product-catalog-section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Catalog Title and Sort Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            {selectedCategory === "All" ? "Featured Catalog" : `${selectedCategory}`}
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Showing {filteredProducts.length} items in selection
          </p>
        </div>

        {/* Filters control toggles */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex md:hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <SlidersHorizontal className="h-4 w-4 text-indigo-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-3 py-2 shadow-2xs">
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="text-xs font-bold text-slate-900 outline-none cursor-pointer bg-transparent border-none pr-4"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side Filters Pane (Desktop/Mobile Collapsible) */}
        <aside className={`${showFilters ? "flex" : "hidden"} md:flex w-full md:w-64 bg-white border border-slate-200 p-6 flex-col gap-8 shrink-0 rounded-xl shadow-sm h-fit`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold text-slate-900">Filters</h3>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors uppercase tracking-wider"
            >
              <RefreshCw className="h-3 w-3 animate-spin-hover" />
              <span>Reset</span>
            </button>
          </div>

          {/* Categories Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Categories</h3>
            <ul className="space-y-3">
              {["All", "Electronics", "Fashion", "Home & Living", "Fitness"].map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <li
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm font-semibold cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected 
                        ? "text-indigo-600" 
                        : "text-slate-600 hover:text-indigo-600"
                    }`}
                  >
                    <span>{cat === "All" ? "All Products" : cat}</span>
                    {isSelected && (
                      <span className="text-[10px] bg-indigo-50 px-2 py-0.5 rounded text-indigo-500 font-bold border border-indigo-100 uppercase tracking-wider">
                        active
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price Range Section */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Price Range</h3>
            <div className="space-y-3">
              {[
                { id: "all", label: "All Prices" },
                { id: "under-50", label: "Under ₹4,000" },
                { id: "50-100", label: "₹4,000 to ₹8,000" },
                { id: "100-200", label: "₹8,000 to ₹16,000" },
                { id: "over-200", label: "Over ₹16,000" }
              ].map((range) => (
                <label key={range.id} className="flex items-center gap-2.5 cursor-pointer group text-sm text-slate-600 hover:text-slate-900 select-none">
                  <input
                    type="radio"
                    name="price-range"
                    checked={priceRange === range.id}
                    onChange={() => setPriceRange(range.id)}
                    className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <span className={priceRange === range.id ? "font-semibold text-slate-900" : ""}>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ratings Section */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Product Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2].map((stars) => {
                const isSelected = minRating === stars;
                return (
                  <label 
                    key={stars}
                    onClick={() => setMinRating(isSelected ? 0 : stars)}
                    className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-600 hover:text-slate-900 select-none"
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => {}}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                    /> 
                    <span className={`flex items-center gap-1 ${isSelected ? "font-semibold text-slate-900" : ""}`}>
                      <span className="text-yellow-400 font-bold">★</span> {stars}.0 & Up
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Side Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white py-16 px-4 text-center shadow-sm">
              <span className="rounded-full bg-slate-50 p-4 text-slate-400 border border-slate-100">
                <SlidersHorizontal className="h-8 w-8 text-indigo-600" />
              </span>
              <h3 className="mt-4 text-md font-bold text-slate-900">No products found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
                Try widening your search terms, removing filters, or choosing another category.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-indigo-700 transition-all active:scale-95 cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="absolute top-3 left-3 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Only {product.stock} Left!
                      </span>
                    )}
                    {product.stock === 0 && (
                      <span className="absolute top-3 left-3 rounded-md bg-slate-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Out of Stock
                      </span>
                    )}
                    {product.featured && product.stock > 5 && (
                      <span className="absolute top-3 left-3 rounded-md bg-indigo-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                        Staff Pick
                      </span>
                    )}

                    {/* Quick View Cover on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 backdrop-blur-3xs transition-all duration-300 group-hover:opacity-100">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-md transform translate-y-2 transition-all duration-300 group-hover:translate-y-0 hover:bg-indigo-600 hover:text-white cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="flex flex-1 flex-col p-4.5">
                    {/* Category */}
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-display">
                      {product.category}
                    </span>

                    {/* Title */}
                    <h4 
                      onClick={() => onSelectProduct(product)}
                      className="mt-1 text-sm font-semibold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h4>

                    {/* Stars and ratings */}
                    <div className="mt-1.5 flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(product.rating)
                                ? "fill-current"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 ml-1">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Description excerpt */}
                    <p className="mt-2.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price and Cart Button Footer */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <span className="text-base font-extrabold text-slate-900 font-display">
                        {formatCurrency(product.price)}
                      </span>
                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                        className="flex items-center gap-1.5 rounded-md bg-slate-900 hover:bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white transition-all active:scale-95 disabled:bg-slate-100 disabled:text-slate-400 disabled:pointer-events-none cursor-pointer"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
