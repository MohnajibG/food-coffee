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
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
            className="relative cursor-pointer rounded-2xl border border-black/5 bg-white p-3 shadow-sm transition hover:shadow-lg sm:p-4"
          >
            <div className="flex min-h-28 items-start gap-3 sm:min-h-36 sm:flex-col">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-black/5 sm:aspect-[4/3] sm:h-auto sm:w-full">
                <img
                  src={item.photos?.[0]}
                  alt={item.name || "Product"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col self-stretch">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="min-w-0 text-base font-semibold leading-snug text-[#212121]">
                    {item.name || "Unnamed"}
                  </h4>
                  <p className="shrink-0 text-sm font-bold text-[#50741f]">
                    {price.toFixed(2)} €
                  </p>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#212121]/70 sm:line-clamp-3">
                  {item.description?.slice(0, 110) || ""}
                </p>
                <span className="mt-auto pt-3 text-sm font-semibold text-[#50741f]">
                  View details
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductGrid;
