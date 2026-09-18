import { escapeHtml } from "./mailer";

interface EmailField {
  label: string;
  value: string;
}

interface EmailTemplateInput {
  heading: string;
  intro: string;
  fields: EmailField[];
  message?: { label: string; text: string };
}

const fieldRow = ({ label, value }: EmailField) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0ece2;font-size:14px;color:#875d65;width:160px;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #f0ece2;font-size:14px;color:#1a1a1a;vertical-align:top;">
      ${escapeHtml(value)}
    </td>
  </tr>`;

export const renderEmailHtml = ({
  heading,
  intro,
  fields,
  message,
}: EmailTemplateInput): string => `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background-color:#f7f1e4;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f1e4;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);">
            <tr>
              <td style="background-color:#4a1f29;padding:28px 32px;">
                <span style="font-size:22px;font-weight:700;letter-spacing:0.06em;color:#d8b56a;">FOOD &amp; COFFEE</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 8px;font-size:20px;color:#1a1a1a;">${escapeHtml(heading)}</h1>
                <p style="margin:0 0 24px;font-size:14px;color:#875d65;">${escapeHtml(intro)}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${fields.map(fieldRow).join("")}
                </table>

                ${
                  message
                    ? `
                <div style="margin-top:24px;">
                  <p style="margin:0 0 6px;font-size:14px;color:#875d65;">${escapeHtml(message.label)}</p>
                  <div style="padding:16px;background-color:#f7f1e4;border-radius:12px;font-size:14px;line-height:1.6;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(message.text)}</div>
                </div>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f7f1e4;">
                <p style="margin:0;font-size:12px;color:#875d65;">Sent automatically from the Food &amp; Coffee website.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
