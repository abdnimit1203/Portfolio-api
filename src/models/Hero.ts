import { Schema, model } from "mongoose";

const heroSchema = new Schema({
  headline: { type: String, required: true },
  subheadline: { type: String, default: "" },
  typewriterRoles: { type: [String], default: [] },
  cvUrl: { type: String, default: "" },
  hireMeText: { type: String, default: "Hire Me" },
  hireMeUrl: { type: String, default: "" },
});

export const Hero = model("Hero", heroSchema);
