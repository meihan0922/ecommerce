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
    <div className="p-4 md:px-16 md:py-10 flex flex-col md:flex-row md:items-center xl:gap-5 bg-primary rounded-2xl relative leading-none text-white w-full mt-8 md:mt-10 lg:mt-16 2xl:mt-20">
      <div className="flex-auto md:flex-1 relative">
        <p className="">{discount}</p>
        <h2 className="font-black text-6xl xl:text-7xl md:mt-6 break-words">
          {largeText1}Tset
        </h2>
        <h2 className="font-black text-6xl xl:text-7xl">{largeText2}</h2>
        <p className="md:mt-5">{saleTime}</p>
      </div>
      <img
        src={urlFor(image)}
        className="md:absolute right-0 bottom-0 md:hidden 2xl:block 2xl:right-1/3 2xl:-bottom-16"
      />
      <div className="flex flex-col items-end md:flex-1">
        <p className="font-lg text-right hidden md:block">{smallText}</p>
        <h3 className="md:mt-6 font-extrabold text-5xl xl:text-6xl text-right hidden md:block">
          {midText}
        </h3>
        <p className="text-base md:text-lg text-right hidden md:block">
          {desc}
        </p>
        <Link href={`/product/${product}`}>
          <button
            className="md:mt-6 rounded-2xl px-2.5 md:py-4 py-2 bg-white text-primary border-none text-lg font-medium cursor-pointer"
            type="button"
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FooterBanner;
