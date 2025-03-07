import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://Healthcare_db_owner:npg_iFA9doIQtO6T@ep-odd-paper-a5kmk66b-pooler.us-east-2.aws.neon.tech/Healthcare_db?sslmode=require"
);
export const db = drizzle(sql, { schema });

