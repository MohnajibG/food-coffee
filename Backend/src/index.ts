import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkoutRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", checkoutRoutes);

// Routes de test pour success / cancel
app.get("/success", (req, res) => res.send("Payment successful!"));
app.get("/cancel", (req, res) => res.send("Payment canceled."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
