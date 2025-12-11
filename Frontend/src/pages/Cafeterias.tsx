import { useState, type FC } from "react";
import CampusCard from "../components/CampusCard";
import CampusModal from "../components/CampusModal";
import Hero from "../components/Hero";

const heroPhotos = [
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486162/hero1_onn8o8.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487796/vue-aerienne-de-divers-cafe_nyncyf.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487799/set-de-patisseries-de-boulangerie-sur-une-table-en-bois_aeadxa.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765487795/delicieux-bols-de-saumon-sur-table_kk9nai.webp",
];

const campusData = [
  {
    title: "Bezons Campus",
    img: "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486162/compusa_gvvpr6.webp",
    hours: "Monday to Friday: 8am - 5pm",
    address: "12 Avenue Gustave Eiffel, Bezons",
    menu: "Roast chicken, veggie salad, spaghetti bolognese, dessert of the day.",
  },
  {
    title: "Courbevoie Campus",
    img: "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486161/compusb_rhiohl.webp",
    hours: "Monday to Friday: 8am - 6pm",
    address: "5 Rue des Étudiants, Courbevoie",
    menu: "Chicken wrap, salmon bowl, homemade lasagna, fresh fruit.",
  },
  {
    title: "Paris Campus",
    img: "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486161/compusc_car9dj.webp",
    hours: "Monday to Friday: 8am - 5pm",
    address: "78 Rue Centrale, Paris",
    menu: "Homemade couscous, veggie burger, chef's gratin.",
  },
  {
    title: "Nanterre Campus ",
    img: "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486162/compusd_i36hgc.webp",
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
      <section
        className="relative md:px-16 bg-(--color-accent)/20 bg-opacity-10 py-24 theme-traiteur
 "
      >
        <h2 className="text-center text-6xl md:text-8xl font-extralight text-(--color-accent) mb-12 drop-shadow-xl">
          Our Campuses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
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
