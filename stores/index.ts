import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createCartSlice, ICartState } from "./cart";

export type GlobalStoreState = ICartState;

export const useStore = create<GlobalStoreState>(
  // 這個版本zustand devtools會報錯，待解之後更新
  // devtools(
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
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartItemIds: state.cartItemIds,
      }),
    }
  )
  //   )
);
