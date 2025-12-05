import { useState, useEffect, type FC } from "react";

/* ============================================================
   CAROUSEL MINI
============================================================ */

interface CarouselProps {
  photos: Array<string | undefined>;
}

const Carousel: FC<CarouselProps> = ({ photos }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!photos.length) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(t);
  }, [photos]);

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-xl shadow-xl">
      {photos.map((src, i) =>
        src ? (
          <img
            key={i}
            src={src}
            alt=""
            style={{ opacity: i === index ? 1 : 0 }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        ) : null
      )}

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
   MODAL PREMIUM
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
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 max-md:items-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 w-full max-w-lg p-6 relative shadow-2xl md:rounded-2xl max-md:rounded-t-3xl max-md:h-[90vh] max-md:overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-3xl"
        >
          ×
        </button>

        <Carousel photos={photos} />

        <h3 className="text-4xl font-extrabold text-gold mt-6 mb-4 drop-shadow-lg text-center">
          {title}
        </h3>

        <div className="space-y-4 text-gray-700 pb-10 text-lg">
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
      </div>
    </div>
  );
};

/* ============================================================
   PAGE CAFETERIAS — 2 SECTIONS (HERO + BG GOLD)
============================================================ */

const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];

const Cafeterias: FC = () => {
  const [index, setIndex] = useState(0);

  // 4 Modals
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openD, setOpenD] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col mt-36">
      {/* =====================================================
           SECTION 1 — HERO STYLE TRAITEUR
      ===================================================== */}
      <section className="relative h-screen w-full overflow-hidden">
        {heroPhotos.map((src, i) => (
          <img
            key={i}
            src={src}
            style={{ opacity: i === index ? 1 : 0 }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full gap-6 px-6">
          <h2 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl">
            Cafeterias
            <span className="mt-3 block md:text-9xl text-gold">
              FOOD <br />& <br />
              COFFEE
            </span>
          </h2>

          <p className="text-white/90 text-lg md:text-2xl max-w-2xl">
            Un espace pensé pour vos pauses gourmandes.
          </p>
        </div>
      </section>

      {/* =====================================================
           SECTION 2 — BG GOLD AVEC LES CAMPUS
      ===================================================== */}
      <section className="relative bg-gold/10 w-full py-24 px-6 md:px-16">
        <h3 className="text-center text-6xl font-extralight text-gold mb-16">
          Nos Campus
        </h3>

        {/* GRID 4 CAMPUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "Campus A",
              img: "/images/compusa.jpg",
              open: () => setOpenA(true),
            },
            {
              title: "Campus B",
              img: "/images/compusb.jpg",
              open: () => setOpenB(true),
            },
            {
              title: "Campus C",
              img: "/images/compusc.jpg",
              open: () => setOpenC(true),
            },
            {
              title: "Campus D",
              img: "/images/compusd.jpg",
              open: () => setOpenD(true),
            },
          ].map((c, i) => (
            <div
              key={i}
              onClick={c.open}
              className="cursor-pointer relative h-[420px] overflow-hidden shadow-2xl rounded-3xl hover:scale-[1.04] transition-transform duration-700"
            >
              <img src={c.img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-5xl font-extrabold drop-shadow-xl">
                  {c.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      <Modal
        isOpen={openA}
        onClose={() => setOpenA(false)}
        title="Campus A"
        horaires="Lundi au vendredi : 8h - 17h"
        adresse="12 Avenue Gustave Eiffel, Bezons"
        menu="Poulet rôti, salade veggie, pâtes bolognaise, dessert du jour."
        photos={[
          "/images/compusa.jpg",
          "/images/compusa.jpg",
          "/images/compusa.jpg",
        ]}
      />

      <Modal
        isOpen={openB}
        onClose={() => setOpenB(false)}
        title="Campus B"
        horaires="Lundi au vendredi : 8h - 18h"
        adresse="5 Rue des Étudiants, Courbevoie"
        menu="Wrap poulet, bowl saumon, lasagnes maison, fruit frais."
        photos={[
          "/images/compusb.jpg",
          "/images/compusb.jpg",
          "/images/compusb.jpg",
        ]}
      />

      <Modal
        isOpen={openC}
        onClose={() => setOpenC(false)}
        title="Campus C"
        horaires="Lundi au vendredi : 8h - 17h"
        adresse="78 Rue Centrale, Paris"
        menu="Couscous maison, burger veggie, gratin du chef."
        photos={[
          "/images/compusc.jpg",
          "/images/compusc.jpg",
          "/images/compusc.jpg",
        ]}
      />

      <Modal
        isOpen={openD}
        onClose={() => setOpenD(false)}
        title="Campus D"
        horaires="Lundi au vendredi : 7h - 19h"
        adresse="22 Boulevard Lumière, Nanterre"
        menu="Salade césar, riz sauté poulet, cheesecake artisanal."
        photos={[
          "/images/compusd.jpg",
          "/images/compusd.jpg",
          "/images/compusd.jpg",
        ]}
      />
    </div>
  );
};

export default Cafeterias;
