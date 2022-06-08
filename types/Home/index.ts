import { Image, Slug, SanityDocument } from "@sanity/types";

export interface IProducts extends SanityDocument {
  details: string;
  image: Image[];
  name: string;
  price: number;
  slug: Slug;
}

export interface IBanner extends SanityDocument {
  image: Image;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  discount: string;
  saleTime: string;
  midText: string;
  largeText1: string;
  largeText2: string;
}

export const CartStatus = {
  SOLD_OUT: 0,
  BETTING: 1,
  ERROR: 2,
} as const;
