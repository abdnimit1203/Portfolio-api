import dns from "dns";
import mongoose from "mongoose";
import { env } from "./env";

// Local DNS proxies (e.g. Cloudflare WARP binding 127.0.0.1) can refuse SRV
// record lookups even though A-record queries succeed, breaking mongodb+srv://.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let isConnected = false;

export async function connectDB() {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  await mongoose.connect(env.MONGO_URI);
  isConnected = true;
}
