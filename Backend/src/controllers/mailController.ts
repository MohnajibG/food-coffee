import { Request, Response } from "express";
import { sendMail } from "../utils/mailer";
import { renderEmailHtml } from "../utils/emailTemplate";
import { ensureDbConnection } from "../db/connection";
import { EmailLog } from "../models/EmailLog";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort logging: never let a slow/unreachable MongoDB delay the
// contact/quote response the visitor is waiting on.
const logEmail = (
  type: "contact" | "quote",
  fields: Record<string, unknown>,
  status: "sent" | "failed",
  error?: string,
) => {
  ensureDbConnection()
    .then((connected) => {
      if (!connected) return;
      return EmailLog.create({ type, fields, status, error });
    })
    .catch((err) => console.error("Failed to log email to MongoDB:", err));
};

export const sendContactEmail = async (req: Request, res: Response) => {
  const { name, email, company, phone, subject, message } = req.body ?? {};

  if (
    !String(name ?? "").trim() ||
    !EMAIL_RE.test(String(email ?? "")) ||
    !String(message ?? "").trim()
  ) {
    return res
      .status(400)
      .json({ error: "Name, a valid email, and a message are required." });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    phone ? `Phone: ${phone}` : null,
    "",
    "Message:",
    message,
  ].filter((line): line is string => line !== null);

  const result = await sendMail({
    replyTo: email,
    subject: `[Contact] ${String(subject ?? "New message").trim() || "New message"} — ${name}`,
    text: lines.join("\n"),
    html: renderEmailHtml({
      heading: "New message from the contact form",
      intro: `${name} sent a message through the Food & Coffee website.`,
      fields: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        ...(company ? [{ label: "Company", value: company }] : []),
        ...(phone ? [{ label: "Phone", value: phone }] : []),
      ],
      message: { label: "Message", text: message },
    }),
  });

  logEmail(
    "contact",
    { name, email, company, phone, subject, message },
    result.ok ? "sent" : "failed",
    result.ok ? undefined : result.error,
  );

  if (!result.ok) return res.status(500).json({ error: result.error });
  res.json({ ok: true });
};

export const sendQuoteEmail = async (req: Request, res: Response) => {
  const { company, name, phone, address, date, people, message } =
    req.body ?? {};

  if (
    !String(company ?? "").trim() ||
    !String(name ?? "").trim() ||
    !String(phone ?? "").trim()
  ) {
    return res
      .status(400)
      .json({ error: "Company, name and phone are required." });
  }

  const lines = [
    `Company: ${company}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    address ? `Delivery address: ${address}` : null,
    date ? `Date: ${date}` : null,
    people ? `Number of people: ${people}` : null,
    message ? "" : null,
    message ? "Message:" : null,
    message || null,
  ].filter((line): line is string => line !== null);

  const result = await sendMail({
    subject: `[Quote request] ${company} — ${name}`,
    text: lines.join("\n"),
    html: renderEmailHtml({
      heading: "New catering quote request",
      intro: `${name} requested a quote through the Food & Coffee website.`,
      fields: [
        { label: "Company", value: company },
        { label: "Name", value: name },
        { label: "Phone", value: phone },
        ...(address ? [{ label: "Delivery address", value: address }] : []),
        ...(date ? [{ label: "Date", value: date }] : []),
        ...(people
          ? [{ label: "Number of people", value: String(people) }]
          : []),
      ],
      ...(message ? { message: { label: "Message", text: message } } : {}),
    }),
  });

  logEmail(
    "quote",
    { company, name, phone, address, date, people, message },
    result.ok ? "sent" : "failed",
    result.ok ? undefined : result.error,
  );

  if (!result.ok) return res.status(500).json({ error: result.error });
  res.json({ ok: true });
};
