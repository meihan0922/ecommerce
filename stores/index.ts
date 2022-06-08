import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createCartSlice, ICartState } from "./cart";

export type GlobalStoreState = ICartState;

export const useStore = create<GlobalStoreState>(
  devtools(
    persist(
      (set, get) => ({
        ...createCartSlice(set, get),
      }),
      {
        name: "ecommerce", // name of item in the storage (must be unique)
        // 將state序列化成字串儲存
        deserialize: (str) => JSON.parse(decodeURIComponent(escape(atob(str)))),
        serialize: (state) =>
          btoa(unescape(encodeURIComponent(JSON.stringify(state)))),
        partialize: (state) => {
          return {
            cartItems: state.cartItems,
            cartItemIds: state.cartItemIds,
          };
        },
      }
    )
  )
);
