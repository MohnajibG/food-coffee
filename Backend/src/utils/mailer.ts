import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

let mailerSend: MailerSend | null = null;

const getMailerSend = (): MailerSend | null => {
  if (mailerSend) return mailerSend;

  const apiKey = process.env.MAILERSEND_API_KEY;
  if (!apiKey) return null;

  mailerSend = new MailerSend({ apiKey });
  return mailerSend;
};

export const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );

interface SendMailInput {
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export const sendMail = async ({
  replyTo,
  subject,
  html,
  text,
}: SendMailInput): Promise<{ ok: true } | { ok: false; error: string }> => {
  const client = getMailerSend();
  const fromEmail = process.env.MAIL_FROM;
  const toEmail = process.env.MAIL_TO;

  if (!client || !fromEmail || !toEmail) {
    return { ok: false, error: "Email service is not configured." };
  }

  const sentFrom = new Sender(fromEmail, "Food & Coffee website");
  const recipients = [new Recipient(toEmail)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(html)
    .setText(text);

  if (replyTo) {
    emailParams.setReplyTo(new Sender(replyTo));
  }

  try {
    await client.email.send(emailParams);
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Failed to send email." };
  }
};
