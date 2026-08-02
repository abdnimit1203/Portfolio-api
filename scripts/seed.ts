import "dotenv/config";
import dns from "dns";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// See src/lib/db.ts for why this is needed (local DNS proxy blocks SRV lookups).
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import { env } from "../src/lib/env";
import { Admin } from "../src/models/Admin";
import { Hero } from "../src/models/Hero";
import { SocialLink } from "../src/models/SocialLink";
import { Skill } from "../src/models/Skill";
import { Project } from "../src/models/Project";

// Icon paths assume the icon files from My-React-Portfolio/public/assets/images
// are copied into My-Web-Portfolio/public/icons/ with the same filenames.
const icon = (file: string) => `/icons/${file}`;

async function seed() {
  await mongoose.connect(env.MONGO_URI);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before seeding");
  }
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await Admin.findOneAndUpdate(
    { email: adminEmail },
    { email: adminEmail, passwordHash },
    { upsert: true }
  );

  await Hero.findOneAndUpdate(
    {},
    {
      headline: "Hi! I'm Abdullah",
      subheadline:
        "Passionate and detail-oriented Front-End Developer proficient in the MERN stack with hands-on experience in creating responsive and user-friendly web applications.",
      typewriterRoles: [
        "Web Developer",
        "Front-End React Developer",
        "Backend - MERN Stack Developer",
        "Front-End Developer",
      ],
      cvUrl: "/resume/Abdullah-Ibne-Ali-Resume.pdf",
      hireMeText: "Hire Me",
      hireMeUrl: "#contact",
    },
    { upsert: true }
  );

  await SocialLink.deleteMany({});
  await SocialLink.insertMany([
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/abdullah-ibne-ali", iconKey: "linkedin", order: 0 },
    { platform: "GitHub", url: "https://github.com/abdnimit1203", iconKey: "github", order: 1 },
    { platform: "Facebook", url: "https://www.facebook.com/abd.nimit", iconKey: "facebook", order: 2 },
  ]);

  await Skill.deleteMany({});
  await Skill.insertMany([
    { name: "HTML5", iconUrl: icon("html5.png"), percentage: 90, order: 0 },
    { name: "CSS", iconUrl: icon("css.png"), percentage: 85, order: 1 },
    { name: "JavaScript", iconUrl: icon("js.png"), percentage: 85, order: 2 },
    { name: "React", iconUrl: icon("react.png"), percentage: 80, order: 3 },
    { name: "Tailwind CSS", iconUrl: icon("tailwind.png"), percentage: 80, order: 4 },
    { name: "Next.js", iconUrl: icon("nextjs.png"), percentage: 65, order: 5 },
    { name: "Node.js", iconUrl: icon("node.png"), percentage: 70, order: 6 },
    { name: "Express", iconUrl: icon("express.png"), percentage: 65, order: 7 },
    { name: "MongoDB", iconUrl: icon("mongo.png"), percentage: 65, order: 8 },
    { name: "Git & GitHub", iconUrl: icon("github.png"), percentage: 75, order: 9 },
    { name: "Bootstrap", iconUrl: icon("bootstrap.png"), percentage: 60, order: 10 },
    { name: "Firebase", iconUrl: icon("fire.png"), percentage: 55, order: 11 },
    { name: "Python", iconUrl: icon("python.png"), percentage: 50, order: 12 },
  ]);

  const mernIcons = [icon("mongo.png"), icon("express.png"), icon("react.png"), icon("node.png")];
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "ABuild Homes Estate",
      description:
        "A real estate website where people can buy houses by offering a price. There are 3 roles and dashboards for each type of user — User, Agent and Admin. Admin manages properties, total sales and user roles. Stripe payment is available.",
      images: ["https://i.imgur.com/VSH8CJ6.png", "https://i.imgur.com/RH5Gc40.png", "https://i.imgur.com/afi9cSD.png", "https://i.imgur.com/ALejUMr.png"],
      techIcons: mernIcons,
      githubUrl: "https://github.com/abdnimit1203/Abuild-Homes-Estate-Client",
      liveUrl: "https://abuild-homes-estate-abd.netlify.app/",
      demoEmail: "demo@email.com",
      demoPassword: "Demo123@",
      featured: true,
      order: 0,
    },
    {
      title: "Wheels World",
      description:
        "A car dealership website where people can buy cars. Mostly frontend-based with some backend features — choose from brands, add to cart, then checkout with your price. Dark theme available and fully mobile friendly.",
      images: ["https://i.imgur.com/mEaH2ts.png", "https://i.imgur.com/RVkfpN9.png", "https://i.imgur.com/LmnQbpC.png", "https://i.imgur.com/SU7hQlR.png", "https://i.imgur.com/OnQdcVY.png"],
      techIcons: mernIcons,
      githubUrl: "https://github.com/abdnimit1203/Wheels-World",
      liveUrl: "https://brand-shop-automotive-b8a10.web.app/",
      demoEmail: "demo@email.com",
      demoPassword: "Demo123@",
      featured: false,
      order: 1,
    },
    {
      title: "ColabTask",
      description:
        "An online student group-study platform where students share assignments and submit them together, chat and discuss. Submitted assignments can be marked or left pending, and students can see all their submitted assignments and details.",
      images: ["https://i.imgur.com/d6Y4B8D.png", "https://i.imgur.com/3Hmi51N.png", "https://i.imgur.com/NxWTtU9.png", "https://i.imgur.com/p06Y0kn.png", "https://i.imgur.com/UiJdpIg.png"],
      techIcons: mernIcons,
      githubUrl: "https://github.com/abdnimit1203/Online-group-study",
      liveUrl: "https://online-group-study-fdf3b.web.app",
      demoEmail: "demo@email.com",
      demoPassword: "Demo123@",
      featured: false,
      order: 2,
    },
  ]);

  // No testimonials seeded — none existed on the old site. Add real ones via the dashboard.

  console.log("Seed complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
