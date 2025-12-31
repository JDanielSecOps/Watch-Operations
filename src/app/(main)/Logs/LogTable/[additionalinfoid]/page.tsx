"use client"

import { useState, useEffect, } from "react";
import Loading from "./loading";
import DateAndTimeCard from "@/components/dashboard-page/date-and-time-card/date-and-time-card";
import DrowsinessAndSeatStatus from "@/components/dashboard-page/drowsiness-and-seatstatus-card/drowsiness_and_seatstatus";
import React from "react";
import "@/styles/dashboard.scss"
import FourDataCard from "@/components/dashboard-page/four-data-card/four-data-card";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import UnitLoader from "@/customhooks/unitloadhook/unitloadhook";
import StateLoader from "@/customhooks/stateloadhook/stateloadhook";
import Alertsetter from "@/customhooks/alerthook/alerts";
import { useParams } from "next/navigation";
import StaticGooglemaps from "@/components/dynamic-drivers-log/static-google-maps/static-google-maps";
import { useRouter } from "next/navigation";






const DriverData = () => {

    const params = useParams()
    const dataid = params.additionalinfoid
    const router = useRouter()
    const supabase = createClient()



    const { data: query_data, isError } = useQuery({

        queryKey: ["driver data"],
        queryFn: async () => {
            const { data, error } = await supabase.from("driver")
                .select("*")
                .eq("id", dataid)

            if (error) {
                throw new Error(error.message)
                console.log(error)
                return
            }

            return data[0]
        }

    })

    const [PageLoaded, SetPageLoaded] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => { SetPageLoaded(true) }, 500)

        return () => { clearTimeout(timer) }
    }, [])

    const drowsiness = UnitLoader(query_data?.drowsiness, "%")
    const seat_status = StateLoader(query_data?.seat_status, "Occupied", "Unoccupied")

    const vitals = StateLoader(query_data?.vitals, "Normal", "Abnormal")
    const heart_rate = UnitLoader(query_data?.heart_rate, "BPM")
    const spO2 = UnitLoader(query_data?.spo2, "%")
    const body_temperature = UnitLoader(query_data?.body_temperature, "\u00B0C")

    const environment = StateLoader(query_data?.environment, "Normal", "Abnormal")
    const ambient_temperature = UnitLoader(query_data?.ambient_temperature, "\u00B0C")
    const humidity = UnitLoader(query_data?.humidity, "%")


    const tracking = StateLoader(query_data?.tracking, "Normal", "Abnormal")
    const latitude = UnitLoader(query_data?.latitude, "")
    const longitude = UnitLoader(query_data?.longitude, "")
    const speed = UnitLoader(query_data?.speed, "kmph")
    const Altitude_from_sea_level = UnitLoader(query_data?.altitude_from_sea_level, "m")

    const alerts = Alertsetter(query_data?.alerts)

    if (!PageLoaded) {
        return <Loading />
    }

    if (isError) {
        return (
            <div className="center_error">
                <div className="error">Data not available</div>
            </div>)
    }


    const date = new Date(query_data?.date_and_time).toLocaleString()












    function redirect() {
        router.push("/Logs/LogTable")
    }






    return (
        <>

            <div className="forward-status">
                <div className="gobackcentertop">
                    <button className="goback" onClick={redirect}>Go Back</button>
                </div>
                <DrowsinessAndSeatStatus drowsiness={drowsiness} seat_status={seat_status} className="drowsiness-and-seat-status" />
                <DateAndTimeCard date_and_time={date} className="date-and-time" />
            </div>

            <div className="grid">

                <FourDataCard
                    title_one="Vitals"
                    content_one={vitals}
                    color_one="var(--status_only)"

                    title_two="Heart Rate"
                    content_two={heart_rate}
                    color_two="var(--values_only)"

                    title_three="SpO2"
                    content_three={spO2}
                    color_three="var(--values_only)"

                    title_four="Body Temperature"
                    content_four={body_temperature}
                    color_four="var(--values_only)"
                />

                <FourDataCard
                    title_one="Environment"
                    content_one={environment}
                    color_one="var(--status_only)"

                    title_two="Ambient Temperature"
                    content_two={ambient_temperature}
                    color_two="var(--values_only)"

                    title_three="Humidity"
                    content_three={humidity}
                    color_three="var(--values_only)"

                />

                <FourDataCard

                    title_one="Tracking"
                    content_one={tracking}
                    color_one="var(--status_only)"

                    title_two="Latitude"
                    content_two={latitude}
                    color_two="var(--values_only)"

                    title_three="Longitude"
                    content_three={longitude}
                    color_three="var(--values_only)"

                    title_four="Speed"
                    content_four={speed}
                    color_four="var(--values_only)"

                    title_five="Altitude from sea level"
                    content_five={Altitude_from_sea_level}
                    color_five="var(--values_only)"

                />

                <FourDataCard classname="alertscard"
                    title_one="Alerts"
                    content_one={alerts}
                    color_one="var(--card_text_color)"
                />
            </div>


            <div className="mapcenter">
                <StaticGooglemaps latitude={latitude} longitude={longitude} />
            </div>

            <div className="gobackcenter">
                <button className="goback" onClick={redirect}>Go Back</button>
            </div>

        </>
    )
}


export default DriverData