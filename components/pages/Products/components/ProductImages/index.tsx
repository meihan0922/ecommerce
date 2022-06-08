/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { urlFor } from "@/lib/client";
import cx from "classnames";

const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-[350px] h-[350px] md:w-[400px] md:h-[400px]">
      <img
        alt="image for item"
        src={urlFor(images && images[index])}
        className="rounded-2xl bg-disable w-full ease-in-out duration-300 "
      />
      <div className="flex gap-2.5 mt-5">
        {images?.map((item, i) => (
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
  );
};

export default ProductImages;
