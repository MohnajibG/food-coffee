import { type FC, useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  hours: string;
  address: string;
  menu: string;
  photos: Array<string | undefined>;
}

/* ========================= CAROUSEL ========================= */
const Carousel: FC<{ photos: Array<string | undefined> }> = ({ photos }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos]);

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-xl shadow-lg mt-6">
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`slide-${i}`}
          style={{ opacity: i === index ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
      ))}

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-(--color-accent)" : "bg-(--color-accent)/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ========================= MODAL ========================= */
const Modal: FC<ModalProps> = ({
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 max-md:items-end theme-traiteur"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl w-full max-w-lg p-6 relative md:rounded-2xl max-md:rounded-t-2xl max-md:h-[90vh] max-md:overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* CAROUSEL */}
        <Carousel photos={photos} />

        <h3
          id="modal-title"
          className="text-3xl font-bold text-(--color-primary) mt-6 mb-4"
        >
          {title}
        </h3>

        <div className="space-y-4 text-gray-700 pb-10">
          <p>
            <span className="font-semibold">Opening Hours:</span>
            <br />
            {hours}
          </p>

          <p>
            <span className="font-semibold">Address:</span>
            <br />
            {address}
          </p>

          <p>
            <span className="font-semibold">Daily Menu:</span>
            <br />
            {menu}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
