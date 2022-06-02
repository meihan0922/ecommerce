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
            className="relative rounded-2xl leading-tight py-24 px-10 bg-bg h-[500px] md:h-[560px] md:leading-none"
          >
            <div>
              <p className="text-xl">{item.smallText}</p>
              <h2 className="text-5xl font-semibold">{item.midText}</h2>
              <h1 className="text-9xl font-extrabold text-white">
                {item.largeText1}
              </h1>
              <img
                src={urlFor(item.image)}
                alt="headphones"
                className="absolute -top-14 right-1/4 w-[620px] h-[620px]"
              />
              <div>
                <Link href={`/product/${item.product}`}>
                  <button className="rounded-2xl py-2.5 px-4 bg-primary text-white mt-10 text-lg font-medium cursor-pointer z-10 md:mt-7">
                    {item.buttonText}
                  </button>
                </Link>
                <div className="absolute right-8 bottom-7 w-[300px] leading-tight flex flex-col text-tertiary">
                  <h5 className="mt-3 font-bold self-end">Description</h5>
                  <p className="text-secondary font-thin text-right">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default HeroBanner;
