import { Router } from "express";
import rateLimit from "express-rate-limit";
import { sendContactEmail, sendQuoteEmail } from "../controllers/mailController";

const router = Router();

const mailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/contact", mailLimiter, sendContactEmail);
router.post("/quote", mailLimiter, sendQuoteEmail);

export default router;
