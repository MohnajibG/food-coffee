// Accepts any localhost port so local dev keeps working regardless of which
// port Vite happens to pick, plus whatever FRONTEND_URL is configured for prod.
const LOCALHOST_ORIGIN_RE = /^https?:\/\/localhost:\d+$/;

export const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return true;
  if (LOCALHOST_ORIGIN_RE.test(origin)) return true;
  return origin === process.env.FRONTEND_URL;
};
