import { motion } from "framer-motion";

interface Props {
  fly: {
    img: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null;
}

const FlyToCart = ({ fly }: Props) => {
  if (!fly) return null;

  return (
    <motion.img
      src={fly.img}
      initial={{
        x: fly.startX,
        y: fly.startY,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: fly.endX,
        y: fly.endY,
        scale: 0.2,
        opacity: 0,
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="fixed top-0 left-0 w-16 h-16 object-cover rounded-xl pointer-events-none z-[9999]"
    />
  );
};

export default FlyToCart;
