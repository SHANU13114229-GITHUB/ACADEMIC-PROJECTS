import { useEffect, useState } from "react";
import { Package, Truck, Calendar, CreditCard, ChevronRight, CheckCircle2, Clipboard, Loader2 } from "lucide-react";
import { Order, User } from "../types";
import { formatCurrency } from "../utils/currency";

interface OrderHistoryProps {
  user: User;
}

export default function OrderHistory({ user }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders", {
        headers: { "x-user-id": user.id }
      });
      if (!response.ok) {
        throw new Error("Failed to load your purchase history.");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || "Connection error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  // Status Badge configurations
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Processing":
        return "bg-sky-50 text-sky-700 border-sky-100";
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  // Steps indicator for shipment pipeline
  const getPipelineStep = (status: string): number => {
    switch (status) {
      case "Pending": return 1;
      case "Processing": return 2;
      case "Shipped": return 3;
      case "Delivered": return 4;
      default: return 0; // Cancelled
    }
  };

  return (
    <div id="order-history-section" className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-8 flex items-center gap-3">
        <span className="rounded-lg bg-indigo-50 p-3 text-indigo-600 border border-indigo-100">
          <Package className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display">Your Purchase History</h2>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            Review detailed receipt records and real-time shipment status updates.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-2" />
          <span className="text-xs font-semibold text-slate-500">Retrieving invoices...</span>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-5 border border-red-100 text-center">
          <p className="text-sm font-semibold text-red-600">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 rounded-md bg-red-650 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition-all cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white py-16 px-4 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Package className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-slate-900">No orders placed yet</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Your historic invoices and receipt tracking updates will appear here once you place your first order.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const pipelineStep = getPipelineStep(order.status);
            return (
              <div
                key={order.id}
                id={`order-card-${order.id}`}
                className="rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden"
              >
                {/* Order Meta Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-50 border-b border-slate-200 px-5 py-4 gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {/* Order ID */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Order ID</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-black text-slate-800 tracking-wider uppercase">{order.id}</span>
                        <button
                          onClick={() => handleCopy(order.id)}
                          title="Copy ID"
                          className="text-slate-400 hover:text-slate-600 rounded p-0.5 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Clipboard className="h-3.5 w-3.5" />
                        </button>
                        {copiedId === order.id && (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded animate-fade-in">Copied</span>
                        )}
                      </div>
                    </div>

                    {/* Order Date */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Date Placed</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-slate-700 mt-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Invoice Total */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Grand Total</span>
                      <span className="text-xs font-black text-indigo-600 block mt-1">{formatCurrency(order.total)}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-bold w-fit ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Tracking Shipment Pipeline */}
                {pipelineStep > 0 && (
                  <div className="px-5 py-5 border-b border-slate-100 bg-slate-50/50 select-none">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Package Status Tracking</span>
                    <div className="relative flex items-center justify-between max-w-xl mx-auto">
                      
                      {/* Connection Line */}
                      <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-slate-200 -translate-y-1/2 -z-10">
                        <div 
                          className="h-full bg-indigo-600 transition-all duration-500" 
                          style={{ width: `${((pipelineStep - 1) / 3) * 100}%` }}
                        />
                      </div>

                      {/* Step Bubbles */}
                      {[
                        { step: 1, label: "Placed" },
                        { step: 2, label: "Processing" },
                        { step: 3, label: "Shipped" },
                        { step: 4, label: "Delivered" }
                      ].map((item) => {
                        const isCompleted = pipelineStep >= item.step;
                        const isActive = pipelineStep === item.step;
                        return (
                          <div key={item.step} className="flex flex-col items-center">
                            <div 
                              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-black transition-all ${
                                isCompleted
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                                  : "bg-white text-slate-400 border-slate-200"
                              } ${isActive ? "ring-4 ring-indigo-100 scale-110" : ""}`}
                            >
                              {isCompleted ? <CheckCircle2 className="h-3 w-3" /> : item.step}
                            </div>
                            <span className={`text-[9px] font-bold mt-1.5 uppercase tracking-wide ${isCompleted ? "text-indigo-600 font-extrabold" : "text-slate-400"}`}>
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order Details Body */}
                <div className="px-5 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Items List Column */}
                  <div className="md:col-span-2 space-y-3.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Purchased Products</span>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 shrink-0 rounded-md object-cover bg-slate-50 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Qty {item.quantity} × {formatCurrency(item.price)}</span>
                        </div>
                        <span className="text-xs font-black text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info Column */}
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Delivery Summary</span>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <p className="font-bold text-slate-900">{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                      <p className="font-semibold text-slate-400 mt-1 uppercase text-[9px] tracking-wider">{order.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
