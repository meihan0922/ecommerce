/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { IBanner } from "@/types/Home";
import { urlFor } from "@/lib/client";

const HeroBanner = ({ data }: { data: IBanner[] }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((item) => (
          <div
            key={item.product}
            className="flex flex-col justify-between mb-8 sm:mb-10 p-4 relative rounded-b-2xl md:rounded-2xl leading-tight md:py-8 md:px-6 xl:py-12 xl:px-10 bg-bg h-[490px] md:leading-none 2xl:mt-4"
          >
            <div className="relative">
              <p className="text-xl">{item.smallText}</p>
              <h2 className="text-3xl md:text-5xl font-semibold">
                {item.midText}
              </h2>
              <h1 className="text-9xl font-extrabold text-white">
                {item.largeText1}
              </h1>
              <img
                src={urlFor(item.image)}
                alt="headphones"
                className="absolute w-full max-w-[400px] sm:max-w-[460px] md:max-w-[500px] right-0 sm:-top-2 top-[30%] md:-top-12 md:right-[10%] lg:right-1/4  2xl:max-w-[680px] 2xl:-top-[130px] xl:-top-[100px] xl:max-w-[620px]"
              />
            </div>
            <div className="flex justify-between items-end sm:items-center">
              <Link href={`/product/${item.product}`}>
                <button className="text-xs rounded-2xl min-w-[100px] px-1 py-1 sm:py-2.5 sm:px-4 bg-primary text-white sm:text-lg font-medium cursor-pointer z-10">
                  {item.buttonText}
                </button>
              </Link>
              <div className="w-[300px] leading-tight flex flex-col text-tertiary">
                <h5 className="mt-3 font-bold self-end text-xs sm:text-xs md:text-base">
                  Description
                </h5>
                <p className="text-secondary font-thin text-right text-xs sm:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default HeroBanner;
