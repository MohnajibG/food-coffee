/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, type FormEvent, type JSX } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact(): JSX.Element {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation simple
  const validate = (form: FormData) => {
    const required = ["name", "email", "message"];
    for (const key of required) {
      if (!form.get(key) || String(form.get(key)).trim() === "") {
        return `${key} est requis.`;
      }
    }
    const email = String(form.get("email"));
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return "Adresse e-mail invalide.";
    return null;
  };

  const resetForm = () => {
    if (!formRef.current) return;
    formRef.current.reset();
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
      // === Option A : EmailJS ===
      // Remplacez par vos identifiants EmailJS
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );

      // === Option B : fetch vers votre API ===
      // Si vous préférez envoyer à votre backend, commentez EmailJS et utilisez fetch :
      // await fetch("/api/contact", { method: "POST", body: formData });

      setStatus("success");
      resetForm();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err?.message ? String(err.message) : "Une erreur est survenue."
      );
      setStatus("error");
    } finally {
      // after short delay, go back to idle (optional)
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-6 mt-36">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-[#4a1f29] mb-2">
          Contactez-nous
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Remplissez le formulaire ci-dessous. Nous revenons vers vous sous 48h
          ouvrées.
        </p>

        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="grid grid-cols-1 gap-4"
          aria-describedby="contact-form-status"
        >
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              Nom complet *
            </span>
            <input
              name="name"
              type="text"
              required
              className="mt-2 inputModern px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d8b56a]"
              placeholder="Jean Dupont"
              aria-required="true"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              Entreprise
            </span>
            <input
              name="company"
              type="text"
              className="mt-2 inputModern px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
              placeholder="Nom de l'entreprise (facultatif)"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Email *</span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 inputModern px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
              placeholder="contact@entreprise.com"
              aria-required="true"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Téléphone</span>
            <input
              name="phone"
              type="tel"
              className="mt-2 inputModern px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
              placeholder="+33 1 23 45 67 89"
            />
          </label>

          <label className="flex flex-col col-span-1">
            <span className="text-sm font-medium text-gray-700">Sujet</span>
            <input
              name="subject"
              type="text"
              className="mt-2 inputModern px-4 py-3 rounded-lg border border-gray-200 focus:outline-none"
              placeholder="Demande de devis / Partenariat / etc."
            />
          </label>

          <label className="flex flex-col col-span-1">
            <span className="text-sm font-medium text-gray-700">Message *</span>
            <textarea
              name="message"
              required
              className="mt-2 resize-none inputModern px-4 py-3 rounded-lg border border-gray-200 focus:outline-none h-40"
              placeholder="Détaillez votre demande..."
              aria-required="true"
            />
          </label>

          <div className="flex items-center gap-4 mt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold shadow-md transition ${
                status === "sending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#50741f] hover:scale-105"
              }`}
            >
              {status === "sending" ? "Envoi..." : "Envoyer"}
            </button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setStatus("idle");
                setErrorMessage(null);
              }}
              className="px-4 py-2 rounded-md border border-gray-200 text-sm"
            >
              Réinitialiser
            </button>
          </div>

          <div id="contact-form-status" className="mt-3">
            {status === "success" && (
              <p className="text-sm text-green-600" role="status">
                Merci — votre message a été envoyé.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600" role="alert">
                Erreur : {errorMessage ?? "Impossible d'envoyer le message."}
              </p>
            )}
          </div>
        </form>

        <aside className="mt-8 text-sm text-gray-600">
          <p>
            Adresse e-mail :{" "}
            <a href="mailto:contact@foodCOFFEE.com" className="underline">
              contact@foodCOFFEE.com
            </a>
          </p>
          <p>
            Téléphone :{" "}
            <a href="tel:+33100000000" className="underline">
              01 00 00 00 00
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Nous répondons généralement sous 48 heures ouvrées.
          </p>
        </aside>
      </section>
    </main>
  );
}
