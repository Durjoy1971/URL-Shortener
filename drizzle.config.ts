import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./models/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
