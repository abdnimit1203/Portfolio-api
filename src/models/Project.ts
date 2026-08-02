import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], default: [] },
  techIcons: { type: [String], default: [] },
  githubUrl: { type: String, default: "" },
  liveUrl: { type: String, default: "" },
  demoEmail: { type: String, default: "" },
  demoPassword: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

export const Project = model("Project", projectSchema);
