/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { GetStaticProps } from "next";
import cx from "classnames";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { IProducts, IBanner } from "@/types/Home";
import { client, urlFor } from "../../lib/client";
import { ParsedUrlQuery } from "querystring";
import ProductCard from "@/components/shared/ProductCard";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
// import { Product } from "../../components";
// import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({
  product,
  products,
}: {
  product: IProducts;
  products: IProducts[];
}) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);

  //   const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  //   const handleBuyNow = () => {
  //     onAdd(product, qty);

  //     setShowCart(true);
  //   }

  return (
    <div>
      <div className="flex gap-10 m-10 mt-16 text-tertiary flex-wrap md:flex-nowrap">
        <div className="w-[350px] h-[350px] md:w-[400px] md:h-[400px]">
          <img
            alt="image for item"
            src={urlFor(image && image[index])}
            className="rounded-2xl bg-disable w-full cursor-pointer ease-in-out duration-300 hover:bg-primary"
          />
          <div className="flex gap-2.5 mt-5">
            {image?.map((item, i) => (
              <img
                alt="image for item"
                key={i}
                src={urlFor(item)}
                className={cx(
                  "rounded-lg bg-disable w-[70px] h-[70px] cursor-pointer",
                  {
                    "bg-primary": i === index,
                  }
                )}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between h-[400px]">
          <div>
            <h3 className="text-4xl font-extrabold ">{name}</h3>
            <div className="w-full text-primary mt-2.5 flex gap-1 items-center">
              <div className="flex">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p className="text-tertiary mt-0">(20)</p>
            </div>
            <h4 className="mt-2.5 font-semibold">Details: </h4>
            <p className="mt-1 text-secondary">{details}</p>
            <div className="flex items-center justify-between mt-5">
              <p className="font-bold text-3xl items-center text-primary">
                ${price}
              </p>
              <div className="flex gap-5 items-center">
                <p className="border flex items-center justify-between border-disable cursor-pointer">
                  <span
                    className={cx(
                      "px-2.5 py-3 border-r border-r-disable text-primary",
                      { "text-disable": qty === 1 }
                    )}
                    //   onClick={decQty}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className="text-xl px-3.5">{1}</span>
                  <span
                    className="px-2.5 py-3 border-l border-l-disable text-primary"
                    //   onClick={incQty}
                  >
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-7 place-self-end">
            <button
              type="button"
              className="px-1.5 py-4 border border-primary text-lg font-medium bg-white text-primary cursor-pointer w-36 md:w-52 scale-100 duration-200 ease-in hover:scale-105"
              // onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="px-1.5 py-4 text-lg font-medium text-white bg-primary cursor-pointer w-36 md:w-52 scale-100 duration-200 ease-in hover:scale-105"
              // onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <h2 className="text-center m-7 text-tertiary">You may also like</h2>
        <div className="flex justify-center gap-4 mt-5">
          {products.map((item) => (
            <ProductCard key={item.slug.current} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;

  const products = await client.fetch<IProducts[]>(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};
