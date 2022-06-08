/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import { IProducts } from "@/types/Home";
import { client } from "../../lib/client";
import { ParsedUrlQuery } from "querystring";
import ProductCard from "@/components/shared/ProductCard";
import ProductImages from "@/components/pages/Products/components/ProductImages";
import ProductInfo from "@/components/pages/Products/components/ProductInfo";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const ProductDetails = ({
  product,
  products,
}: {
  product: IProducts;
  products: IProducts[];
}) => {
  const { image } = product;
  return (
    <div>
      <div className="flex gap-10 m-10 mt-16 text-tertiary flex-wrap md:flex-nowrap">
        <ProductImages images={image} />
        <ProductInfo product={product} />
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
