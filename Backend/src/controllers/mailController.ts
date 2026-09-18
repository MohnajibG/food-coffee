import { Request, Response } from "express";
import { escapeHtml, sendMail } from "../utils/mailer";
import { ensureDbConnection } from "../db/connection";
import { EmailLog } from "../models/EmailLog";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const logEmail = async (
  type: "contact" | "quote",
  fields: Record<string, unknown>,
  status: "sent" | "failed",
  error?: string,
) => {
  try {
    if (!(await ensureDbConnection())) return;
    await EmailLog.create({ type, fields, status, error });
  } catch (err) {
    console.error("Failed to log email to MongoDB:", err);
  }
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
    html: [
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : "",
      phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "",
      `<p><strong>Message:</strong></p>`,
      `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    ].join("\n"),
  });

  await logEmail(
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
    html: [
      `<p><strong>Company:</strong> ${escapeHtml(company)}</p>`,
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
      address
        ? `<p><strong>Delivery address:</strong> ${escapeHtml(address)}</p>`
        : "",
      date ? `<p><strong>Date:</strong> ${escapeHtml(date)}</p>` : "",
      people
        ? `<p><strong>Number of people:</strong> ${escapeHtml(String(people))}</p>`
        : "",
      message
        ? `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`
        : "",
    ].join("\n"),
  });

  await logEmail(
    "quote",
    { company, name, phone, address, date, people, message },
    result.ok ? "sent" : "failed",
    result.ok ? undefined : result.error,
  );

  if (!result.ok) return res.status(500).json({ error: result.error });
  res.json({ ok: true });
};
