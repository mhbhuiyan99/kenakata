"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { useAuth } from "./AuthContext";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number | string) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate user-specific partition key based on active login status
  const cartStorageKey = user ? `kenakata_cart_user_${user.id}` : "kenakata_cart_guest";

  // Load the partition whenever the user state changes (Login / Logout / Switch)
  useEffect(() => {
    const savedCart = localStorage.getItem(cartStorageKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [cartStorageKey]); // Automatically reruns whenever a user logs in or out!

  // Save changes to the active partition layout
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    }
  }, [cart, cartStorageKey]);

  // 1. Add / Increase Quantity
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 2. Decrease Quantity 
  const decreaseQuantity = (id: number | string) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === id);
      if (!existing) return prevCart;
      
      if (existing.quantity <= 1) {
        return prevCart.filter((item) => item.id !== id);
      }
      
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // 3. Remove single item fully from the cart 
  const removeFromCart = (id: number | string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}