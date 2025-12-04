import { useState, useEffect, type FC } from "react";

/* ============================================================
   CAROUSEL AUTO (no framer-motion)
============================================================ */

interface CarouselProps {
  photos: Array<string | undefined>;
}

const Carousel: FC<CarouselProps> = ({ photos }) => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3s
  useEffect(() => {
    if (!photos || photos.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos]);

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-xl shadow-lg">
      {photos.map((src, i) =>
        src ? (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            style={{ opacity: i === index ? 1 : 0 }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        ) : null
      )}

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   MODAL (FULLSCREEN MOBILE) - no framer-motion, no précommander
============================================================ */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  horaires: string;
  adresse: string;
  menu: string;
  photos: Array<string | undefined>;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  horaires,
  adresse,
  menu,
  photos,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm
        flex items-center justify-center z-50
        max-md:items-end
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white w-full max-w-lg p-6 relative shadow-2xl
          md:rounded-2xl 
          max-md:rounded-t-3xl max-md:h-[90vh] max-md:overflow-y-auto
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl"
          aria-label="Fermer"
        >
          ×
        </button>

        {/* CAROUSEL */}
        <Carousel photos={photos} />

        <h3
          id="modal-title"
          className="text-3xl font-bold text-[#4a1f29] mt-6 mb-4"
        >
          {title}
        </h3>

        <div className="space-y-4 text-gray-700 pb-10">
          <p>
            <span className="font-semibold">Horaires :</span>
            <br />
            {horaires}
          </p>

          <p>
            <span className="font-semibold">Adresse :</span>
            <br />
            {adresse}
          </p>

          <p>
            <span className="font-semibold">Menu du jour :</span>
            <br />
            {menu}
          </p>
        </div>

        {/* Précommander removed */}
      </div>
    </div>
  );
};

/* ============================================================
   PAGE CAFETERIAS (no framer-motion, no précommander)
============================================================ */
const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];
const Cafeterias = () => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  // hero carousel index for the background images
  const [index, setIndex] = useState(0);

  // Auto-advance hero images every 3s
  useEffect(() => {
    if (!heroPhotos || heroPhotos.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroPhotos]);

  return (
    <div className="flex flex-col w-full mt-50">
      {heroPhotos.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{ opacity: i === index ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          alt={`hero-${i}`}
        />
      ))}
      <h2 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl text-center">
        Cafeterias
        <span className="mt-3 block md:text-9xl text-gold ">
          FOOD <br />& <br />
          COFFEE
        </span>
      </h2>

      <section className="flex flex-col md:flex-row w-full gap-5 px-6 md:px-16 py-16">
        {/* COMPUS A */}
        <div
          onClick={() => setOpenA(true)}
          className="
            cursor-pointer flex-1 relative h-[420px]
            overflow-hidden shadow-2xl rounded-2xl
            transition-transform duration-700 hover:scale-105
          "
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpenA(true);
          }}
        >
          <img
            src="/images/compusa.jpg"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ backgroundColor: "rgba(74,31,41,0.45)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-5xl font-extrabold drop-shadow-xl">
              Compus A
            </h2>
          </div>
        </div>

        {/* COMPUS B */}
        <div
          onClick={() => setOpenB(true)}
          className="
            cursor-pointer flex-1 relative h-[420px]
            overflow-hidden shadow-2xl rounded-2xl
            transition-transform duration-700 hover:scale-105
          "
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpenB(true);
          }}
        >
          <img
            src="/images/compusb.jpg"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ backgroundColor: "rgba(92,58,33,0.45)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-5xl font-extrabold drop-shadow-xl">
              Compus B
            </h2>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="flex flex-col items-center text-center py-16 px-6 
        bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]"
        style={{ color: "var(--color-bg)" }}
      >
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
          <span className="block text-6xl">Nouveau</span>
          précommandez vos repas
        </h3>

        <p className="max-w-xl text-base md:text-lg opacity-90 leading-relaxed">
          Vous pouvez désormais réserver vos repas jusqu'à
          <span className="font-semibold"> 7 jours en avance </span>
          dans votre cafétéria.
        </p>
      </section>

      {/* MODALS */}
      <Modal
        isOpen={openA}
        onClose={() => setOpenA(false)}
        title="Compus A"
        horaires="Lundi au vendredi : 8h - 17h"
        adresse="12 Avenue Gustave Eiffel, Bezons"
        menu="Poulet rôti, salade veggie, pâtes bolognaise, dessert du jour."
        photos={[
          "/images/compusa.jpg",
          "/images/compusa.jpg",
          "/images/compusa.jpg",
          "/images/compusa.jpg",
        ]}
      />

      <Modal
        isOpen={openB}
        onClose={() => setOpenB(false)}
        title="Compus B"
        horaires="Lundi au vendredi : 8h - 18h"
        adresse="5 Rue des Étudiants, Courbevoie"
        menu="Wrap poulet, bowl saumon, lasagnes maison, fruit frais."
        photos={[
          "/images/compusb.jpg",
          "/images/compusb.jpg",
          "/images/compusb.jpg",
          "/images/compusb.jpg",
        ]}
      />
    </div>
  );
};

export default Cafeterias;
