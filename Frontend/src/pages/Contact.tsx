import { useRef, useState, type FormEvent, type JSX } from "react";
import Hero from "../components/Hero";
import { FormInput, FormTextarea } from "../components/FormField";
import { API_URL } from "../lib/api";

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
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Unable to send message.");
      setStatus("success");
      resetForm();
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "An error occurred.";
      setErrorMessage(message);
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
          <span className="block mt-3 text-4xl md:text-9xl text-gold">
            FOOD <br />& <br /> COFFEE
          </span>
        }
        subtitle=" Fill out the form below and we will get back to you within 48 business
        hours."
        interval={5000} // durée du slideshow
      />
      <span className="block md:text-4xl  text-gold text-center "></span>

      {/* FORM SECTION */}
      <section className="w-full max-w-full backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-10  bg-(--color-accent)/20 bg-opacity-10 py-24 theme-traiteur">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="w-[90%] md:w-[60%] mx-auto grid grid-cols-1 gap-5 rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-xl md:grid-cols-2"
          aria-describedby="contact-form-status"
        >
          <FormInput
            label="Full Name *"
            name="name"
            type="text"
            className="col-span-2"
          />
          <FormInput
            label="Company"
            name="company"
            type="text"
            className="col-span-2"
          />
          <FormInput
            label="Email *"
            name="email"
            type="email"
            className="col-span-2"
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            className="col-span-2"
          />
          <FormInput
            label="Subject"
            name="subject"
            type="text"
            className="col-span-2"
          />
          <FormTextarea
            label="Your message *"
            name="message"
            className="col-span-2"
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
              className="flex-1 px-6 py-3 rounded-2xl border border-(--color-secondary)/20 text-(--color-text) transition hover:bg-(--color-secondary)/10"
            >
              Reset
            </motion.button>
          </div>
          <div id="contact-form-status" className="col-span-2 mt-1">
            {status === "success" && (
              <p className="rounded-xl bg-(--color-secondary-green)/10 px-4 py-3 text-center font-medium text-(--color-secondary-green)">
                Thank you — your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-center font-medium text-red-600">
                {errorMessage ?? "Unable to send message."}
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
