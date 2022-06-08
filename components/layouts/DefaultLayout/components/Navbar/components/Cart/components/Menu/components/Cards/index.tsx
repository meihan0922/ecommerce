import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useStore } from "@/stores";
import getStripe from "@/lib/stripe";
import MenuItem from "../../../MenuItem";

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
      acc += cartItem.price * cartItem.quantity;
      return acc;
    }, 0);
  });

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const cartItems = useStore.getState().cartItems;
    const cart = Object.values(cartItems);
    console.log(stripe, JSON.stringify(cart));
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (res.status === 500) return;

    const data = await res.json();

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

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
        <button
          className="bg-primary py-2 rounded-xl text-white w-4/5"
          onClick={handleCheckout}
        >
          PAY WITH STRIPE
        </button>
      </motion.div>
    </>
  );
};

export default Cards;
