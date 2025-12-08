import { useState, useEffect, type FC } from "react";
import CampusCard from "../components/CampusCard";
import CampusModal from "../components/CampusModal";

const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];

const campusData = [
  {
    title: "Campus A",
    img: "/images/compusa.jpg",
    horaires: "Lundi au vendredi : 8h - 17h",
    adresse: "12 Avenue Gustave Eiffel, Bezons",
    menu: "Poulet rôti, salade veggie, pâtes bolognaise, dessert du jour.",
  },
  {
    title: "Campus B",
    img: "/images/compusb.jpg",
    horaires: "Lundi au vendredi : 8h - 18h",
    adresse: "5 Rue des Étudiants, Courbevoie",
    menu: "Wrap poulet, bowl saumon, lasagnes maison, fruit frais.",
  },
  {
    title: "Campus C",
    img: "/images/compusc.jpg",
    horaires: "Lundi au vendredi : 8h - 17h",
    adresse: "78 Rue Centrale, Paris",
    menu: "Couscous maison, burger veggie, gratin du chef.",
  },
  {
    title: "Campus D",
    img: "/images/compusd.jpg",
    horaires: "Lundi au vendredi : 7h - 19h",
    adresse: "22 Boulevard Lumière, Nanterre",
    menu: "Salade césar, riz sauté poulet, cheesecake artisanal.",
  },
];

const Cafeterias: FC = () => {
  const [index, setIndex] = useState(0);
  const [openCampus, setOpenCampus] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col mt-36">
      {/* HERO */}
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

      {/* GRID CAMPUS */}
      <section className="relative bg-gold/10 w-full py-24 px-6 md:px-16">
        <h3 className="text-center text-6xl font-extralight text-gold mb-16">
          Nos Campus
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {campusData.map((c) => (
            <CampusCard
              key={c.title}
              title={c.title}
              img={c.img}
              onClick={() => setOpenCampus(c.title)}
            />
          ))}
        </div>

        {/* MODALS */}
        {campusData.map((c) => (
          <CampusModal
            key={c.title}
            isOpen={openCampus === c.title}
            onClose={() => setOpenCampus(null)}
            title={c.title}
            horaires={c.horaires}
            adresse={c.adresse}
            menu={c.menu}
            photos={[c.img, c.img, c.img]}
          />
        ))}
      </section>
    </div>
  );
};

export default Cafeterias;
