"use client";

import Link from "next/link";
import { ShoppingCart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-outer-bg px-4 sm:px-6 lg:px-16 py-12 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand & About */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 bg-brand-bg px-4 py-1.5 rounded-xl shadow-sm border border-outer-bg w-fit">
            <ShoppingCart size={20} className="text-orange-600" strokeWidth={2.5} />
            <div className="flex items-center text-lg font-bold tracking-tight">
              <span className="text-[#e11d48]">kena</span>
              <span className="text-brand-text transition-colors">kata</span>
            </div>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your premium destination for sports gear, trending apparel, and essential lifestyle accessories delivered straight to your door.
          </p>
          
          {/*  Clean, lightweight SVG social icons so you don't rely on fragile external lucide updates */}
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.5.5-1 1-1h2V2h-3a4 4 0 00-4 4v2z"/></svg>
            </a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Shop Links */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4 tracking-wider uppercase">Shop</h3>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><Link href="/products" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Featured Categories</Link></li>
            <li><Link href="/cart" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Shopping Cart</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4 tracking-wider uppercase">Support</h3>
          <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Track Your Order</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Returns & Refunds</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4 tracking-wider uppercase">Contact</h3>
          <ul className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <span className="truncate">support@kenakata.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Ledger */}
      <div className="max-w-7xl mx-auto border-t border-outer-bg mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <p>© {currentYear} kenakata. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}