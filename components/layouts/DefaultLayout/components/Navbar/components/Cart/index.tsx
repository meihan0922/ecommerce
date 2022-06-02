import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";
import { Menu } from "./components/Menu";
import { AiOutlineShopping } from "react-icons/ai";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 260px 30px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 260px 30px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="absolute right-0 top-0"
    >
      <motion.div
        className="z-10 absolute top-0 right-0 bottom-0 w-[300px] h-screen bg-slate-300"
        variants={sidebar}
      />
      <Menu />
      <button
        className="z-10 absolute right-4 top-2 rounded-[50%]"
        onClick={() => toggleOpen()}
      >
        <div className="rounded-full w-4 h-4 text-white bg-primary absolute -top-1 -right-1.5 text-xs">
          1
        </div>
        <AiOutlineShopping size={40} />
      </button>
    </motion.nav>
  );
};

export default Example;
