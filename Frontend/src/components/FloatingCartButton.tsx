import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import type { RefObject } from "react";

interface Props {
  count: number;
  onClick: () => void;
  cartRef: RefObject<HTMLButtonElement | null>;
}

const FloatingCartButton = ({ count, onClick, cartRef }: Props) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        ref={cartRef}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative p-4 rounded-2xl bg-[#212121]/80 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <FiShoppingCart size={26} className="text-white" />

        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#50741f] text-white text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default FloatingCartButton;
