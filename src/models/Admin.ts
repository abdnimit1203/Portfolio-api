import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export const Admin = model("Admin", adminSchema);
