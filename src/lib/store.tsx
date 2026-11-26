"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, Order } from "./types";
import { PRODUCTS } from "./products";

type User = { name: string; email: string };

type Store = {
  cart: CartLine[];
  wishlist: string[];
  orders: Order[];
  user: User | null;
  cartCount: number;
  addToCart: (line: CartLine) => void;
  updateQty: (i: number, qty: number) => void;
  removeLine: (i: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  placeOrder: (o: Order) => void;
  login: (u: User) => void;
  logout: () => void;
};

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Intentional one-time hydration: localStorage is only readable after mount.
    /* eslint-disable react-hooks/set-state-in-effect */
    setCart(load("dd-cart", []));
    setWishlist(load("dd-wishlist", []));
    setOrders(load("dd-orders", []));
    setUser(load("dd-user", null));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("dd-cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("dd-wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("dd-orders", JSON.stringify(orders)); }, [orders, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("dd-user", JSON.stringify(user)); }, [user, hydrated]);

  const addToCart = useCallback((line: CartLine) => {
    setCart((c) => {
      const i = c.findIndex((l) => l.productId === line.productId && l.size === line.size && l.color === line.color);
      if (i >= 0) {
        const next = [...c];
        next[i] = { ...next[i], qty: next[i].qty + line.qty };
        return next;
      }
      return [...c, line];
    });
  }, []);

  const updateQty = useCallback((i: number, qty: number) => {
    setCart((c) => c.map((l, j) => (j === i ? { ...l, qty: Math.max(1, qty) } : l)));
  }, []);

  const removeLine = useCallback((i: number) => setCart((c) => c.filter((_, j) => j !== i)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, []);

  const placeOrder = useCallback((o: Order) => setOrders((os) => [o, ...os]), []);
  const login = useCallback((u: User) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);

  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);

  const value = useMemo(
    () => ({ cart, wishlist, orders, user, cartCount, addToCart, updateQty, removeLine, clearCart, toggleWishlist, placeOrder, login, logout }),
    [cart, wishlist, orders, user, cartCount, addToCart, updateQty, removeLine, clearCart, toggleWishlist, placeOrder, login, logout]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function cartLinesDetailed(cart: CartLine[]) {
  return cart.map((l) => {
    const product = PRODUCTS.find((p) => p.id === l.productId)!;
    return { ...l, product, lineTotal: product.price * l.qty };
  });
}

export const fmt = (n: number) => `$${n.toFixed(2)}`;
