import "dotenv/config";
import express, { Router } from "express";
import cors from "cors";
import { connectDB } from "./lib/db";
import { env } from "./lib/env";
import { publicListRouter, adminCrudRouter } from "./lib/crud";
import { requireAuth } from "./middleware/auth";
import { authRouter } from "./routes/auth";
import { uploadRouter } from "./routes/upload";
import { Hero } from "./models/Hero";
import { SocialLink } from "./models/SocialLink";
import { Skill } from "./models/Skill";
import { Project } from "./models/Project";
import { Testimonial } from "./models/Testimonial";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = env.CORS_ORIGINS;
      const isWildcardMatch = /\.netlify\.app$|\.vercel\.app$/.test(origin);
      if (allowed.includes(origin) || isWildcardMatch) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

app.get("/", (_req, res) => {
  res.json({
    message: "Abdullah's Portfolio API Server",
    status: "online",
    health: "/api/health",
    documentation: "https://github.com/abdnimit1203/Portfolio-api",
  });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Public read endpoints
app.get("/api/hero", async (_req, res) => {
  const hero = await Hero.findOne();
  res.json(hero);
});
app.use("/api/socials", publicListRouter(SocialLink));
app.use("/api/skills", publicListRouter(Skill));
app.use("/api/projects", publicListRouter(Project));
app.use("/api/testimonials", publicListRouter(Testimonial));

// Admin (JWT-protected) endpoints
const adminRouter = Router();
adminRouter.use(requireAuth);
adminRouter.put("/hero", async (req, res) => {
  const hero = await Hero.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(hero);
});
adminRouter.use("/socials", adminCrudRouter(SocialLink));
adminRouter.use("/skills", adminCrudRouter(Skill));
adminRouter.use("/projects", adminCrudRouter(Project));
adminRouter.use("/testimonials", adminCrudRouter(Testimonial));
adminRouter.use("/upload", uploadRouter);
app.use("/api/admin", adminRouter);

app.use("/api/auth", authRouter);

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  const port = process.env.PORT ?? 4000;
  app.listen(port, () => console.log(`portfolio-api listening on :${port}`));
}

export default app;
