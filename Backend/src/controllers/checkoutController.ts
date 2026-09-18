import { Request, Response } from "express";
import Stripe from "stripe";
import { PRICE_BY_NAME } from "../data/products";
import { isAllowedOrigin } from "../utils/origin";

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error("Stripe secret key not found. Check your .env file!");
}

const stripe = new Stripe(stripeKey, { apiVersion: "2025-11-17.clover" });

const MAX_QTY_PER_ITEM = 20;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { cart, customer } = req.body;

  const requestOrigin = req.get("origin");
  const frontendUrl =
    requestOrigin && isAllowedOrigin(requestOrigin)
      ? requestOrigin
      : process.env.FRONTEND_URL;

  if (!frontendUrl) {
    return res.status(500).json({ error: "Frontend origin not configured" });
  }

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: "Cart is required" });
  }

  if (!EMAIL_RE.test(customer?.email || "")) {
    return res.status(400).json({ error: "A valid customer email is required" });
  }
  if (!customer?.name?.trim()) {
    return res.status(400).json({ error: "Customer name is required" });
  }

  const line_items = [];
  for (const item of cart) {
    const price = PRICE_BY_NAME.get(item?.name);
    if (price === undefined) {
      return res.status(400).json({ error: `Unknown product: ${item?.name}` });
    }

    const qty = Math.trunc(Number(item.qty));
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_ITEM) {
      return res.status(400).json({ error: `Invalid quantity for: ${item.name}` });
    }

    line_items.push({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(price * 100),
      },
      quantity: qty,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: customer?.email,
      metadata: {
        customer_name: customer?.name || "",
        customer_phone: customer?.phone || "",
      },
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe checkout session failed" });
  }
};
