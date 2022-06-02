import type { SetState, GetState } from "zustand";
import update from "immutability-helper";
import { GlobalStoreState } from ".";

export enum CartStatus {
  SOLD_OUT = 0,
  BETTING = 1,
  ERROR = 2,
}

export interface ICartItemData {
  cartId: string;
  status: string;
  qty: number;
}

export interface ICartState {
  cartItems: { [key: string]: ICartItemData };
  cartItemIds: Set<string>;
  updateCartItem: (id: string, key: string, value: number) => void;
  removeCartItemById: (id: string) => void;
  addCartItem: (id: string, obj: ICartItemData) => void;
}

export const createCartSlice = (
  set: SetState<GlobalStoreState>,
  get: GetState<GlobalStoreState>
) => ({
  cartItems: {},
  cartItemIds: new Set() as Set<string>,
  addCartItem: (id: string, obj: ICartItemData) => {
    set((prev) => {
      const nextCartItems = update(prev.cartItems, {
        $merge: {
          [id]: obj,
        },
      });
      const nextCartItemIds = update(prev.cartItemIds, { $add: [id] });
      return {
        cartItemIds: nextCartItemIds,
        cartItems: nextCartItems,
      };
    });
  },
  removeCartItemById: (id: string) =>
    set((prev) => {
      const nextCartItemIds = update(prev.cartItemIds, { $remove: [id] });
      const nextCartItems = update(prev.cartItems, { $unset: [id] });
      return {
        cartItemIds: nextCartItemIds,
        cartItems: nextCartItems,
      };
    }),
  updateCartItem: (id: string, key: string, value: number) =>
    set((prev) => {
      if (prev.cartItemIds.has(id)) {
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
});
