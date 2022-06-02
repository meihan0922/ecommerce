import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "../MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Menu = () => (
  <motion.ul
    className="z-20 absolute right-0 top-[50px] w-[300px] p-6"
    variants={variants}
  >
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];
