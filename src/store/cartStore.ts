import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

interface CartItem { product: Product; qty: number }
interface CartStore { items: CartItem[]; add: (p: Product) => void; remove: (id: string) => void; clear: () => void; total: () => number; count: () => number; }
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p) => set({ items: [...get().items, { product: p, qty: 1 }] }),
      remove: (id) => set({ items: get().items.filter(i => i.product.id !== id) }),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.product.priceMAD * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: 'kin-cart' }
  )
);
