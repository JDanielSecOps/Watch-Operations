import { bigint, boolean, date, integer, numeric, pgTable, point, primaryKey, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";



export const Vitals = pgTable('Vitals', (column)=>({

  id:column.uuid("id").notNull(),
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

}),(table)=>[

  primaryKey(table.id,table.date_and_time)
  
]);

export const Driver =pgTable("Driver",(column)=>({

  id:column.uuid("id").notNull(),
  name:column.varchar("driver_name",{length:255}).notNull(),

  unique_id:column.numeric("unique_identifier").notNull(),
  license_plate:column.varchar("lisence_plate",{length:100}).notNull(),
  
  blood_group:column.varchar("blood_group",{length:3}).notNull(),
  dob:column.date("DOB").notNull(),
  phone_number:column.numeric("phone_number",{precision:10}).notNull()

}),(table)=>[

  primaryKey(table.id)

])

export const Alerts =pgTable("Alerts",(column)=>({

  id:column.uuid("id").notNull(),
  date_and_time:column.timestamp("date_and_time").notNull()

}),(table)=>[

  primaryKey(table.id,table.date_and_time)

])