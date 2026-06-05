"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { QuoteCartItem, QuoteCustomerDetails } from "@/types/quote";

const defaultCustomerDetails: QuoteCustomerDetails = {
  name: "",
  companyName: "",
  phoneNumber: "",
  email: "",
  deliveryArea: "",
  requiredDate: "",
  orderType: "Quotation only",
  extraMessage: "",
};

interface QuoteCartStore {
  items: QuoteCartItem[];
  customerDetails: QuoteCustomerDetails;
  addItem: (item: Omit<QuoteCartItem, "id">) => void;
  updateItem: (itemId: string, updates: Partial<QuoteCartItem>) => void;
  removeItem: (itemId: string) => void;
  clearItems: () => void;
  setCustomerDetails: (updates: Partial<QuoteCustomerDetails>) => void;
  clearCustomerDetails: () => void;
}

export const useQuoteCartStore = create<QuoteCartStore>()(
  persist(
    (set) => ({
      items: [],
      customerDetails: defaultCustomerDetails,
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
            },
          ],
        })),
      updateItem: (itemId, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, ...updates } : item,
          ),
        })),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      clearItems: () => set({ items: [] }),
      setCustomerDetails: (updates) =>
        set((state) => ({
          customerDetails: {
            ...state.customerDetails,
            ...updates,
          },
        })),
      clearCustomerDetails: () => set({ customerDetails: defaultCustomerDetails }),
    }),
    {
      name: "plastic-supply-pro:quote-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        customerDetails: state.customerDetails,
      }),
    },
  ),
);
