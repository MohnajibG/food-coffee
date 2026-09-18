import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkoutRoutes";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/", checkoutRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
