/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, type FC } from "react";
import emailjs from "@emailjs/browser";
import FlipbookPDF from "../components/FlipbookPDF";
import Hero from "../components/Hero"; // ✅ Import Hero générique

/* ============================================================
   HERO DATA
============================================================ */
const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];

/* ============================================================
   CATALOGUE SECTION
============================================================ */
const Catalogue: FC = () => {
  return (
    <section
      id="catalogue"
      className="md:px-16 bg-(--color-accent) bg-opacity-10 py-24 theme-traiteur"
    >
      <h2 className="text-center text-7xl font-extralight text-(--color-accent) my-24">
        FOOD & COFFEE Catalogue
      </h2>
      <div className="w-full flex justify-center">
        <FlipbookPDF />
      </div>
    </section>
  );
};

/* ============================================================
   B2B FORM EMAILJS
============================================================ */
const Formulaire: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs.sendForm("serviceID", "templateID", formRef.current!, "publicKey");
  };

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 theme-traiteur bg-(--color-secondary-green) bg-gradient-radial from-(--color-secondary-green) to-(--color-secondary-green-light)">
      <h2 className="text-center text-6xl md:text-8xl font-extrabold text-(--color-accent) mb-12 drop-shadow-xl">
        Request a Quote
      </h2>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl backdrop-blur-xl bg-white bg-opacity-10 shadow-lg"
      >
        <input
          name="company"
          placeholder="Company Name"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="name"
          placeholder="Full Name"
          className="inputModern col-span-2 bg-amber-50"
        />

        <input
          name="phone"
          placeholder="Phone"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="address"
          placeholder="Delivery Address"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          type="date"
          name="date"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          type="number"
          name="people"
          placeholder="Number of People"
          className="inputModern col-span-2 bg-amber-50"
        />
        <textarea
          name="message"
          placeholder="Message / Specific Needs"
          className="inputModern col-span-2 bg-amber-50 h-32"
        />
        <button
          type="submit"
          className="mt-6 col-span-2 bg-(--color-accent) text-(--color-bg) py-3 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Send Request
        </button>
      </form>
    </section>
  );
};

/* ============================================================
   FINAL TRAITEUR PAGE
============================================================ */
const Traiteur: FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* HERO dynamique */}
      <Hero
        heroPhotos={heroPhotos}
        title={
          <>
            Catering
            <span className="block mt-3 md:text-9xl text-gold">
              FOOD <br />& <br /> COFFEE
            </span>
          </>
        }
        subtitle="A culinary experience designed for companies and institutions."
        interval={5000} // durée du slideshow
      />

      <Catalogue />
      <Formulaire />
    </div>
  );
};

export default Traiteur;
