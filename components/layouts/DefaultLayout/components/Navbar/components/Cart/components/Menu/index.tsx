import { motion } from "framer-motion";
import { useStore } from "@/stores";
import useDimensions from "@/hooks/useDimensions";
import Empty from "./components/Empty";
import Cards from "./components/Cards";

const sidebar = {
  open: ({ height = 1000 }) => ({
    clipPath: `circle(${height * 1.7}px at 260px 30px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 360px 30px)",
    transition: {
      delay: 0.35,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const bg = {
  open: {
    display: "block",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    display: "none",
    transition: {
      delay: 0.7,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Menu = ({ toggleOpen }) => {
  const { height } = useDimensions();
  const hasCart = useStore((state) => state.cartItemIds.length > 0);

  return (
    <>
      <motion.div
        className="z-20 absolute top-0 right-0 bottom-0 w-[400px] h-screen bg-white"
        custom={{ height }}
        variants={sidebar}
      />
      <motion.div
        className="z-10 absolute top-0 right-0 bottom-0 w-screen h-screen bg-black opacity-40"
        variants={bg}
        onClick={() => toggleOpen()}
      />
      <motion.div
        className="flex flex-col justify-between h-screen z-30 absolute right-0 w-[400px] p-6 pt-14 overflow-y-auto"
        variants={variants}
      >
        {hasCart ? <Cards /> : <Empty />}
      </motion.div>
    </>
  );
};
