import { type FC } from "react";

interface CampusCardProps {
  title: string;
  img: string;
  onClick: () => void;
}

const CampusCard: FC<CampusCardProps> = ({ title, img, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative h-[360px] w-full md:h-[420px] overflow-hidden md:rounded-3xl shadow-2xl transform transition duration-500 hover:scale-105 mx-6"
    >
      {/* Image */}
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h2 className="text-[#e5c47e] text-4xl md:text-6xl font-extralight text-center drop-shadow-2xl">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default CampusCard;
