/* eslint-disable @next/next/no-img-element */
import { IProducts } from "@/types/Home";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const ProductCard = ({ product }: { product: IProducts }) => {
  return (
    <Link href={`/product/${product.slug.current}`}>
      <a>
        <div className="rounded-2xl bg-disable ease-in-out duration-300 cursor-pointer">
          <img
            src={urlFor(product?.image?.[0])}
            alt="product_img"
            width="100%"
            height="100%"
          />
        </div>
        <p className="inline-block w-full font-medium break-words mt-1 md:mt-3">
          {product.name}
        </p>
        {/* <p className="text-black font-extrabold text-right">
            ${product.price}
          </p> */}
      </a>
    </Link>
  );
};

export default ProductCard;
