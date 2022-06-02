/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { IBanner } from "@/types/Home";

import { urlFor } from "@/lib/client";

const FooterBanner = ({ data }: { data: IBanner }) => {
  if (!data) return null;
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  } = data;
  return (
    <div className="py-10 px-24 bg-primary rounded-2xl relative h-[560px] leading-none text-white w-full mt-20 md:h-[400px] md:mt-28">
      <div className="flex justify-between flex-wrap gap-5 md:flex-nowrap md:gap-6">
        <div className="left">
          <p className="m-5 md:m-4">{discount}</p>
          <h2 className="font-black text-7xl mt-6">{largeText1}</h2>
          <h2 className="font-black text-7xl mt-6">{largeText2}</h2>
          <p className="m-5 md:m-4">{saleTime}</p>
        </div>
        <div className="leading-snug">
          <p className="font-lg">{smallText}</p>
          <h3 className="font-extrabold text-5xl md:text-6xl">{midText}</h3>
          <p className="text-base md:text-lg">{desc}</p>
          <Link href={`/product/${product}`}>
            <button
              className="rounded-2xl px-2.5 py-4 bg-white text-primary border-none mt-10 text-lg font-medium cursor-pointer"
              type="button"
            >
              {buttonText}
            </button>
          </Link>
        </div>

        <img src={urlFor(image)} className="absolute left-1/4 -top-1/4" />
      </div>
    </div>
  );
};

export default FooterBanner;
