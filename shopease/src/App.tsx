import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, ShoppingCart, RefreshCcw, Loader2 } from "lucide-react";
import { Product, CartItem, User } from "./types";
import Header from "./components/Header";
import ProductCatalog from "./components/ProductCatalog";
import ProductDetailModal from "./components/ProductDetailModal";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import OrderHistory from "./components/OrderHistory";
import AdminPanel from "./components/AdminPanel";
import AuthModal from "./components/AuthModal";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Navigation states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeView, setActiveView] = useState<'home' | 'history' | 'admin'>('home');

  // Modal display toggles
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Derived categories
  const categories = ["All", "Electronics", "Fashion", "Home & Living", "Fitness"];

  // 1. Initial State Hydration on Mount
  useEffect(() => {
    // Hydrate User
    const cachedUser = localStorage.getItem("shopease_user");
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {
        localStorage.removeItem("shopease_user");
      }
    }

    // Hydrate Cart
    const cachedCart = localStorage.getItem("shopease_cart");
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        localStorage.removeItem("shopease_cart");
      }
    }

    // Fetch Products
    fetchProducts();
  }, []);

  // Sync Cart to LocalStorage on modifications
  useEffect(() => {
    localStorage.setItem("shopease_cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Catalog fetch failed");
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error("Error loading products:", e);
    } finally {
      setLoading(false);
    }
  };

  // 2. Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.stock === 0) return;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === product.id);
      
      let newCart = [...prevCart];
      if (existingIdx > -1) {
        const newQuantity = newCart[existingIdx].quantity + quantity;
        // Clip to stock limit
        newCart[existingIdx].quantity = Math.min(newQuantity, product.stock);
      } else {
        newCart.push({
          id: product.id,
          product,
          quantity: Math.min(quantity, product.stock),
        });
      }

      return newCart;
    });

    // Automatically trigger cart sidebar opening for user comfort
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("shopease_cart");
  };

  // 3. Authentication Operations
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("shopease_user");
    setActiveView("home"); // Redirect to home catalog
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    localStorage.setItem("shopease_user", JSON.stringify(authenticatedUser));
  };

  const handleOrderSuccess = (orderId: string) => {
    setIsCheckoutOpen(false);
    setActiveView("history"); // Redirect customer to order invoice list
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* HEADER NAVIGATION */}
      <Header
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setView={setActiveView}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-3" />
            <span className="text-sm font-semibold tracking-wide text-gray-500">Connecting to ShopEase Cloud Node...</span>
          </div>
        ) : (
          <>
            {activeView === "home" && (
              <>
                {/* 4. HERO PROMOTIONAL BANNER */}
                {selectedCategory === "All" && !searchQuery && (
                  <div id="promotional-hero-banner" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 select-none">
                    <section className="h-44 bg-slate-900 rounded-xl flex overflow-hidden relative shadow-sm">
                      <div className="flex-1 p-8 flex flex-col justify-center text-white z-10">
                        <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1.5 font-display">
                          Summer Collection 2026
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 font-display">
                          Elevate Your Lifestyle
                        </h2>
                        <button 
                          onClick={() => setSelectedCategory("Electronics")}
                          className="bg-white hover:bg-slate-100 text-slate-950 px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider w-fit transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                        >
                          Shop Now
                        </button>
                      </div>
                      <div className="absolute right-0 top-0 h-full w-1/3 bg-indigo-600 flex items-center justify-center transform skew-x-12 translate-x-10 select-none">
                        <div className="transform -skew-x-12 opacity-20 text-[100px] font-black italic">
                          40%
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* PRODUCT CATALOG DISPLAY */}
                <ProductCatalog
                  products={products}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                />
              </>
            )}

            {/* ORDER HISTORY VIEW */}
            {activeView === "history" && user && (
              <OrderHistory user={user} />
            )}

            {/* ADMIN PANEL VIEW */}
            {activeView === "admin" && user && user.isAdmin && (
              <AdminPanel
                user={user}
                products={products}
                onRefreshProducts={fetchProducts}
              />
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="h-12 bg-slate-900 text-slate-400 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] shrink-0 gap-2 sm:gap-0 select-none py-2.5 sm:py-0 border-t border-slate-850">
        <div className="flex gap-6">
          <span>&copy; 2026 ShopEase Global Inc.</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Server Status: Operational
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5 uppercase font-bold">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            USA (USD)
          </span>
        </div>
      </footer>

      {/* 5. MODAL WRAPPERS */}
      
      {/* Detailed view Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slideout Shopping Cart */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Multi-step Checkout Drawer */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        user={user}
        onAuthSuccess={handleAuthSuccess}
        onOrderPlaced={handleOrderSuccess}
        clearCart={clearCart}
      />

      {/* Standard authentication modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
