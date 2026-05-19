"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, CircleUserRound, LogIn, LogOut, UserPlus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //  Destructuring user profile and centralized logout from your new Auth context
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-background px-4 sm:px-6 lg:px-16 pt-4 relative z-50 transition-colors duration-200">
      <nav className="max-w-7xl mx-auto bg-nav-bg rounded-2xl px-6 py-2 flex items-center justify-between shadow-md transition-colors duration-200">
        {/* Left Side Layout */}
        <div className="flex items-center gap-4">
          <button className="text-white outline-none cursor-pointer">
            <Menu size={30} />
          </button>

          <Link href="/" className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ShoppingCart size={22} className="text-orange-600" strokeWidth={2.5} />
            <div className="flex items-center text-xl font-bold tracking-tight">
              <span className="text-[#e11d48]">kena</span>
              <span className="text-black">kata</span>
            </div>
          </Link>
        </div>

        {/* Center Layout */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <SearchBar />
        </div>

        {/* Right Side Layout */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <ThemeToggle />
          <Link href="/cart">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
              <div className="relative p-2 bg-white rounded-full cursor-pointer">
                <ShoppingCart size={20} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </div>
            </motion.div>
          </Link>

          {/* User Icon Action Dropdown Trigger */}
          <div className="relative">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}>
              <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-white cursor-pointer focus:outline-none">
                {/* Dynamic UI Enhancement: Show user's actual avatar image if logged in, else fallback to standard icon */}
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CircleUserRound size={28} className="text-gray-700" strokeWidth={1.5} />
                )}
              </button>
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 text-left flex flex-col gap-0.5"
                >
                  {/* SIMPLIFIED DYNAMIC RENDERING VIA AUTH CONTEXT STATUS */}
                  {!user ? (
                    <>
                      {/* Guest Options only */}
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                      >
                        <LogIn size={16} strokeWidth={2.5} />
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                      >
                        <UserPlus size={16} strokeWidth={2.5} />
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* Logged-In Options only */}
                      <div className="px-4 py-2 border-b border-slate-50 text-left">
                        <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50/60 transition-colors text-left cursor-pointer"
                      >
                        <LogOut size={16} strokeWidth={2.5} />
                        Log Out
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}