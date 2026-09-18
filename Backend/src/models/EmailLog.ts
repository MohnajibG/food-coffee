import { Schema, model } from "mongoose";

const emailLogSchema = new Schema(
  {
    type: { type: String, enum: ["contact", "quote"], required: true },
    fields: { type: Schema.Types.Mixed, required: true },
    status: { type: String, enum: ["sent", "failed"], required: true },
    error: { type: String },
  },
  { timestamps: true },
);

export const EmailLog = model("EmailLog", emailLogSchema);
