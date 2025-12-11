/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, type FC } from "react";
import emailjs from "@emailjs/browser";
import FlipbookPDF from "../components/FlipbookPDF";
import Hero from "../components/Hero"; // ✅ Import Hero générique

/* ============================================================
   HERO DATA
============================================================ */
const heroPhotos = [
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486165/hero4_tsk65z.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486164/hero3_brtnh4.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765486163/hero2_qp11zx.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765475065/cld-sample-4.jpg",
];

/* ============================================================
   CATALOGUE SECTION
============================================================ */
const Catalogue: FC = () => {
  return (
    <section
      id="catalogue"
      className="md:px-16 bg-(--color-accent)/20 bg-opacity-10 py-24 theme-traiteur"
    >
      <h2 className="text-center text-6xl md:text-8xl font-extralight text-(--color-accent) mb-12 drop-shadow-xl">
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
    <section className="flex flex-col items-center justify-center text-center py-20 px-6 theme-traiteur bg-(--color-secondary-green)/80 bg-gradient-radial from-(--color-secondary-green) to-(--color-secondary-green-light)">
      <h2 className="text-center text-6xl md:text-8xl font-extralight text-(--color-accent) mb-12 drop-shadow-xl">
        Request a Quote
      </h2>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl backdrop-blur-xl bg-amber-50 bg-opacity-10 shadow-lg"
      >
        <input
          name="company"
          placeholder="Company Name"
          className="inputModern col-span-2 bg-white"
        />
        <input
          name="name"
          placeholder="Full Name"
          className="inputModern col-span-2  bg-white"
        />

        <input
          name="phone"
          placeholder="Phone"
          className="inputModern col-span-2  bg-white"
        />
        <input
          name="address"
          placeholder="Delivery Address"
          className="inputModern col-span-2  bg-white"
        />
        <input
          type="date"
          name="date"
          className="inputModern col-span-2  bg-white"
        />
        <input
          type="number"
          name="people"
          placeholder="Number of People"
          className="inputModern col-span-2  bg-white"
        />
        <textarea
          name="message"
          placeholder="Message / Specific Needs"
          className="inputModern col-span-2  bg-white h-32"
        />
        <button
          type="submit"
          className="mt-6 col-span-2 bg-(--color-accent) text-(--color-bg) py-3 rounded-xl text-xl font-extralight shadow-lg hover:scale-105 transition-transform"
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
