import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem } from "../types";
import { formatCurrency } from "../utils/currency";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartSidebarProps) {
  if (!isOpen) return null;

  // Totals calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% sales tax
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9.99; // Free shipping over $150
  const total = subtotal + tax + shipping;

  return (
    <div id="cart-sidebar-container" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-3xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Drawer Pane */}
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all flex flex-col h-full border-l border-gray-100">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              <h3 className="text-base font-bold text-gray-900">Shopping Cart</h3>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <span className="rounded-full bg-slate-50 p-4 text-gray-400 border border-slate-100 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </span>
                <h4 className="text-sm font-bold text-gray-900">Your cart is empty</h4>
                <p className="mt-1 text-xs text-gray-500 max-w-[200px] leading-relaxed">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex py-4 gap-4 first:pt-0">
                  {/* Photo */}
                  <div className="h-18 w-18 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Info details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="mt-0.5 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        {item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 scale-90 origin-left">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 px-2.5 text-gray-500 hover:bg-gray-100 font-bold disabled:opacity-30"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-extrabold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 px-2.5 text-gray-500 hover:bg-gray-100 font-bold disabled:opacity-30"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove item bin */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Pricing Subtotal column */}
                  <div className="flex flex-col text-right justify-between select-none">
                    <span className="text-xs font-bold text-gray-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {formatCurrency(item.product.price)} ea
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer Breakdown */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50/50 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-extrabold text-emerald-600 uppercase tracking-wider text-[10px] bg-emerald-50 px-2 rounded">Free</span>
                  ) : (
                    <span className="font-semibold text-gray-900">{formatCurrency(shipping)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-indigo-500 font-medium text-right mt-0.5">
                    Add {formatCurrency(150 - subtotal)} more for Free Shipping!
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between text-sm font-black text-gray-900">
                <span>Grand Total</span>
                <span className="text-lg text-indigo-600 font-black">{formatCurrency(total)}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
