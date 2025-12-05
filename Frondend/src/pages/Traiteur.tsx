/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type FC, useRef } from "react";
import emailjs from "@emailjs/browser";
import FlipbookPDF from "../components/FlipbookPDF";

/* ============================================================
   CAROUSEL FULLSCREEN
============================================================ */

const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];

const HeroCarousel: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden mt-12">
      {heroPhotos.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{ opacity: i === index ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          alt={`hero-${i}`}
        />
      ))}

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute inset-0 flex flex-col items-center gap-10 justify-center text-center px-6">
        <h2 className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl">
          Traiteur{" "}
          <span className="mt-3 block md:text-9xl text-gold">
            FOOD <br />& <br />
            COFFEE
          </span>
        </h2>

        <p className="text-white text-lg md:text-2xl mt-6 max-w-2xl">
          Une expérience culinaire pensée pour les entreprises et institutions.
        </p>

        <div>
          <a
            href="#catalogue"
            className="px-10 py-3 bg-[#50741f] text-white rounded-full text-xl font-semibold hover:scale-105 transition"
          >
            Voir nos produits
          </a>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   CATALOGUE — uniquement le PDF FOOD&COFFEE
============================================================ */

const Catalogue: FC = () => {
  return (
    <section id="catalogue" className=" md:px-16 bg-gold/10">
      <h2 className="text-center text-7xl font-extralight text-gold my-24">
        Catalogue <br /> FOOD & COFFEE
      </h2>

      <div className="w-full flex justify-center">
        <FlipbookPDF />
      </div>
    </section>
  );
};

/* ============================================================
   FORMULAIRE B2B EMAILJS
============================================================ */

const Formulaire: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs.sendForm("serviceID", "templateID", formRef.current!, "publicKey");
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 theme-traiteur bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]">
      <h2 className="text-center text-6xl md:text-8xl font-extrabold text-gold mb-12 drop-shadow-xl">
        Demander un devis
      </h2>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl backdrop-blur-xl bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
      >
        <input
          name="entreprise"
          placeholder="Nom de l’entreprise"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="nom"
          placeholder="Nom complet"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="email"
          placeholder="Email professionnel"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="telephone"
          placeholder="Téléphone"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="adresse"
          placeholder="Adresse de livraison"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          type="date"
          name="date"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          type="number"
          name="personnes"
          placeholder="Nombre de personnes"
          className="inputModern col-span-2 bg-amber-50"
        />
        <textarea
          name="message"
          placeholder="Message / Besoins spécifiques"
          className="inputModern col-span-2 bg-amber-50 h-32"
        />
        <button
          type="submit"
          className="mt-6 col-span-2 bg-[#50741f] text-white py-3 rounded-xl text-xl font-semibold shadow-lg transition"
        >
          Envoyer la demande
        </button>
      </form>
    </section>
  );
};

/* ============================================================
   PAGE FINALE TRAITEUR
============================================================ */

const Traiteur: FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col mt-25">
      <HeroCarousel />
      <Catalogue />
      <Formulaire />
    </div>
  );
};

export default Traiteur;
