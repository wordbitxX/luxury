import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/*  Maison Noor — bookings, orders, enquiries                          */
/*  Structured so an admin dashboard can manage them directly.         */
/* ------------------------------------------------------------------ */

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  ref: varchar("ref", { length: 32 }).notNull().unique(),
  date: varchar("date", { length: 16 }).notNull(),
  time: varchar("time", { length: 8 }).notNull(),
  guests: integer("guests").notNull(),
  seating: varchar("seating", { length: 64 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).default(""),
  occasion: varchar("occasion", { length: 200 }).default(""),
  request: text("request").default(""),
  status: varchar("status", { length: 24 }).notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  ref: varchar("ref", { length: 32 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).default(""),
  email: varchar("email", { length: 200 }).notNull(),
  serviceType: varchar("service_type", { length: 24 }).notNull(), // delivery | pickup | dinein
  area: varchar("area", { length: 80 }).default(""),
  address: text("address").default(""),
  items: jsonb("items").notNull(),
  total: integer("total").notNull(),
  discount: integer("discount").notNull().default(0),
  payment: varchar("payment", { length: 24 }).notNull().default("cod"),
  note: text("note").default(""),
  status: varchar("status", { length: 24 }).notNull().default("received"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  eventType: varchar("event_type", { length: 80 }).notNull(),
  guests: integer("guests").notNull(),
  date: varchar("date", { length: 16 }).default(""),
  message: text("message").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
