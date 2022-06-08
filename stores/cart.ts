import type { SetState, GetState } from "zustand";
import update from "immutability-helper";
import { GlobalStoreState } from ".";
import { IProducts, IBanner, CartStatus } from "@/types/Home";

type keyString = keyof typeof CartStatus;
export interface ICartItemData extends IProducts {
  status: typeof CartStatus[keyString];
  quantity: number;
}

export interface ICartState {
  cartItems: { [key: string]: ICartItemData };
  cartItemIds: Array<string>;
  updateCartItem: (id: string, key: string, value: number) => void;
  removeCartItemById: (id: string) => void;
  addCartItem: (id: string, obj: ICartItemData) => void;
  updateQty: (id: string, type: "add" | "sub") => void;
  clearAll: () => void;
}

export const createCartSlice = (
  set: SetState<GlobalStoreState>,
  get: GetState<GlobalStoreState>
) => ({
  cartItems: {},
  cartItemIds: [],
  addCartItem: (id: string, obj: ICartItemData) => {
    set((prev) => {
      console.log("????", prev.cartItemIds);
      const nextCartItems = update(prev.cartItems, {
        $merge: {
          [id]: obj,
        },
      });
      if (prev.cartItemIds.includes(id)) {
        return {
          cartItems: nextCartItems,
          cartItemIds: prev.cartItemIds,
        };
      } else {
        const nextCartItemIds = update(prev.cartItemIds, { $push: [id] });
        return {
          cartItemIds: nextCartItemIds,
          cartItems: nextCartItems,
        };
      }
    });
  },
  removeCartItemById: (id: string) =>
    set((prev) => {
      const findKeyIndex = prev.cartItemIds.indexOf(id);
      const nextCartItemIds = update(prev.cartItemIds, {
        $splice: [[findKeyIndex, 1]],
      });
      const nextCartItems = update(prev.cartItems, { $unset: [id] });
      return {
        cartItemIds: nextCartItemIds,
        cartItems: nextCartItems,
      };
    }),
  updateCartItem: (id: string, key: string, value: number) =>
    set((prev) => {
      if (prev.cartItemIds.includes(id)) {
        const nextCartItems = update(prev.cartItems, {
          [id]: {
            $merge: { [key]: value },
          },
        });
        return {
          cartItems: nextCartItems,
        };
      }
      return prev;
    }),
  clearAll: () =>
    set(() => ({
      cartItemIds: [],
      cartItems: {},
    })),
  updateQty: (id: string, type: "add" | "sub") =>
    set((prev) => {
      if (prev.cartItemIds.includes(id)) {
        let qty = prev.cartItems[id].quantity;
        if (type === "add") {
          ++qty;
        } else if (type === "sub" && qty > 2) {
          --qty;
        }
        const nextCartItems = update(prev.cartItems, {
          [id]: {
            $merge: {
              quantity: qty,
            },
          },
        });
        return {
          cartItems: nextCartItems,
        };
      }
      return prev;
    }),
});
