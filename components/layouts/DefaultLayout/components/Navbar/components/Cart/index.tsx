import { useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import { Menu } from "./components/Menu";
import { AiOutlineShopping } from "react-icons/ai";
import { useStore } from "@/stores";

const Cart = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const cartQty = useStore((state) => {
    return state.cartItemIds.reduce((acc, id) => {
      acc += state.cartItems[id].quantity;
      return acc;
    }, 0);
  });

  useEffect(() => {
    const body = document.querySelector("body").style;
    if (isOpen) {
      body.overflowY = "hidden";
    } else {
      body.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="absolute right-0 top-0"
    >
      <div style={{ pointerEvents: isOpen ? "auto" : "none" }}>
        <Menu toggleOpen={toggleOpen} />
      </div>
      <button
        className="z-30 absolute right-4 top-2 rounded-[50%]"
        // toggleOpen的型態導致不能寫成onClick={toggle}
        onClick={() => toggleOpen()}
      >
        <div className="rounded-full w-4 h-4 text-white bg-primary absolute -top-1 -right-1.5 text-xs">
          {cartQty}
        </div>
        <AiOutlineShopping size={40} />
      </button>
    </motion.nav>
  );
};

export default Cart;
