import React from "react";
import Header from "@/components/pages/Home/components/ProductHeader";
import HeroBanner from "@/components/pages/Home/components/HeroBanner";
import FooterBanner from "@/components/pages/Home/components/FooterBanner";
import ProductCard from "@/components/shared/ProductCard";
import { client } from "@/lib/client";
import { IProducts, IBanner } from "@/types/Home";

const Home = ({
  banner,
  products,
}: {
  products: IProducts[];
  banner: IBanner[];
}) => {
  return (
    <>
      <HeroBanner data={banner} />
      <Header />
      <div className="flex flex-wrap justify-center gap-5 mt-5">
        {products?.map((product) => (
          <ProductCard key={product.slug.current} product={product} />
        ))}
      </div>
      <FooterBanner data={banner?.[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch<IProducts>(query);

  const bannerQuery = '*[_type=="banner"]';
  const banner = await client.fetch<IBanner>(bannerQuery);

  return {
    props: {
      products,
      banner,
    },
  };
};

export default Home;
