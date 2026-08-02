import { Schema, model } from "mongoose";

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, default: "" },
  company: { type: String, default: "" },
  quote: { type: String, required: true },
  avatarUrl: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

export const Testimonial = model("Testimonial", testimonialSchema);
