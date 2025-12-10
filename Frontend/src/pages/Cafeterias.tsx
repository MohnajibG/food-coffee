import { useState, type FC } from "react";
import CampusCard from "../components/CampusCard";
import CampusModal from "../components/CampusModal";
import Hero from "../components/Hero";

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
    hours: "Monday to Friday: 8am - 5pm",
    address: "12 Avenue Gustave Eiffel, Bezons",
    menu: "Roast chicken, veggie salad, spaghetti bolognese, dessert of the day.",
  },
  {
    title: "Campus B",
    img: "/images/compusb.jpg",
    hours: "Monday to Friday: 8am - 6pm",
    address: "5 Rue des Étudiants, Courbevoie",
    menu: "Chicken wrap, salmon bowl, homemade lasagna, fresh fruit.",
  },
  {
    title: "Campus C",
    img: "/images/compusc.jpg",
    hours: "Monday to Friday: 8am - 5pm",
    address: "78 Rue Centrale, Paris",
    menu: "Homemade couscous, veggie burger, chef's gratin.",
  },
  {
    title: "Campus D",
    img: "/images/compusd.jpg",
    hours: "Monday to Friday: 7am - 7pm",
    address: "22 Boulevard Lumière, Nanterre",
    menu: "Caesar salad, chicken fried rice, artisanal cheesecake.",
  },
];

const Cafeterias: FC = () => {
  const [openCampus, setOpenCampus] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* HERO */}
      <Hero
        heroPhotos={heroPhotos}
        title={
          <>
            Cafeterias
            <span className="block md:text-9xl text-gold">
              FOOD <br />& <br /> COFFEE
            </span>
          </>
        }
        subtitle="A space designed for your gourmet breaks."
      />

      {/* CAMPUS GRID */}
      <section className="relative bg-gold/10 w-full py-24 px-6 md:px-16">
        <h3 className="text-center text-6xl font-extralight text-gold mb-16">
          Our Campuses
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
            hours={c.hours}
            address={c.address}
            menu={c.menu}
            photos={[c.img, c.img, c.img]}
          />
        ))}
      </section>
    </div>
  );
};

export default Cafeterias;
