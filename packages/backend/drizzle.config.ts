import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: DATABASE_HOST || "localhost",
    port: DATABASE_PORT ? parseInt(DATABASE_PORT, 10) : 5433,
    user: DATABASE_USER || "levelup",
    password: DATABASE_PASSWORD || "levelup",
    database: DATABASE_NAME || "levelup",
    ssl: false
  },
  verbose: true,
} satisfies Config;
