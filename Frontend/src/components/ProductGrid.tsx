/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { motion } from "framer-motion";
import dataCafeteria from "../data/cafeterias.json";

interface ProductGridProps {
  onAdd: (p: any, img: HTMLImageElement | null) => void;
  selectedCat: keyof typeof dataCafeteria | null;
  setProduct: (p: any) => void;
}

const ProductGrid: FC<ProductGridProps> = ({ selectedCat, setProduct }) => {
  if (!selectedCat) return null;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 gap-6"
    >
      {dataCafeteria[selectedCat].map((item: any, i: number) => {
        const price = Number(item.price) || 0; // Sécurisation

        return (
          <motion.div
            key={i}
            onClick={() => setProduct(item)}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="relative p-4 rounded-2xl bg-white/4 backdrop-blur-sm border border-white/8 shadow-lg cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/8 shrink-0">
                <img
                  src={item.photos?.[0]}
                  alt={item.name || "Product"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-[#212121] font-semibold">
                  {item.name || "Unnamed"}
                </h4>
                <p className="text-[#212121]/80 mt-1 text-justify">
                  {item.description?.slice(0, 80) || ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-black/95">{price.toFixed(2)} €</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductGrid;
