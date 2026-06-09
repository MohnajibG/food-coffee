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
    <div className="flex w-full snap-x gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
      {categories.map((cat) => {
        const isSelected = selected === cat;
        return (
          <motion.div
            key={cat}
            role="button"
            aria-pressed={isSelected}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(cat)}
            className={`snap-start whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-semibold uppercase shadow-sm transition md:w-full md:rounded-xl md:px-4 md:text-left ${
              isSelected
                ? "border-[#50741f] bg-linear-to-r from-[#50741f] to-[#3f5e13] text-white"
                : "border-black/10 bg-white text-[#212121] hover:border-[#50741f]/40"
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
