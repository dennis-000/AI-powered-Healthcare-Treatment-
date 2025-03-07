import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text, json } from "drizzle-orm/pg-core";

// users schema
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  folders: text("folders").array().default(sql`ARRAY[]::text[]`), // Fixing array issue
  treatment_counts: integer("treatment_counts").notNull().default(0),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
});

// records schema
export const Records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  recordName: varchar("record_name", { length: 255 }).notNull(),
  analysisResult: varchar("analysis_result", { length: 255 }).notNull(),
  kanbanRecords: json("kanban_records").default(sql.raw("'{}'::json")), // Fixing JSON issue
  createdBy: varchar("created_by", { length: 255 }).notNull(),
});
