/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IProducts } from "@/types/Home";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const ProductCard = ({ product }: { product: IProducts }) => {
  return (
    <div className="w-[250px] min-h-[250px]">
      <Link href={`/product/${product.slug.current}`}>
        <a>
          <div className="rounded-2xl bg-disable hover:scale-110 ease-in-out duration-300 cursor-pointer">
            <img
              src={urlFor(product?.image?.[0])}
              alt="product_img"
              width="100%"
              height="100%"
            />
          </div>
          <p className="inline-block w-full font-medium break-words mt-3">
            {product.name}
          </p>
          {/* <p className="text-black font-extrabold text-right">
            ${product.price}
          </p> */}
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
