import { useRef, useState, type FC, type FormEvent } from "react";
import FlipbookPDF from "../components/FlipbookPDF";
import Hero from "../components/Hero"; // ✅ Import Hero générique
import { FormInput, FormTextarea } from "../components/FormField";
import { API_URL } from "../lib/api";

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
        <br />
        Catalogue
      </h2>
      <div className="w-full flex justify-center">
        <FlipbookPDF />
      </div>
    </section>
  );
};

/* ============================================================
   B2B QUOTE REQUEST FORM
============================================================ */
type Status = "idle" | "sending" | "success" | "error";

const MIN_LEAD_DAYS = 2;

const getMinQuoteDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + MIN_LEAD_DAYS);
  return d.toISOString().slice(0, 10);
};

const Formulaire: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const required = ["company", "name", "phone"];
    const data = new FormData(formRef.current);
    const missing = required.some((key) => !String(data.get(key) ?? "").trim());
    if (missing) {
      setErrorMessage("Please fill in the required fields (company, name, phone).");
      setStatus("error");
      return;
    }

    const dateValue = String(data.get("date") ?? "").trim();
    if (dateValue && dateValue < getMinQuoteDate()) {
      setErrorMessage(`Please choose a date at least ${MIN_LEAD_DAYS} days from today.`);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch(`${API_URL}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(result?.error || "Unable to send your request.");
      }
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Unable to send your request.";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-center text-center py-20 px-6 theme-traiteur bg-(--color-secondary-green)/80 bg-gradient-radial from-(--color-secondary-green) to-(--color-secondary-green-light)">
      <h2 className="text-center text-4xl md:text-8xl font-extralight text-(--color-accent) mb-12 drop-shadow-xl">
        Request a Quote
      </h2>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-[90%] md:w-[60%] mx-auto grid grid-cols-1 gap-5 rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur-xl md:grid-cols-2"
        aria-describedby="quote-form-status"
      >
        <FormInput label="Company Name *" name="company" className="col-span-2" />
        <FormInput label="Full Name *" name="name" className="col-span-2" />
        <FormInput label="Phone *" name="phone" type="tel" className="col-span-2" />
        <FormInput label="Delivery Address" name="address" className="col-span-2" />
        <FormInput label="Date" name="date" type="date" min={getMinQuoteDate()} />
        <FormInput label="Number of People" name="people" type="number" min={1} />
        <FormTextarea
          label="Message / Specific Needs"
          name="message"
          className="col-span-2"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className={`col-span-2 mt-2 rounded-xl py-3 text-xl font-extralight shadow-lg transition ${
            status === "sending"
              ? "cursor-not-allowed bg-gray-400 text-white"
              : "bg-(--color-accent) text-(--color-bg) hover:scale-105"
          }`}
        >
          {status === "sending" ? "Sending..." : "Send Request"}
        </button>

        <div id="quote-form-status" className="col-span-2">
          {status === "success" && (
            <p className="rounded-xl bg-white px-4 py-3 text-center font-medium text-(--color-secondary-green)">
              Thank you — your request has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-center font-medium text-red-600">
              {errorMessage}
            </p>
          )}
        </div>
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
          <span className="block mt-3 md:text-9xl text-gold">
            FOOD <br />& <br /> COFFEE
          </span>
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
