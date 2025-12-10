import { type FC } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carrousel";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hours: string;
  address: string;
  menu: string;
  photos: Array<string | undefined>;
}

const CampusModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  hours,
  address,
  menu,
  photos,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 max-md:items-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 w-full max-w-lg p-6 relative shadow-2xl md:rounded-2xl max-md:rounded-t-3xl max-md:h-[90vh] max-md:overflow-y-auto flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-3xl"
        >
          ×
        </button>

        <Carousel
          photos={photos}
          isOpen={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
          title={""}
          hours={""}
          address={""}
          menu={""}
        />

        <h3 className="text-4xl font-extrabold text-gold mt-6 mb-4 drop-shadow-lg text-center">
          {title}
        </h3>

        <div className="space-y-4 text-gray-700 pb-6 text-lg flex-1">
          <p>
            <span className="font-semibold">Hours:</span>
            <br />
            {hours}
          </p>
          <p>
            <span className="font-semibold">Address:</span>
            <br />
            {address}
          </p>
          <p>
            <span className="font-semibold">Today's Menu:</span>
            <br />
            {menu}
          </p>
        </div>

        <Link
          to={`/order?campus=${encodeURIComponent(title)}`}
          className="mt-4 w-full bg-gold text-black font-semibold px-6 py-3 rounded-xl shadow-lg text-center hover:bg-white/90 transition"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default CampusModal;
