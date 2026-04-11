import { boolean } from "drizzle-orm/pg-core";
import {
  uuid,
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 322 }).notNull().unique(),
  password: varchar("password", { length: 66 }),
  email_verified: boolean().default(false).notNull(),
  salt: text("salt"),
  hash: varchar("hash", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const movies = pgTable("movies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 250 }).notNull(),
  description: text(),
  release_date: timestamp({ mode: "date" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
