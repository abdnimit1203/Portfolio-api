import { Schema, model } from "mongoose";

const skillSchema = new Schema({
  name: { type: String, required: true },
  iconUrl: { type: String, required: true },
  percentage: { type: Number, required: true, min: 0, max: 100 },
  order: { type: Number, default: 0 },
});

export const Skill = model("Skill", skillSchema);
