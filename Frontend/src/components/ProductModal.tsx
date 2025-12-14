/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductModalProps {
  isOpen: boolean;
  product: any;
  onClose: () => void;
  onAdd: (p: any, img: HTMLImageElement | null) => void;
}

const ProductModal: FC<ProductModalProps> = ({
  isOpen,
  product,
  onClose,
  onAdd,
}) => {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  const price = Number(product.price) || 0; // <-- sécurisation

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 350 }}
            animate={{ y: 0 }}
            exit={{ y: 350 }}
            transition={{ duration: 0.35 }}
            className="bg-white/6 backdrop-blur-lg border border-white/10 rounded-t-3xl w-full max-h-[90vh] p-5 overflow-y-auto shadow-2xl"
          >
            <img
              src={product.photos?.[0]}
              className="modal-product-img w-full h-56 md:h-64 object-cover rounded-2xl shadow-inner"
              alt={product.name || "Product"}
            />
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-4 drop-shadow">
              {product.name || "Unnamed"}
            </h3>
            <p className="text-lg md:text-xl font-semibold text-white/90 mt-1">
              {price.toFixed(2)} €
            </p>
            {product.description && (
              <p className="mt-4 text-sm md:text-base text-white/80">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="w-12 h-12 bg-white/8 rounded-full text-2xl"
              >
                –
              </button>
              <span className="text-2xl font-semibold text-white">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-12 h-12 bg-white/8 rounded-full text-2xl"
              >
                +
              </button>
            </div>

            <motion.button
              onClick={() => {
                onAdd(
                  { ...product, qty },
                  document.querySelector(".modal-product-img")
                );
                setQty(1);
                onClose();
              }}
              whileHover={{ scale: 1.02 }}
              className="mt-8 w-full bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              Add to cart
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
