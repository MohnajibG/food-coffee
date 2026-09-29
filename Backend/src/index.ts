import dotenv from "dotenv";
dotenv.config();

import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkoutRoutes";
import mailRoutes from "./routes/mailRoutes";
import { isAllowedOrigin } from "./utils/origin";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.get("/", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/", checkoutRoutes);
app.use("/", mailRoutes);

// Catches unhandled errors (including the CORS rejection above) so the API
// always returns clean JSON instead of Express's default HTML/stack trace.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  const isCorsError = err.message === "Not allowed by CORS";
  res
    .status(isCorsError ? 403 : 500)
    .json({ error: isCorsError ? err.message : "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
