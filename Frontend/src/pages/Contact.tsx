/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, type FormEvent, type JSX } from "react";
import emailjs from "@emailjs/browser";
import Hero from "../components/Hero";

const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact(): JSX.Element {
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
    <main
      className="min-h-screen w-full theme-traiteur flex flex-col items-center justify-center  "
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      {/* HERO */}

      <Hero
        heroPhotos={heroPhotos}
        title={
          <>
            Contact
            <span className="block md:text-4xl text-gold text-center">
              Fill out the form below and we will get back to you within 48
              business hours.
            </span>
          </>
        }
        subtitle=""
      />

      {/* FORM SECTION */}
      <section className="w-full max-w-4xl bg-[var(--color-primary)/10] backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-10 my-24">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          aria-describedby="contact-form-status"
        >
          <input
            name="name"
            type="text"
            placeholder="Full Name *"
            className="col-span-2 px-4 py-3 rounded-xl border border-[var(--color-secondary)/20] bg-[var(--color-secondary)/10] text-(--color-text) placeholder-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
          />

          <input
            name="company"
            type="text"
            placeholder="Company"
            className="col-span-2 px-4 py-3 rounded-xl border border-[var(--color-secondary)/20] bg-[var(--color-secondary)/10] text-(--color-text) placeholder-(--color-text) focus:outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email *"
            className="col-span-2 px-4 py-3 rounded-xl border border-[var(--color-secondary)/20] bg-[var(--color-secondary)/10] text-(--color-text) placeholder-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className="col-span-2 px-4 py-3 rounded-xl border border-[var(--color-secondary)/20] bg-[var(--color-secondary)/10] text-(--color-text) placeholder-(--color-text) focus:outline-none"
          />

          <input
            name="subject"
            type="text"
            placeholder="Subject"
            className="col-span-2 px-4 py-3 rounded-xl border border-[var(--color-secondary)/20] bg-[var(--color-secondary)/10] text-(--color-text) placeholder-(--color-text) focus:outline-none"
          />

          <textarea
            name="message"
            placeholder="Your message *"
            className="col-span-2 px-4 py-3 rounded-xl border border-[var(--color-secondary)/20] bg-[var(--color-secondary)/10] text-(--color-text) placeholder-(--color-text) focus:outline-none h-40 resize-none"
          />

          <div className="col-span-2 flex flex-wrap gap-4 mt-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-(--color-bg) shadow-lg transition ${
                status === "sending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-(--color-secondary-green) hover:bg-(--color-secondary-green-light) hover:scale-105"
              }`}
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setStatus("idle");
                setErrorMessage(null);
              }}
              className="flex-1 px-6 py-3 rounded-2xl border border-[var(--color-secondary)/20] text-(--color-text) hover:bg-[var(--color-secondary)/10] transition"
            >
              Reset
            </button>
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
}
