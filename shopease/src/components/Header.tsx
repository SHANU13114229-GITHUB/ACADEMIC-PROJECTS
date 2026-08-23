import { Search, ShoppingBag, LogIn, LogOut, User as UserIcon, Shield, ListTodo } from "lucide-react";
import { User } from "../types";

interface HeaderProps {
  user: User | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: 'home' | 'history' | 'admin';
  setView: (view: 'home' | 'history' | 'admin') => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Header({
  user,
  onOpenAuth,
  onSignOut,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  activeView,
  setView,
  categories,
  selectedCategory,
  setSelectedCategory
}: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => { setView('home'); setSelectedCategory("All"); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-indigo-600 transition-colors uppercase font-display select-none">
              SHOPEASE
            </span>
          </div>

          {/* Search bar - Only visible on Home catalog view */}
          {activeView === 'home' ? (
            <div className="hidden md:flex flex-1 max-w-md items-center relative">
              <span className="absolute left-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 bg-slate-100 border-none rounded-md px-10 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <div className="hidden md:block flex-1" /> /* Spacer */
          )}

          {/* Actions & Profiles */}
          <div className="flex items-center gap-6">
            
            {/* Nav Links based on User Role */}
            {user && (
              <div className="flex items-center gap-2 mr-1">
                {user.isAdmin ? (
                  <button
                    onClick={() => setView(activeView === 'admin' ? 'home' : 'admin')}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                      activeView === 'admin'
                        ? "bg-amber-50 text-amber-700 border-amber-200 shadow-xs"
                        : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    <span>{activeView === 'admin' ? "Storefront" : "Admin Panel"}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setView(activeView === 'history' ? 'home' : 'history')}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                      activeView === 'history'
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs"
                        : "bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <ListTodo className="h-3.5 w-3.5" />
                    <span>{activeView === 'history' ? "Catalog" : "My Orders"}</span>
                  </button>
                )}
              </div>
            )}

            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="relative cursor-pointer text-slate-700 hover:text-indigo-600 transition-colors p-1"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-slate-200" />

            {/* Auth indicator */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-900 leading-tight">Hi, {user.name.split(" ")[0]}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {user.isAdmin ? "Administrator" : "Shopper Account"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-700 text-xs tracking-wider select-none uppercase">
                    {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                  <button
                    onClick={onSignOut}
                    title="Log Out"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm active:scale-95 transition-all"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Category bar & Mobile Search (Only visible on Home) */}
        {activeView === 'home' && (
          <div className="border-t border-slate-100 py-2.5 flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 select-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-4 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all border ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-indigo-600 hover:border-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Search input */}
            <div className="md:hidden flex items-center relative w-full">
              <span className="absolute left-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-none bg-slate-100 py-2 pl-9 pr-4 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
