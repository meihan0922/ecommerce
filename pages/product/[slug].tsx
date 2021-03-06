/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { GetStaticProps } from "next";
import { IProducts } from "@/types/Home";
import { client } from "@/lib/client";
import { ParsedUrlQuery } from "querystring";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "@/components/shared/ProductCard";
import ProductImages from "@/components/pages/Products/components/ProductImages";
import ProductInfo from "@/components/pages/Products/components/ProductInfo";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const ProductDetails = ({
  product,
  products,
}: {
  product: IProducts;
  products: IProducts[];
}) => {
  const { image } = product;
  return (
    <div className="sm:px-6 sm:pt-5">
      <div className="flex text-tertiary flex-col md:flex-row md:gap-10">
        <ProductImages images={image} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-5 md:mt-5 overflow-hidden">
        <h2 className="text-center my-2 md:m-7 text-tertiary">
          You may also like
        </h2>
        <div className="px-2">
          <Slider {...settings}>
            {products.map((item) => (
              <ProductCard key={item.slug.current} product={item} />
            ))}
          </Slider>
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
