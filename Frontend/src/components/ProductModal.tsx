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

  const price = Number(product.price) || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:items-center sm:p-6"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 350 }}
            animate={{ y: 0 }}
            exit={{ y: 350 }}
            transition={{ duration: 0.35 }}
            className="max-h-[92svh] w-full overflow-y-auto rounded-t-3xl border border-black/5 bg-white p-4 shadow-2xl sm:max-w-xl sm:rounded-3xl sm:p-5"
          >
            <img
              src={product.photos?.[0]}
              className="modal-product-img h-56 w-full rounded-2xl object-cover shadow-inner sm:h-64"
              alt={product.name || "Product"}
            />
            <h3 className="mt-4 text-2xl font-bold text-[#212121] sm:text-3xl">
              {product.name || "Unnamed"}
            </h3>
            <p className="mt-1 text-lg font-semibold text-[#50741f] sm:text-xl">
              {price.toFixed(2)} €
            </p>
            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-[#212121]/75 sm:text-base">
                {product.description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1eadc] text-2xl text-[#212121]"
              >
                –
              </button>
              <span className="min-w-8 text-center text-2xl font-semibold text-[#212121]">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1eadc] text-2xl text-[#212121]"
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
              className="mt-8 w-full rounded-xl bg-linear-to-r from-[#50741f] to-[#3f5e13] py-3.5 text-lg font-semibold text-white shadow-lg"
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
