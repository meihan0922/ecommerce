import { motion } from "framer-motion";
import { AiOutlineShopping } from "react-icons/ai";

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

const Empty = () => {
  return (
    <motion.div
      variants={btnVariants}
      className="flex gap-4 flex-col items-center"
    >
      <AiOutlineShopping size={150} />
      <h3>Your shopping bag is empty</h3>
    </motion.div>
  );
};

export default Empty;
