"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  // Calculate total checkout cost layout metrics
  const itemsSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const shippingFee = 0;
  const grandTotal = itemsSubtotal + shippingFee;

  const [phoneWarning, setPhoneWarning] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const isValidCharacter = /^[0-9+]*$/.test(value);

      if (!isValidCharacter) {
        setPhoneWarning("Phone must be number and valid country code characters (e.g., +)");
        return;
      } else {
        setPhoneWarning("");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required shipping fields!");
      return;
    }

    setIsSuccess(true);
    clearCart();
  };

  return (
    <main className="min-h-screen bg-gray-200 pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              {/* Left Column: Form Info */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-left">
                <div className="flex items-center gap-3 mb-6">
                  <Link href="/cart" className="text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft size={20} />
                  </Link>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Shipping & Delivery Details
                  </h1>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Mojammel Haque Bhuiyan"
                      className="w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2.5 px-4 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +8801712345678"
                        className={`w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2.5 px-4 border focus:outline-none focus:bg-white transition-all ${phoneWarning
                            ? "border-red-500 focus:border-red-500 bg-red-50/10"
                            : "border-transparent focus:border-slate-200"
                          }`}
                      />
                      {/* Dynamic Warning Block */}
                      {phoneWarning && (
                        <p className="text-xs font-semibold text-red-500 tracking-tight pt-0.5 pl-1 animate-pulse">
                          ⚠️ {phoneWarning}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        City / District *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Dhaka"
                        className="w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2.5 px-4 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Full Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House no., Road details, Area block..."
                      className="w-full text-sm text-gray-800 bg-gray-100 rounded-xl py-2.5 px-4 border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 resize-none"
                    />
                  </div>

                  <button type="submit" className="hidden" id="submit-form-btn" />
                </form>
              </div>

              {/* Right Column: Order Metrics Summary */}
              <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left space-y-4 h-fit sticky top-24">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <ShoppingBag size={18} className="text-teal-700" /> Order Summary
                </h3>
                <div className="w-full h-px bg-slate-100" />

                {/* Micro Item List Display */}
                <div className="max-h-40 overflow-y-auto space-y-3 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="max-w-[70%]">
                        <p className="font-bold text-slate-800 truncate">{item.title}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity || 1}</p>
                      </div>
                      <span className="font-black text-slate-900">${item.price * (item.quantity || 1)}</span>
                    </div>
                  ))}
                  {cart.length === 0 && <p className="text-xs text-slate-400 py-2">No active items</p>}
                </div>

                <div className="w-full h-px bg-slate-100" />

                {/* Subtotals Pricing Calculation */}
                <div className="space-y-1.5 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-slate-800">${itemsSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span className="font-bold text-slate-800">${shippingFee}</span>
                  </div>
                  <div className="w-full h-px bg-slate-50 pt-1" />
                  <div className="flex justify-between text-base font-black text-slate-900 pt-1">
                    <span>Grand Total:</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    const btn = document.getElementById("submit-form-btn");
                    btn?.click();
                  }}
                  disabled={cart.length === 0}
                  className="w-full mt-2 bg-teal-900 text-white font-bold py-3.5 px-4 rounded-xl text-center shadow-md hover:bg-[#b4f46c] hover:text-teal-950 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm & Place Order
                </button>
              </div>
            </motion.div>
          ) : (
            /* Success Modal View Confirmation Shifter Block */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center space-y-4 my-12"
            >
              <div className="flex justify-center text-emerald-500">
                <CheckCircle size={60} strokeWidth={1.5} className="animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Order Confirmed!
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Thank you for shopping with <span className="font-bold text-teal-800">kenakata</span>, <span className="font-bold">{formData.name}</span>! Your items are packed and heading to <span className="italic">{formData.city}</span>.
              </p>
              <div className="bg-slate-50 p-3 rounded-2xl text-left text-xs text-slate-500 space-y-1">
                <p><strong>Recipient Phone:</strong> {formData.phone}</p>
                <p><strong>Delivery Path:</strong> {formData.address}</p>
              </div>
              <Link
                href="/products"
                className="inline-block bg-teal-900 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-[#b4f46c] hover:text-teal-950 transition-all text-sm w-full"
              >
                Return to Shop Catalog
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}