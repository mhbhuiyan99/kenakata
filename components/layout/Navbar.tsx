"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, CircleUserRound } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { cartCount } = useCart(); 

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

        {/* Right Side: Cart + Profile */}
        <div className="flex items-center gap-3">
          
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