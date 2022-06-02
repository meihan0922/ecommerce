/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IProducts } from "@/types/Home";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const ProductCard = ({ product }: { product: IProducts }) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <a>
          <div className="rounded-2xl bg-disable hover:scale-110 ease-in-out duration-300 cursor-pointer">
            <img
              src={urlFor(product?.image?.[0])}
              alt="product_img"
              width={250}
              height={250}
            />
          </div>
          <p className="font-medium">{product.name}</p>
          <p className="text-black font-extrabold">${product.price}</p>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
