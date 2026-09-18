import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    items: { type: [orderItemSchema], required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    amountTotal: { type: Number, required: true },
    stripeSessionId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Order = model("Order", orderSchema);
