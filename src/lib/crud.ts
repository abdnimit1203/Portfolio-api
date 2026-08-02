import { Router } from "express";
import type { Model } from "mongoose";

export function publicListRouter(model: Model<any>) {
  const router = Router();
  router.get("/", async (_req, res) => {
    const items = await model.find().sort({ order: 1 });
    res.json(items);
  });
  return router;
}

export function adminCrudRouter(model: Model<any>) {
  const router = Router();

  router.get("/", async (_req, res) => {
    const items = await model.find().sort({ order: 1 });
    res.json(items);
  });

  router.post("/", async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json(item);
  });

  router.put("/:id", async (req, res) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  });

  router.delete("/:id", async (req, res) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  });

  return router;
}
