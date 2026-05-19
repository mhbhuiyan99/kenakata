"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, CircleUserRound, LogIn, LogOut, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { cartCount } = useCart(); 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Close the dropdown cleanly if clicked outside of the menu container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-200 px-4 sm:px-6 lg:px-16 pt-4 relative z-50">
      <nav className="max-w-7xl mx-auto bg-teal-900 rounded-2xl px-6 py-2 flex items-center justify-between shadow-md">
        
        {/* Left Side: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button className="text-white outline-none cursor-pointer">
            <Menu size={30} />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center">
              <ShoppingCart
                size={22}
                className="text-orange-600"
                strokeWidth={2.5}
              />
            </div>

            <div className="flex items-center text-xl font-bold tracking-tight">
              <span className="text-[#e11d48]">kena</span>
              <span className="text-black">kata</span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <SearchBar />
        </div>

        {/* Right Side: Cart + Profile Dropdown Group */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          
          <Link href="/cart">
            <motion.div
              whileHover={{ scale: 1.15 }} 
              whileTap={{ scale: 0.95 }} 
            >
              <div className="relative p-2 bg-white rounded-full cursor-pointer">
                <ShoppingCart size={20} className="text-gray-700" />
                
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
                
                {cartCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    0
                  </span>
                )}
              </div>
            </motion.div>
          </Link>

          {/* Profile Trigger Element */}
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.15 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <button className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-white cursor-pointer transition-opacity focus:outline-none">
                <CircleUserRound
                  size={28}
                  className="text-gray-700"
                  strokeWidth={1.5}
                />
              </button>
            </motion.div>

            {/*  Dynamic Dropdown Panel */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 px-1 text-left flex flex-col gap-0.5"
                >
                  {!isLoggedIn ? (
                    // Show when Guest
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                    >
                      <LogIn size={16} strokeWidth={2.5} />
                      Log In
                    </Link>
                  ) : (
                    // Show when Logged In
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-teal-900 transition-colors"
                      >
                        <User size={16} strokeWidth={2.5} />
                        My Profile
                      </Link>
                      
                      <hr className="border-slate-100 my-1 mx-2" />
                      
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsOpen(false);
                        }}
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