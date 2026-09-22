# Food & Coffee

Ordering site for a catering & campus-cafeteria business: menu browsing, cart, Stripe checkout, and two contact/quote forms. A React frontend and an Express backend, deployed separately.

## Stack

**Frontend** (`Frontend/`) — React 19, Vite, TypeScript, Tailwind CSS v4, React Router, Framer Motion, Zustand.

**Backend** (`Backend/`) — Express 5, TypeScript, Stripe (checkout), MailerSend (transactional email), Mongoose/MongoDB (optional order & email logging).

## Project structure

```
Frontend/
  src/
    components/   shared UI (cart, product cards, forms, nav, footer...)
    pages/        routed pages (Home, Order, Traiteur, Cafeterias, Contact, Success, Cancel)
    data/         static menu/campus content (cafeterias.json)
    lib/          API_URL and other small frontend utilities
    types/        shared TypeScript types (Product, CartItem)

Backend/
  src/
    controllers/  request handlers (checkout, mail)
    routes/       Express route definitions
    data/         server-side product price catalog (validates cart prices)
    db/           MongoDB connection helper
    models/       Mongoose schemas (Order, EmailLog)
    utils/        mailer, email template, CORS/origin allowlist
  email-templates/  standalone HTML email template (for MailerSend's template editor)
```

## Features

- **Menu & cart** — browse categories, add products with quantity, floating cart with a fly-to-cart animation.
- **Stripe Checkout** — the backend revalidates every product's price and quantity server-side against its own catalog (`Backend/src/data/products.ts`) before creating the Stripe session, so a tampered client-side price is never trusted.
- **Contact & quote-request forms** — sent server-side via MailerSend (never from the browser, since SMTP/API credentials can't safely live in client code).
- **Campus browser** — cafeteria locations with a photo carousel and today's menu.
- **Optional MongoDB logging** — every checkout and every email attempt (sent or failed) is recorded when `MONGO_URI` is configured; the app works fine without it, logging is best-effort and never blocks a request.

## Getting started

Requires Node.js and Yarn (frontend) / npm (backend).

```bash
# Backend
cd Backend
npm install
cp .env.example .env   # fill in the values below
npm run dev             # http://localhost:3000

# Frontend (separate terminal)
cd Frontend
yarn install
echo "VITE_API_URL=http://localhost:3000" > .env
yarn dev                 # http://localhost:5173
```

The backend accepts requests from any `http://localhost:<port>` origin automatically, so the frontend's dev port doesn't need to match anything specific.

## Environment variables

### Backend (`Backend/.env`)

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | no (defaults to 3000) | Port the server listens on |
| `STRIPE_SECRET_KEY` | **yes** | Stripe secret key; the server refuses to start without it |
| `FRONTEND_URL` | no | Extra allowed origin for CORS and Stripe redirect URLs, beyond any `localhost` port — set this to your production frontend domain once deployed |
| `MAILERSEND_API_KEY` | for email | MailerSend API token |
| `MAIL_FROM` | for email | Sender address, must be a domain verified in MailerSend |
| `MAIL_TO` | for email | Inbox that receives contact/quote submissions |
| `MONGO_URI` | no | MongoDB connection string; when unset, order/email logging is silently skipped |

### Frontend (`Frontend/.env`)

| Variable | Required | Purpose |
|---|---|---|
| `VITE_API_URL` | no (defaults to `http://localhost:3000`) | Base URL of the backend API |

## Scripts

| | Backend | Frontend |
|---|---|---|
| Dev server | `npm run dev` | `yarn dev` |
| Production build | `npm run build` | `yarn build` |
| Run built app | `npm start` | `yarn preview` |
| Lint | — | `yarn lint` |

## Deployment

- **Frontend** — Netlify (see `netlify.toml`): builds from `Frontend/`, publishes `dist/`. Set `VITE_API_URL` to the deployed backend URL in Netlify's environment variables.
- **Backend** — Northflank (or any Node host). Set all the required environment variables above in the platform's dashboard — `.env` is never committed, so nothing is configured automatically. The server exposes `GET /` returning `200 { status: "ok" }` for health checks.
