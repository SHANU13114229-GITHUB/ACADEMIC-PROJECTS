import React, { useEffect, useState } from "react";
import { 
  ShieldAlert, DollarSign, ListOrdered, Package, Users, 
  Trash2, Edit, Plus, Check, Loader2, ArrowUpRight, Save, X, RefreshCw 
} from "lucide-react";
import { Product, Order, DashboardStats } from "../types";
import { formatCurrency, toRupees, toUSD } from "../utils/currency";

interface AdminPanelProps {
  user: any;
  products: Product[];
  onRefreshProducts: () => void;
}

export default function AdminPanel({ user, products, onRefreshProducts }: AdminPanelProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [error, setError] = useState("");

  // Product editor state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodCategory, setProdCategory] = useState("Electronics");
  const [prodStock, setProdStock] = useState("");
  const [prodImage, setProdImage] = useState("");

  const fetchStatsAndOrders = async () => {
    try {
      // Fetch stats
      const statsResponse = await fetch("/api/dashboard/stats", {
        headers: { "x-user-id": user.id }
      });
      if (!statsResponse.ok) throw new Error("Could not load stats.");
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch all orders
      const ordersResponse = await fetch("/api/orders", {
        headers: { "x-user-id": user.id }
      });
      if (!ordersResponse.ok) throw new Error("Could not load orders.");
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndOrders();
  }, [user]);

  // Handle Order status update
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Failed to update status.");
      
      // Update local state
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as any } : o));
      fetchStatsAndOrders(); // Refresh stats chart
    } catch (err: any) {
      alert(err.message || "Error updating order status.");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product from the store catalog?")) return;
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "x-user-id": user.id }
      });
      if (!response.ok) throw new Error("Failed to delete product.");
      onRefreshProducts();
      fetchStatsAndOrders();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Add product submission
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodDesc || !prodPrice || !prodStock || !prodImage) {
      alert("Please fill in all product fields.");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id
        },
        body: JSON.stringify({
          name: prodName,
          description: prodDesc,
          price: toUSD(Number(prodPrice)),
          category: prodCategory,
          stock: Number(prodStock),
          image: prodImage
        })
      });

      if (!response.ok) throw new Error("Failed to add product.");
      
      onRefreshProducts();
      fetchStatsAndOrders();
      setIsAdding(false);
      // Reset fields
      setProdName("");
      setProdDesc("");
      setProdPrice("");
      setProdStock("");
      setProdImage("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Edit product submission
  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id
        },
        body: JSON.stringify({
          name: prodName,
          description: prodDesc,
          price: toUSD(Number(prodPrice)),
          category: prodCategory,
          stock: Number(prodStock),
          image: prodImage
        })
      });

      if (!response.ok) throw new Error("Failed to update product.");

      onRefreshProducts();
      fetchStatsAndOrders();
      setEditingProduct(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdDesc(product.description);
    setProdPrice(toRupees(product.price).toFixed(2));
    setProdCategory(product.category);
    setProdStock(product.stock.toString());
    setProdImage(product.image);
    setIsAdding(false);
  };

  // Draw custom SVG chart coords
  const chartPoints = stats?.revenueByDate ? stats.revenueByDate.map((item, idx) => {
    const x = 40 + idx * 70;
    // Map total range up to a standard max height
    const maxVal = Math.max(...stats.revenueByDate.map(d => d.amount), 300);
    const y = 140 - (item.amount / maxVal) * 100;
    return { x, y, label: item.date, val: item.amount };
  }) : [];

  const chartPathD = chartPoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Area path (goes back down to y=140 to fill under the line)
  const chartAreaD = chartPoints.length > 0 
    ? `${chartPathD} L ${chartPoints[chartPoints.length - 1].x} 140 L ${chartPoints[0].x} 140 Z` 
    : "";

  return (
    <div id="admin-panel-container" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title block */}
      <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-amber-50 p-3 text-amber-600 border border-amber-100">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display">Admin Operations Dashboard</h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage product listings, track client checkout orders, and review store weekly statistics.
            </p>
          </div>
        </div>

        <button
          onClick={fetchStatsAndOrders}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-all active:scale-95 self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5 text-indigo-600" />
          <span>Reload Stats</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-2" />
          <span className="text-xs font-semibold text-slate-500">Retrieving secure merchant logs...</span>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-5 border border-red-100 text-center">
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* KPI GRID STATS */}
          {stats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Sales */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Sales</span>
                  <span className="text-lg font-black text-slate-900 block font-display">{formatCurrency(stats.totalSales)}</span>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>

              {/* Card 2: Orders */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Orders</span>
                  <span className="text-lg font-black text-slate-900 block font-display">{stats.totalOrders}</span>
                </div>
                <div className="rounded-lg bg-sky-50 p-3 text-sky-600">
                  <ListOrdered className="h-5 w-5" />
                </div>
              </div>

              {/* Card 3: Products */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Stock Skus</span>
                  <span className="text-lg font-black text-slate-900 block font-display">{stats.totalProducts}</span>
                </div>
                <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                  <Package className="h-5 w-5" />
                </div>
              </div>

              {/* Card 4: Customers */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Shoppers</span>
                  <span className="text-lg font-black text-slate-900 block font-display">{stats.totalUsers}</span>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </div>
          )}

          {/* VISUAL ANALYTICS ROW */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left chart: Revenue trend (Custom SVG line graph) */}
              <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950">Weekly Revenue Timeline</h3>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>+12% vs LW</span>
                  </span>
                </div>

                {/* Draw SVG Line Chart */}
                <div className="relative h-[180px] w-full">
                  <svg className="h-full w-full overflow-visible" viewBox="0 0 500 150">
                    {/* Definitions for Gradient fills */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>

                    {/* horizontal dashed grid lines */}
                    <line x1="30" y1="40" x2="480" y2="40" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="30" y1="90" x2="480" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
                    <line x1="30" y1="140" x2="480" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Gradient Area path */}
                    {chartAreaD && <path d={chartAreaD} fill="url(#chartGradient)" />}

                    {/* Glowing Stroke line */}
                    {chartPathD && (
                      <path 
                        d={chartPathD} 
                        fill="none" 
                        stroke="#4f46e5" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    )}

                    {/* Node points overlay */}
                    {chartPoints.map((p, idx) => (
                      <g key={idx} className="group cursor-pointer">
                        <circle 
                          cx={p.x} 
                          cy={p.y} 
                          r="4" 
                          fill="#ffffff" 
                          stroke="#4f46e5" 
                          strokeWidth="2.5" 
                        />
                        {/* Tooltip value on hover */}
                        <text
                          x={p.x}
                          y={p.y - 10}
                          textAnchor="middle"
                          className="text-[9px] font-black text-slate-800 bg-white px-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono"
                        >
                          {formatCurrency(p.val)}
                        </text>
                        {/* Day label */}
                        <text
                          x={p.x}
                          y="150"
                          textAnchor="middle"
                          className="text-[9px] font-bold fill-slate-400 uppercase tracking-wider font-mono"
                        >
                          {p.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Right chart: Category contribution (Visual progressive lists) */}
              <div className="col-span-1 rounded-lg border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3 mb-4">
                    Sales Share By Category
                  </h3>

                  <div className="space-y-4">
                    {stats.salesByCategory.map((cat, idx) => {
                      const colors = [
                        "bg-indigo-600",
                        "bg-amber-500",
                        "bg-purple-600",
                        "bg-emerald-650"
                      ];
                      const maxVal = Math.max(...stats.salesByCategory.map(c => c.value), 100);
                      const percent = (cat.value / maxVal) * 100;
                      return (
                        <div key={cat.category} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700">{cat.category}</span>
                            <span className="font-black text-slate-900">{formatCurrency(cat.value)}</span>
                          </div>
                          {/* Progress Line bar */}
                          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${colors[idx % colors.length]} transition-all duration-500`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN ACTION ZONE: ORDERS & PRODUCTS LISTINGS */}
          <div className="space-y-4">
            
            {/* Tabs Row */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-1">
              <div className="flex items-center gap-1.5 select-none">
                <button
                  onClick={() => { setActiveTab("orders"); setEditingProduct(null); setIsAdding(false); }}
                  className={`border-b-2 px-4 py-2 text-xs font-bold transition-all uppercase tracking-wider ${
                    activeTab === "orders"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-450 hover:text-slate-800"
                  }`}
                >
                  📋 Customer Orders ({orders.length})
                </button>
                <button
                  onClick={() => { setActiveTab("products"); setEditingProduct(null); setIsAdding(false); }}
                  className={`border-b-2 px-4 py-2 text-xs font-bold transition-all uppercase tracking-wider ${
                    activeTab === "products"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-slate-450 hover:text-slate-800"
                  }`}
                >
                  📦 Store Catalog ({products.length})
                </button>
              </div>

              {/* Add product CTA inside products tab */}
              {activeTab === "products" && !isAdding && !editingProduct && (
                <button
                  onClick={() => {
                    setIsAdding(true);
                    setEditingProduct(null);
                    // Reset fields
                    setProdName("");
                    setProdDesc("");
                    setProdPrice("");
                    setProdStock("");
                    setProdImage("");
                  }}
                  className="flex items-center gap-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Product</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT: ORDERS MANAGEMENT */}
            {activeTab === "orders" && (
              <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                        <th className="px-5 py-3.5">Order ID</th>
                        <th className="px-5 py-3.5">Customer Email</th>
                        <th className="px-5 py-3.5">Date</th>
                        <th className="px-5 py-3.5">Items Count</th>
                        <th className="px-5 py-3.5">Total Amount</th>
                        <th className="px-5 py-3.5">Status Gate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-slate-900 tracking-wider">#{order.id}</td>
                          <td className="px-5 py-3.5 font-medium text-slate-600">{order.userEmail}</td>
                          <td className="px-5 py-3.5">
                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                          <td className="px-5 py-3.5 font-bold">{order.items.reduce((sum, i) => sum + i.quantity, 0)} units</td>
                          <td className="px-5 py-3.5 font-extrabold text-indigo-600">{formatCurrency(order.total)}</td>
                          <td className="px-5 py-3.5">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className={`rounded-md border px-2 py-1.5 text-[11px] font-bold tracking-wide outline-none cursor-pointer ${
                                order.status === "Delivered" 
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                  : order.status === "Cancelled"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRODUCTS CATALOGUE & EDITOR */}
            {activeTab === "products" && (
              <div className="space-y-4">
                
                {/* INLINE PRODUCT ADD/EDIT DRAWER */}
                {(isAdding || editingProduct) && (
                  <form 
                    onSubmit={isAdding ? handleAddProduct : handleEditProduct}
                    className="rounded-lg border border-indigo-200 bg-indigo-50/20 p-6 space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-indigo-200 pb-3 mb-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900">
                        {isAdding ? "✨ Add New Product Listing" : "✏️ Edit Product Listing"}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setIsAdding(false); setEditingProduct(null); }}
                        className="rounded-full bg-white p-1 text-slate-400 hover:text-slate-700 shadow-sm border border-slate-200 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product Title</label>
                        <input
                          type="text"
                          required
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          placeholder="e.g. SuperFast Wireless Earbuds"
                          className="w-full rounded-md border border-slate-200 bg-white py-2.5 px-3.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      {/* Image URL */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
                        <input
                          type="url"
                          required
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full rounded-md border border-slate-200 bg-white py-2.5 px-3.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description Overview</label>
                      <textarea
                        required
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Write details of features, sizes, styles, warranties..."
                        rows={3}
                        className="w-full rounded-md border border-slate-200 bg-white py-2.5 px-3.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Category */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value)}
                          className="w-full rounded-md border border-slate-200 bg-white py-2.5 px-3.5 text-xs text-slate-900 outline-none cursor-pointer focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        >
                          <option value="Electronics">Electronics</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Home & Living">Home & Living</option>
                          <option value="Fitness">Fitness</option>
                        </select>
                      </div>

                      {/* Price */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unit Price (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={prodPrice}
                          onChange={(e) => setProdPrice(e.target.value)}
                          placeholder="99.99"
                          className="w-full rounded-md border border-slate-200 bg-white py-2.5 px-3.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      {/* Stock */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Initial Stock (units)</label>
                        <input
                          type="number"
                          required
                          value={prodStock}
                          onChange={(e) => setProdStock(e.target.value)}
                          placeholder="25"
                          className="w-full rounded-md border border-slate-200 bg-white py-2.5 px-3.5 text-xs text-slate-900 outline-none transition-all focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <Save className="h-4 w-4" />
                      <span>{isAdding ? "Save Product" : "Apply Changes"}</span>
                    </button>
                  </form>
                )}

                {/* Catalog items table */}
                <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200">
                          <th className="px-5 py-3">Photo</th>
                          <th className="px-5 py-3">Product Name</th>
                          <th className="px-5 py-3">Category</th>
                          <th className="px-5 py-3">Price</th>
                          <th className="px-5 py-3">Stock Units</th>
                          <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-5 py-2.5">
                              <img
                                src={p.image}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="h-9 w-9 rounded-md object-cover bg-slate-50 border border-slate-200"
                              />
                            </td>
                            <td className="px-5 py-2.5 font-bold text-slate-900 leading-tight">
                              <div>{p.name}</div>
                              <span className="text-[9px] font-mono text-slate-450 font-normal block mt-0.5">ID: {p.id}</span>
                            </td>
                            <td className="px-5 py-2.5">
                              <span className="rounded-md bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                                {p.category}
                              </span>
                            </td>
                            <td className="px-5 py-2.5 font-extrabold text-slate-900">{formatCurrency(p.price)}</td>
                            <td className="px-5 py-2.5 font-semibold">
                              <span className={p.stock <= 5 ? "text-rose-650 font-black" : "text-slate-700"}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="px-5 py-2.5 text-right space-x-2">
                              <button
                                onClick={() => startEdit(p)}
                                className="inline-flex rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                title="Edit Product"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="inline-flex rounded-md border border-slate-200 p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
