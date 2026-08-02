function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get MONGO_URI() {
    return required("MONGO_URI");
  },
  get JWT_SECRET() {
    return required("JWT_SECRET");
  },
  get IMGBB_API_KEY() {
    return required("IMGBB_API_KEY");
  },
  get CORS_ORIGINS() {
    return (process.env.CORS_ORIGINS ?? "").split(",").map((o) => o.trim()).filter(Boolean);
  },
};
