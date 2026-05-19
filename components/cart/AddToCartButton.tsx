"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    return (
      <div className="flex items-center gap-3 bg-slate-100 border border-slate-200 rounded-xl p-1.5 w-full sm:w-auto inline-flex justify-between sm:justify-start">
        <button
          onClick={() => decreaseQuantity(product.id)}
          className="w-10 h-10 flex items-center justify-center font-black text-slate-700 bg-white hover:bg-[#b4f46c] hover:text-teal-950 rounded-lg shadow-sm transition-all text-xl cursor-pointer"
        >
          -
        </button>
        
        <span className="w-12 text-center font-black text-slate-800 text-base">
          {cartItem.quantity}
        </span>
        
        <button
          onClick={() => addToCart(product)}
          className="w-10 h-10 flex items-center justify-center font-black text-slate-700 bg-white hover:bg-[#b4f46c] hover:text-teal-950 rounded-lg shadow-sm transition-all text-xl cursor-pointer"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full sm:w-auto bg-teal-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#b4f46c] hover:text-teal-950 active:scale-95 transition-all cursor-pointer text-center block"
    >
      Add to Cart
    </button>
  );
}