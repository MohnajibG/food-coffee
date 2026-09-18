import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createCheckoutSession } from "../controllers/checkoutController";

const router = Router();

const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/create-checkout-session",
  checkoutLimiter,
  createCheckoutSession,
);

export default router;
