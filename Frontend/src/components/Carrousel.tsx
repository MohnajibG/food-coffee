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
      className="cursor-pointer relative h-[380px] w-full md:h-[420px] overflow-hidden shadow-2xl rounded-3xl hover:scale-[1.04] transition-transform duration-700"
    >
      <img src={img} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-(--color-accent) text-5xl md:text-6xl font-extrabold drop-shadow-xl text-center px-4">
          {title}
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-linear-to-t from-(--color-accent) to-transparent" />
    </div>
  );
};

export default CampusCard;
