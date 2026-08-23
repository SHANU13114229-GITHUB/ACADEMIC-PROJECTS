import { useState } from "react";
import { X, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Product } from "../types";
import { formatCurrency } from "../utils/currency";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div id="product-detail-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        id="product-detail-card"
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button absolute */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 backdrop-blur-sm p-1.5 text-gray-500 shadow-sm border border-gray-100 hover:bg-gray-100 hover:text-gray-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content Split: Left Image, Right Info */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image */}
          <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-gray-50 flex items-center justify-center min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            
            {/* Tag Overlay */}
            {product.featured && (
              <span className="absolute left-4 bottom-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold uppercase text-white shadow-md">
                Featured Product
              </span>
            )}
          </div>

          {/* Right Column: Detailed Information */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category */}
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full w-fit">
                {product.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h3>

              {/* Rating row */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs font-medium text-gray-500 hover:underline cursor-pointer">
                  {product.reviewsCount} customer reviews
                </span>
              </div>

              {/* Price Tag */}
              <div className="text-2xl font-black text-gray-900">
                {formatCurrency(product.price)}
              </div>

              {/* Long Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">Product Overview</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features Bullet list */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <Truck className="h-4 w-4 text-emerald-500" />
                    <span>Free Standard Shipping</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>2 Year Store Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <RefreshCw className="h-4 w-4 text-emerald-500" />
                    <span>30-Day Hassle-Free Returns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls and Add to Cart Section */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
              
              {/* Stock Status indicator */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>Availability:</span>
                {product.stock > 0 ? (
                  <span className="text-emerald-600">
                    In Stock ({product.stock} units available)
                  </span>
                ) : (
                  <span className="text-red-500 font-bold">Out of Stock</span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="px-3.5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-bold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      disabled={quantity >= product.stock}
                      className="px-3.5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAdd}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 px-6 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-98"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart - {formatCurrency(product.price * quantity)}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
