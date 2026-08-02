import { Schema, model } from "mongoose";

const socialLinkSchema = new Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  iconKey: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const SocialLink = model("SocialLink", socialLinkSchema);
