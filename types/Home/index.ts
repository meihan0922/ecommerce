import { Image, Slug } from "@sanity/types";

export interface IProducts {
  details: string;
  image: Image[];
  name: string;
  price: number;
  slug: Slug;
}

export interface IBanner {
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
