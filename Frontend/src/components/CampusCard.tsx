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
      className="cursor-pointer relative h-[420px] overflow-hidden shadow-2xl rounded-3xl hover:scale-[1.04] transition-transform duration-700"
    >
      <img src={img} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2
          className="text-[#212121] text-5xl font-extrabold drop-shadow-xl"
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

export default CampusCard;
