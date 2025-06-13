"use client"
import { useState,useEffect, JSX } from "react";
import Loading from "./loading";
import DateAndTimeCard from "@/components/dashboard-page/date-and-time-card/date-and-time-card";
import DrowsinessAndSeatStatus from "@/components/dashboard-page/drowsiness-and-seatstatus-card/drowsiness_and_seatstatus";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "@/styles/dashboard.scss"
import FourDataCard from "@/components/dashboard-page/four-data-card/four-data-card";
import Googlemaps from "@/components/dashboard-page/google-maps/google-maps";
import { createClient } from "@/utils/supabase/client";
import { keepPreviousData, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import MiniLoader from "@/components/mini-loader/mini-loader";
import UnitLoader from "@/customhooks/unitloadhook/unitloadhook";
import StateLoader from "@/customhooks/stateloadhook/stateloadhook";
import Alertsetter from "@/customhooks/alerthook/alerts";
import { data } from "motion/react-client";






const DashBoard =()=>{
   
    const supabase =createClient()

    const [Index,setIndex]=useState<number>(0)



    
   
    const  db_count=useQuery({  // to get the number of rows present in the db
        
        queryKey:["db_count"],
        queryFn:async ()=>{

        const {count : rowcount,error}=await supabase.from("driver")
        .select("*",{count:"exact",head:true})

            if(error){
                console.log(error)
                return null
            }

            
            return rowcount
    },
        
    })



    const driver_data=useQuery({ // to query the driver information

        queryKey:["db_query",Index],
        queryFn: async ()=>{
        const {data : driver_data,error}=await supabase.from("driver")
        .select("*")
        .range(Index,Index)

        
        if(error){
            console.log(error)
            return null
        }
       
        return driver_data ? driver_data[0] : null
    },
        enabled:db_count.isSuccess,
        
    })

    useEffect(()=>{ // to increment the index so to get the newrows
        if(!db_count.data) return 
        
        const incrementor=setInterval(()=>{
            setIndex((prevIndex : number)=>{
                if(db_count.data!==null && prevIndex>=db_count.data-1){
                    return 0
                }

                return prevIndex+1
            })
        },1000)

        return ()=>{clearInterval(incrementor)}

    },[db_count.data])

    const date=new Date().toLocaleString()

    const drowsiness=UnitLoader(driver_data?.data?.drowsiness,"%")
    const seat_status=StateLoader(driver_data?.data?.seat_status,"Occupied","Unoccupied")

    const vitals =StateLoader(driver_data?.data?.vitals,"Normal","Abnormal")
    const heart_rate=UnitLoader(driver_data?.data?.heart_rate,"BPM")
    const spO2 =UnitLoader(driver_data?.data?.spo2,"%")
    const body_temperature=UnitLoader(driver_data?.data?.body_temperature,"\u00B0C")

    const environment =StateLoader(driver_data?.data?.environment,"Normal","Abnormal")
    const ambient_temperature=UnitLoader(driver_data?.data?.ambient_temperature,"\u00B0C")
    const humidity=UnitLoader(driver_data?.data?.humidity,"%")


    const tracking =StateLoader(driver_data?.data?.tracking,"Normal","Abnormal")
    const latitude =UnitLoader(driver_data?.data?.latitude,"")
    const longitude =UnitLoader(driver_data?.data?.longitude,"")
    const speed =UnitLoader(driver_data?.data?.speed,"kmph")
    const Altitude_from_sea_level=UnitLoader(driver_data?.data?.altitude_from_sea_level,"m")

    const alerts =Alertsetter(driver_data?.data?.alerts)

    type chart_data_type={
        
        time?:string | null | undefined,
        heart_rate?:number| null | undefined,
        spo2?:number| null | undefined,
        breathing_rate?:number| null | undefined
    }
    
    const [chart_data,setchartdata]=useState<chart_data_type[]>([])

    
    useEffect(()=>{
        if(driver_data?.data){

            setchartdata((prev)=>{

                const new_data_point={
                    time:new Date().toLocaleTimeString(),
                    heart_rate:driver_data?.data?.heart_rate,
                    spo2:driver_data?.data?.spo2,
                    body_temperature:driver_data?.data?.body_temperature
                }

                return [...prev.slice(-20),new_data_point]
            })
        }
    },[driver_data?.data])
    

    const [PageLoaded,SetPageLoaded]=useState(false)

    useEffect(()=>{
        const timer =setTimeout(()=>{SetPageLoaded(true)},1000)
        
        return ()=>{clearTimeout(timer)}
    },[])

    if(!PageLoaded){
    return <Loading/>
    }

    

    
    
    
    return(
        <>
            <div className="forward-status">
            <DrowsinessAndSeatStatus drowsiness={drowsiness} seat_status={seat_status} className="drowsiness-and-seat-status"/>
            <DateAndTimeCard date_and_time={`${date}`} className="date-and-time"/>
        </div>

        <div className="grid">

            <FourDataCard
            title_one="Vitals"
            content_one={vitals}
            color_one="#D8B4DD"

            title_two="Heart Rate"
            content_two={heart_rate}
            color_two="#A3C4F7"

            title_three="SpO2"
            content_three={spO2}
            color_three="#A3C4F7"

            title_four="Body Temperature"
            content_four={body_temperature}
            color_four="#A3C4F7"
            />

            <FourDataCard
            title_one="Environment"
            content_one={environment}
            color_one="#D8B4DD"

            title_two="Ambient Temperature"
            content_two={ambient_temperature}
            color_two="#A3C4F7"

            title_three="Humidity"
            content_three={humidity}
            color_three="#A3C4F7"

            />

            <FourDataCard

            title_one="Tracking"
            content_one={tracking}
            color_one="#D8B4DD"

            title_two="Latitude"
            content_two={latitude}
            color_two="#A3C4F7"

            title_three="Longitude"
            content_three={longitude}
            color_three="#A3C4F7"

            title_four="Speed"
            content_four={speed}
            color_four="#A3C4F7"

            title_five="Altitude from sea level"
            content_five={Altitude_from_sea_level}
            color_five="#A3C4F7"
            
            />

            <FourDataCard classname="alertscard"
            title_one="Alerts"
            content_one={alerts}
            />
        </div>

        <div className="mapcenter">
            
            <Googlemaps latitude={driver_data?.data?.latitude} longitude={driver_data?.data?.longitude}/>
        </div>

        <div className="chartholder">
            <div className="chart">
            <div className="charttitle">Vitals graph</div>
            
            <ResponsiveContainer height="100%" width="100%" aspect={1.2} className={"responsivecontainer"}>
              <LineChart className="mainchart" data={chart_data}>
                <Legend/>
              <Tooltip contentStyle={{background:"black",borderRadius:8}}
              labelStyle={{color:"white"}}
              itemStyle={{color:"white"}}
              
              />
              <CartesianGrid stroke="white" vertical={false}/>

              <XAxis stroke="white" dataKey={"time"}/>
              <YAxis stroke="white"/>

              <Line
              type="monotone" 
              dataKey="heart_rate"
              stroke="rgba(255, 0, 119, 0.85)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              />

              <Line
              type="monotone"  
              dataKey="spo2"
              stroke="rgba(0, 182, 255, 0.85)"
              strokeWidth={2}
              isAnimationActive={false}
              dot={false}/>

              <Line 
              type="monotone" 
              dataKey="body_temperature"
              stroke="rgba(0, 255, 51, 0.85)"
              strokeWidth={2}             
              dot={false}
              isAnimationActive={false}
              />

              </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
        </>
    )
}


export default DashBoard