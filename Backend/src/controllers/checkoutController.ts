import { Request, Response } from "express";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error("Stripe secret key not found. Check your .env file!");
}

const stripe = new Stripe(stripeKey);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart)) {
    return res.status(400).json({ error: "Cart is required" });
  }

  const line_items = cart.map((item: any) => ({
    price_data: {
      currency: "eur",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe checkout session failed" });
  }
};
