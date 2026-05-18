"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Menu, X, CircleUserRound } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-gray-200 px-4 sm:px-6 lg:px-16 pt-4">
      
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
            {/* The Icon */}
            <div className="flex items-center justify-center">
              <ShoppingCart
                size={22}
                className="text-orange-600"
                strokeWidth={2.5}
              />
            </div>

            {/* The Text */}
            <div className="flex items-center text-xl font-bold tracking-tight">
              <span className="text-[#e11d48]">kena</span>
              <span className="text-black">kata</span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder="Search for Grocery, Stores..."
            className="w-full text-gray-800 bg-gray-200 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-1 focus:ring-slate-100"
          />
          <Search size={16} className="absolute left-3 text-gray-400" />
        </div>

        {/* Right Side: Cart + Profile */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.15 }} 
            whileTap={{ scale: 0.95 }} 
          >
            <div className="relative p-2 bg-white rounded-full cursor-pointer">
              <ShoppingCart size={20} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-white cursor-pointer transition-opacity">
              <CircleUserRound
                size={28}
                className="text-gray-700"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}