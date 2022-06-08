import { useState, useCallback } from "react";
import cx from "classnames";
import { motion } from "framer-motion";
import { IProducts, CartStatus } from "@/types/Home";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useStore } from "@/stores";
import { toast } from "react-hot-toast";

const ProductInfo = ({ product }: { product: IProducts }) => {
  const [qty, setQty] = useState(1);
  const { name, details, price, _id } = product;
  const addCartItem = useStore((state) => state.addCartItem);
  const cartItems = useStore((state) => state.cartItems);

  const handleAddCart = () => {
    toast.success(`${qty} ${product.name} added to the cart.`);
    addCartItem(_id, {
      quantity: qty,
      status: CartStatus.BETTING,
      ...product,
    });
  };

  const handleBuyNow = () => {};

  const add = () => setQty((prev) => ++prev);
  const sub = () => setQty((prev) => --prev);

  return (
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
            <div className="border flex items-center justify-between border-disable cursor-pointer">
              <button
                className={cx(
                  "px-2.5 py-3 border-r border-r-disable text-primary",
                  { "text-disable": qty === 1 }
                )}
                onClick={sub}
              >
                <AiOutlineMinus />
              </button>
              <p className="text-xl px-3.5">{qty}</p>
              <button
                className="px-2.5 py-3 border-l border-l-disable text-primary"
                onClick={add}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-7 justify-end mt-10">
          <motion.button
            className="px-1.5 py-4 border border-primary text-lg font-medium bg-white text-primary cursor-pointer w-36 md:w-52"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddCart}
          >
            Add to Cart
          </motion.button>
          <motion.button
            className="px-1.5 py-4 text-lg font-medium text-white bg-primary cursor-pointer w-36 md:w-52"
            onClick={handleBuyNow}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
