/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, type FormEvent, type JSX } from "react";
import emailjs from "@emailjs/browser";
import Hero from "../components/Hero";

import { motion } from "framer-motion";

const heroPhotos = [
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765488273/main-de-femme-ajoutant-l-assaisonnement-sur-les-spaghettis_l5ykei.jpg",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765488809/photo-degateau_z356hg.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765488807/femme-affaires-ordinateur-portable-smartphone-cafe_bl3nup.webp",
  "https://res.cloudinary.com/dqwocrdnh/image/upload/v1765488808/triste-froncer-sourcils-jeune-femme-utilisation-telephone-portable-dans-cafe_alr5gu.webp",
];

type Status = "idle" | "sending" | "success" | "error";

const Contact = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (form: FormData) => {
    const required = ["name", "email", "message"];
    for (const key of required) {
      if (!form.get(key) || String(form.get(key)).trim() === "") {
        return `${key} is required.`;
      }
    }
    const email = String(form.get("email"));
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return "Invalid email address.";
    return null;
  };

  const resetForm = () => {
    formRef.current?.reset();
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const validationError = validate(formData);
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      resetForm();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message ?? "An error occurred.");
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <main className="min-h-screen w-full theme-traiteur  ">
      {/* HERO */}

      <Hero
        heroPhotos={heroPhotos}
        title={
          <span className="block mt-3 md:text-9xl text-gold">
            FOOD <br />& <br /> COFFEE
          </span>
        }
        subtitle=" Fill out the form below and we will get back to you within 48 business
        hours."
        interval={5000} // durée du slideshow
      />
      <span className="block md:text-4xl  text-gold text-center "></span>

      {/* FORM SECTION */}
      <section
        className="w-full max-w-full backdrop-blur-xl  shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-10  bg-(--color-accent)/20 bg-opacity-10 py-24 theme-traiteur
"
      >
        <h2 className="text-center text-6xl md:text-8xl font-extralight text-(--color-accent) mb-12 drop-shadow-xl">
          FOOD <br />&<br /> COFFEE <br />
          <br />
          Catalogue
        </h2>
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className=" w-[90%] md:w-[60%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl backdrop-blur-xl bg-amber-50 bg-opacity-10 shadow-lg"
          aria-describedby="contact-form-status"
        >
          <input
            name="name"
            type="text"
            placeholder="Full Name *"
            className="inputModern col-span-2 bg-white"
          />
          <input
            name="company"
            type="text"
            placeholder="Company"
            className="inputModern col-span-2 bg-white"
          />
          <input
            name="email"
            type="email"
            placeholder="Email *"
            className="inputModern col-span-2 bg-white"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className="inputModern col-span-2 bg-white"
          />
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            className="inputModern col-span-2 bg-white"
          />
          <textarea
            name="message"
            placeholder="Your message *"
            className="inputModern col-span-2 bg-white"
          />
          <div className="col-span-2 flex flex-wrap gap-4 mt-4">
            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status !== "sending" ? { scale: 1.08 } : {}}
              whileTap={status !== "sending" ? { scale: 0.95 } : {}}
              className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-(--color-bg) shadow-lg transition
      ${
        status === "sending"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-(--color-secondary-green) hover:bg-(--color-secondary-green-light)"
      }
    `}
            >
              {status === "sending" ? "Sending..." : "Send"}
            </motion.button>

            {/* RESET BUTTON */}
            <motion.button
              type="button"
              onClick={() => {
                resetForm();
                setStatus("idle");
                setErrorMessage(null);
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-3 rounded-2xl border border-[var(--color-secondary)/20] 
               text-(--color-text) hover:bg-[var(--color-secondary)/10] transition"
            >
              Reset
            </motion.button>
          </div>
          <div id="contact-form-status" className="col-span-2 mt-3 text-center">
            {status === "success" && (
              <p className="text-(--color-secondary-green) font-medium">
                Thank you — your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-(--color-accent) font-medium">
                Error: {errorMessage ?? "Unable to send message."}
              </p>
            )}
          </div>
        </form>

        <div className="mt-10 text-(--color-text)/80 text-center space-y-2 text-sm">
          <p>
            Email:{" "}
            <a href="mailto:contact@foodcoffee.com" className="underline">
              contact@foodcoffee.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+33100000000" className="underline">
              01 00 00 00 00
            </a>
          </p>
          <p className="text-xs text-(--color-text)/50 mt-2">
            Usually replies within 48 business hours.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
