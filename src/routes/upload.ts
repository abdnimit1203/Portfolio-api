import { Router } from "express";
import multer from "multer";
import { env } from "../lib/env";

export const uploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  const form = new FormData();
  form.append("image", req.file.buffer.toString("base64"));

  const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${env.IMGBB_API_KEY}`, {
    method: "POST",
    body: form,
  });

  if (!imgbbRes.ok) {
    return res.status(502).json({ error: "Image upload failed" });
  }

  const data = (await imgbbRes.json()) as { data: { url: string } };
  res.json({ url: data.data.url });
});
