import { motion } from "framer-motion";
import MenuItem from "../../../MenuItem";
import { useStore } from "@/stores";

const btnVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Cards = () => {
  const cartItemIds = useStore((state) => state.cartItemIds);
  const total = useStore((state) => {
    return state.cartItemIds.reduce((acc, id) => {
      const cartItem = state.cartItems[id];
      acc += cartItem.price * cartItem.qty;
      return acc;
    }, 0);
  });

  return (
    <>
      <ul>
        {cartItemIds.map((id) => (
          <MenuItem id={id} key={id} />
        ))}
      </ul>
      <motion.div
        variants={btnVariants}
        className="flex gap-4 flex-col items-center"
      >
        <p className="text-tertiary font-semibold self-end">Total: ${total}</p>
        <button className="bg-primary py-2 rounded-xl text-white w-4/5">
          PAY WITH STRIPE
        </button>
      </motion.div>
    </>
  );
};

export default Cards;
