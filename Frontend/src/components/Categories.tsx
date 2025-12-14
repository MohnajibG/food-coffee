import type { FC } from "react";
import { motion } from "framer-motion";
import dataCafeteria from "../data/cafeterias.json";

interface CategoriesProps {
  selected: keyof typeof dataCafeteria | null;
  onSelect: (c: keyof typeof dataCafeteria) => void;
}

const Categories: FC<CategoriesProps> = ({ selected, onSelect }) => {
  const categories = Object.keys(
    dataCafeteria
  ) as (keyof typeof dataCafeteria)[];

  return (
    <div className="flex flex-row md:flex-col gap-3 px-4 py-3 w-full items-center md:items-start justify-center md:justify-start overflow-x-auto md:overflow-visible">
      {categories.map((cat) => {
        const isSelected = selected === cat;
        return (
          <motion.div
            key={cat}
            role="button"
            aria-pressed={isSelected}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full border whitespace-nowrap shadow-sm text-sm font-medium cursor-pointer uppercase ${
              isSelected
                ? "bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white"
                : "bg-white/6 text-[#212121] border-white/6"
            }`}
          >
            {cat.replace(/_/g, " ")}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Categories;
