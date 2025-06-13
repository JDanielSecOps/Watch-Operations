import { doublePrecision } from "drizzle-orm/gel-core";
import { boolean, integer, numeric, pgTable, point, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";



export const driver = pgTable('driver', (column)=>({
  id:column.serial('id').primaryKey().notNull(),
  date_and_time:column.timestamp("date_and_time").notNull(),

  drowsiness:column.integer("drowsiness").notNull(),
  seat_status:column.boolean("seat_status").notNull(),

  vitals:column.boolean("vitals").notNull(),
  heart_rate:column.integer("heart_rate").notNull(),
  spo2:column.integer("spo2").notNull(),
  body_temperature:column.numeric("body_temperature",{precision:5,scale:1}).notNull(),

  environment:column.boolean("environment").notNull(),
  ambient_temperature:column.numeric("ambient_temperature",{precision:5,scale:2}).notNull(),
  humidity:column.numeric("humidity",{precision:4,scale:1}).notNull(),

  alerts:column.integer("alerts").notNull(),

  tracking:column.boolean("tracking").notNull(),
  latitude:column.doublePrecision("latitude").notNull(),
  longitude:column.doublePrecision("longitude").notNull(),
  speed:column.integer("speed").notNull(),
  altitude_from_sea_level:column.integer("altitude_from_sea_level").notNull()

}));