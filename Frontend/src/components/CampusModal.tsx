import { useRef, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!isOpen) return null;

  const validPhotos = photos.filter(Boolean);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, validPhotos.length - 1));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

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
        <div className="relative px-4 pt-6">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl [&::-webkit-scrollbar]:hidden"
          >
            {validPhotos.map((photo, index) => (
              <div
                key={index}
                className="h-56 w-full shrink-0 snap-center overflow-hidden bg-black/5 md:h-64"
              >
                <img
                  src={photo}
                  alt={`${title} photo ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {validPhotos.length > 1 && (
            <>
              <button
                onClick={() => scrollToIndex(activeIndex - 1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition hover:bg-white disabled:opacity-30"
                disabled={activeIndex === 0}
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollToIndex(activeIndex + 1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition hover:bg-white disabled:opacity-30"
                disabled={activeIndex === validPhotos.length - 1}
              >
                <FiChevronRight size={20} />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5">
                {validPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to photo ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-5 bg-green-accent"
                        : "w-1.5 bg-black/15"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
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
            className="flex w-full items-center justify-center rounded-xl bg-green-accent px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-green-accent-dark focus:outline-none focus:ring-2 focus:ring-green-accent focus:ring-offset-2 active:scale-[0.99] md:text-lg"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampusModal;
