import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkoutRoutes";
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
