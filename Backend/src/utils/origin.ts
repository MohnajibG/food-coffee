// Accepts any localhost/127.0.0.1/private-LAN port so local dev keeps working
// regardless of which port Vite picks or which host it's reached on (a phone
// testing over Wi-Fi hits the machine's LAN IP, not "localhost"), plus
// whatever FRONTEND_URL is configured for prod.
const LOCAL_ORIGIN_RE =
  /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|192\.168\.\d+\.\d+):\d+$/;

export const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return true;
  if (LOCAL_ORIGIN_RE.test(origin)) return true;
  return origin === process.env.FRONTEND_URL;
};
