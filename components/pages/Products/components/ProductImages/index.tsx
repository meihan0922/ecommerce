/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { urlFor } from "@/lib/client";
import cx from "classnames";

const ProductImages = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full h-full md:max-w-md">
      <img
        alt="image for item"
        src={urlFor(images && images[index])}
        className="sm:rounded-2xl bg-disable w-full ease-in-out duration-300 "
      />
      <div className="grid grid-cols-5 gap-2 p-2.5 pb-4 md:gap-2.5 md:mt-2 md:p-0">
        {images?.map((item, i) => (
          <img
            alt="image for item"
            key={i}
            src={urlFor(item)}
            className={cx("rounded-lg bg-disable cursor-pointer", {
              "bg-primary": i === index,
            })}
            onMouseEnter={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
