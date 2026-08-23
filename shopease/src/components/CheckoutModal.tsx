import React, { useState } from "react";
import { X, CreditCard, MapPin, Sparkles, ShoppingBag, Loader2, CheckCircle2 } from "lucide-react";
import { CartItem, ShippingAddress, User } from "../types";
import AuthModal from "./AuthModal";
import { formatCurrency } from "../utils/currency";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  user: User | null;
  onAuthSuccess: (user: User) => void;
  onOrderPlaced: (orderId: string) => void;
  clearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  user,
  onAuthSuccess,
  onOrderPlaced,
  clearCart
}: CheckoutModalProps) {
  const [step, setStep] = useState<"shipping" | "payment" | "success">("shipping");
  const [loading, setLoading] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  // Address State
  const [shippingName, setShippingName] = useState(user?.name || "");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("India");

  // Payment State
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  if (!isOpen) return null;

  // Totals calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthOpen(true);
      return;
    }

    setLoading(true);

    const orderPayload = {
      items: cartItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      shippingAddress: {
        name: shippingName || user.name,
        street,
        city,
        state,
        zip,
        country,
      },
      total: Math.round(total * 100) / 100,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order.");
      }

      setPlacedOrderId(data.id);
      setStep("success");
      clearCart();
    } catch (err: any) {
      alert(err.message || "An error occurred while finalizing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Main Container */}
      <div 
        id="checkout-modal-card"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button (Hidden on success to force user action) */}
        {step !== "success" && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* Left Column: Form Fields */}
          <div className="col-span-2 p-6 md:p-8">
            
            {/* Steps Visual Progress */}
            {step !== "success" && (
              <div className="flex items-center gap-2 mb-6">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${step === "shipping" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}>
                  1. Shipping
                </span>
                <span className="h-[1px] w-6 bg-gray-200" />
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${step === "payment" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}>
                  2. Payment
                </span>
              </div>
            )}

            {/* STEP 1: SHIPPING FORM */}
            {step === "shipping" && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>Delivery Address</span>
                </div>

                {/* Recipient name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Recipient Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                  />
                </div>

                {/* Street Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="123 Ocean Drive, Apt 4B"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                  />
                </div>

                {/* City & State Rows */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Los Angeles"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">State / Region</label>
                    <input
                      type="text"
                      required
                      placeholder="CA"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* Zip & Country Rows */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">ZIP / Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="90001"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Country</label>
                    <input
                      type="text"
                      required
                      placeholder="United States"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all hover:bg-indigo-600 active:scale-98 mt-4"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* STEP 2: PAYMENT FORM */}
            {step === "payment" && (
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure Billing Info</span>
                </div>

                {!user && (
                  <div className="rounded-xl bg-amber-50 p-3.5 text-[11px] text-amber-800 border border-amber-100 space-y-2">
                    <p className="font-semibold">Sign in is required to place real orders.</p>
                    <button
                      type="button"
                      onClick={() => setAuthOpen(true)}
                      className="rounded bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 font-bold transition-all text-[10px]"
                    >
                      Sign In / Register Now
                    </button>
                  </div>
                )}

                {/* Card Number */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Credit Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 font-mono"
                  />
                </div>

                {/* Expiry and CVC Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Expiration Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">CVC / CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 py-2 px-3 text-xs text-gray-900 outline-none transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100 font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="flex-1 rounded-xl border border-gray-200 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-98"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-98 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-indigo-200" />
                        <span>Pay {formatCurrency(total)}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS CELEBRATION */}
            {step === "success" && (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                <span className="rounded-full bg-indigo-50 p-4 border border-indigo-100 text-indigo-600 animate-pulse">
                  <CheckCircle2 className="h-10 w-10" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">Purchase Complete!</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Thank you for your order! Your payment was processed successfully. A confirmation email has been sent to <span className="font-semibold text-gray-800">{user?.email}</span>.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-slate-50/50 p-4 w-full text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Your Order ID</span>
                  <span className="text-base font-black text-indigo-700 mt-0.5 block tracking-wider uppercase">{placedOrderId}</span>
                </div>

                <button
                  onClick={() => {
                    onOrderPlaced(placedOrderId);
                    onClose();
                    setStep("shipping"); // reset
                  }}
                  className="w-full rounded-xl bg-indigo-600 py-3.5 text-xs font-bold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-98"
                >
                  View Order Status
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Order Cart Summary Box */}
          <div className="col-span-1 border-l border-gray-100 bg-gray-50/50 p-6 flex flex-col justify-between">
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs uppercase tracking-wide border-b border-gray-100 pb-2.5">
                <ShoppingBag className="h-4 w-4 text-indigo-600" />
                <span>Your Order</span>
              </div>

              {/* Collapsed items list */}
              <div className="flex-1 overflow-y-auto max-h-[220px] space-y-3 no-scrollbar py-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 shrink-0 rounded bg-white object-cover border border-gray-100"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[10px] font-semibold text-gray-900 truncate leading-tight">{item.product.name}</span>
                      <span className="text-[9px] text-gray-400 mt-0.5">Qty {item.quantity} × {formatCurrency(item.product.price)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="border-t border-gray-200/60 pt-4 space-y-1.5 text-[10px] text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-bold text-emerald-600">Free</span>
                  ) : (
                    <span className="font-semibold text-gray-900">{formatCurrency(shipping)}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200/60 pt-3 flex justify-between text-xs font-black text-gray-900">
                <span>Total Due</span>
                <span className="text-sm text-indigo-600 font-extrabold">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth sub-popover to force registration if guest */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={(u) => {
          onAuthSuccess(u);
          setShippingName(u.name);
        }}
      />
    </div>
  );
}
