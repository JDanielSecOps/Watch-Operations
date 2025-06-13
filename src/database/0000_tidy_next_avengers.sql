CREATE TABLE "driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"date_and_time" timestamp NOT NULL,
	"drowsiness" integer NOT NULL,
	"seat_status" boolean NOT NULL,
	"vitals" boolean NOT NULL,
	"heart_rate" integer NOT NULL,
	"spo2" integer NOT NULL,
	"body_temperature" numeric(5, 1) NOT NULL,
	"environment" boolean NOT NULL,
	"ambient_temperature" numeric(5, 2) NOT NULL,
	"humidity" numeric(4, 1) NOT NULL,
	"alerts" integer NOT NULL,
	"tracking" boolean NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"speed" integer NOT NULL,
	"altitude_from_sea_level" integer NOT NULL
);
