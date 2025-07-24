"use client"

import "@/styles/alerts.scss"
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import AlertsCard from "@/components/alerts-page/alertscard/alertscard";




const Alerts =()=>{

    const supabase =createClient()
    const [Pageloaded,setPageLoaded]=useState(false)



    async function alertresolved(id :string){

        const dataid=Number(id)
        const {error}=await supabase.from("driver")
        .update({alerts : 0})
        .eq("id",dataid)

        if(error){
            console.log(error)
            return
        }

        refetch()
    }

    const {data :queried_alerts,refetch}=useQuery({
        queryKey:["Immedite_alerts"],
        queryFn: async ()=>{
            const{error,data}=await supabase.from("driver")
            .select("*")
            .order("date_and_time",{ascending:false})
            .in("alerts",[1,2])
            .limit(8)



            if(error){
                throw new Error(error.message)
                return
            }

            return data
        }
    })

    
    useEffect(()=>{
        const timer =setTimeout(()=>{setPageLoaded(true)},1000)
        return ()=>{clearTimeout(timer)}
    },[])

    if(!Pageloaded){
        return <Loading/>
    }






    return(
        <div>
           <div className="centertitle">
            <div>Most Recent Alerts</div>
           </div>
           <div className="sortcard">
            {queried_alerts?.map((rows)=>{

                return(
                    <AlertsCard
                        
                key={rows?.id}
                date_and_time={rows?.date_and_time}
                alert={rows?.alerts}
                drowsiness={rows?.drowsiness}
                vitals={rows?.vitals}
                heart_rate={rows?.heart_rate}
                spo2={rows?.spo2}
                body_temperature={rows?.body_temperature}
                ambient_temperature={rows?.ambient_temperature}
                latitude={rows?.latitude}
                longitude={rows?.longitude}
                speed={rows?.speed}
                actioncall={()=>{alertresolved(rows?.id)}}
                    />

                )
            })}
           </div> 
        </div>
    )
}


export default Alerts