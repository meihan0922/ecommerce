import cx from "classnames";
import { motion } from "framer-motion";
import { useStore } from "@/stores";
import { urlFor } from "@/lib/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ id }: { id: string }) => {
  const cartItems = useStore((state) => state.cartItems?.[id]);
  const removeCartItemById = useStore((state) => state.removeCartItemById);
  const updateQty = useStore((state) => state.updateQty);
  if (!id) return;

  return (
    <motion.li variants={variants} className="mb-5 flex gap-3">
      <div className="w-1/3 rounded-2xl bg-disable ease-in-out duration-300 cursor-pointer">
        <img src={urlFor(cartItems?.image[0])} />
      </div>
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex justify-between text-tertiary font-semibold">
          <h5>{cartItems.name}</h5>
          <h4>${cartItems.price}</h4>
        </div>
        <div className="flex justify-between bottom">
          <div className="flex gap-5 items-center">
            <p className="border flex items-center justify-between border-disable cursor-pointer">
              <button
                className={cx(
                  "px-2 py-2 border-r border-r-disable text-primary",
                  { "text-disable": cartItems.qty === 1 }
                )}
                onClick={() => updateQty(cartItems._id, "sub")}
              >
                <AiOutlineMinus size={14} />
              </button>
              <span className="px-3.5">{cartItems.quantity}</span>
              <button
                className="px-2 py-2 border-l border-l-disable text-primary"
                onClick={() => updateQty(cartItems._id, "add")}
              >
                <AiOutlinePlus size={14} />
              </button>
            </p>
          </div>
          <button
            type="button"
            className="text-primary"
            onClick={() => removeCartItemById(cartItems._id)}
          >
            <TiDeleteOutline size={20} />
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default MenuItem;
