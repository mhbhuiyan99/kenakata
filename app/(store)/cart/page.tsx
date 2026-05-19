"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { cart, addToCart, decreaseQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    return (
        <main className="min-h-screen bg-slate-50 pb-24 pt-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8">
                    Your Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center max-w-md mx-auto shadow-sm">
                        <div className="text-5xl mb-4">🛒</div>
                        <p className="text-slate-500 font-medium text-lg">Your cart is empty!</p>
                        <p className="text-slate-400 text-sm mt-1">Add some items from our catalog to get started.</p>
                        <Link
                            href="/products"
                            className="mt-6 inline-block bg-teal-800 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-teal-900 transition-colors"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* Left Side: Cart Items Layout Group */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Item Frame Box Container */}
                                        <Link
                                            href={`/products/${item.id}`}
                                            className="relative w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 block hover:opacity-80 transition-opacity cursor-pointer"
                                        >
                                            <Image
                                                src={item.images[0]}
                                                alt={item.title}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </Link>

                                        {/* Metadata text bundle */}
                                        <div className="text-left space-y-0.5">
                                            <Link
                                                href={`/products/${item.id}`}
                                                className="hover:text-teal-800 transition-colors cursor-pointer block"
                                            >
                                                <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-slate-400">{item.category.name}</p>
                                            <p className="text-sm font-black text-slate-900 pt-1">${item.price}</p>
                                            <p className="text-sm font-black text-slate-900 pt-1">
                                                Total: ${(item.price * item.quantity).toFixed(3)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions Right Column Block */}
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        {/* Inline Quantity Counter Grid */}
                                        <div className="flex items-center border border-slate-100 bg-slate-50 rounded-full p-1">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-full transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold text-slate-800">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-7 h-7 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-full transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Full Card Trashing Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-400 hover:text-red-500 text-sm font-medium px-2 py-1 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-xs text-slate-400 hover:text-slate-600 underline pl-2"
                            >
                                Clear all items
                            </button>
                        </div>

                        {/* Right Side: Order Sticky Summary Panel */}
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 text-left border-b border-slate-50 pb-3">
                                Order Summary
                            </h2>

                            <div className="space-y-2 text-sm text-slate-500">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-800">${cartTotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-semibold">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
                                <span className="font-bold text-slate-900">Total Amount</span>
                                <span className="text-2xl font-black text-slate-900">${cartTotal}</span>
                            </div>

                            <button className="w-full bg-[#b4f46c] hover:bg-[#a3e35b] text-teal-950 font-black py-3 px-4 rounded-xl text-center transition-colors shadow-sm text-sm">
                                Proceed to Checkout
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
}