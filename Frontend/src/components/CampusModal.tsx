import { type FC } from "react";
import { Link } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hours: string;
  address: string;
  menu: string;
  photos: string[];
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
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-dvh md:h-[90vh] md:max-w-4xl bg-white shadow-2xl md:rounded-3xl flex flex-col overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 text-2xl flex items-center justify-center transition"
        >
          ×
        </button>

        {/* Gallery */}
        <div className="px-4 pt-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {photos.map((photo, index) =>
              photo ? (
                <div
                  key={index}
                  className="relative h-40 md:h-44 rounded-2xl overflow-hidden bg-black/5"
                >
                  <img
                    src={photo}
                    alt={`${title} photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : null,
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 text-center">
          <h3 className="text-4xl md:text-6xl font-extralight text-gold mb-6 drop-shadow">
            {title}
          </h3>
          <div className="space-y-6 text-gray-700 text-base md:text-lg max-w-xl mx-auto">
            <p>
              <span className="font-semibold block mb-1">Hours</span>
              {hours}
            </p>
            <p>
              <span className="font-semibold block mb-1">Address</span>
              {address}
            </p>
            <p>
              <span className="font-semibold block mb-1">Today's Menu</span>
              {menu}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 pt-2">
          <Link
            to={`/order?campus=${encodeURIComponent(title)}`}
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-[#50741f] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#3f5e13] focus:outline-none focus:ring-2 focus:ring-[#50741f] focus:ring-offset-2 active:scale-[0.99] md:text-lg"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampusModal;
