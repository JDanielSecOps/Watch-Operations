"use client"

import { useContext, useEffect,useState } from "react"
import Loading from "./loading"
import { formcontext } from "@/context/formcontext"
import "@/styles/logtable.scss"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"



const LogTable =()=>{


    const Alerts : Record <number,[string,string]>={
        0:["No Emergency","green"],
        1:["Emergency","yellow"],
        2:["Critical","red"]
    }


    const supabase=createClient()
    const router=useRouter()
    const {data} =useContext(formcontext)
    const [PageLoaded,SetPageLoaded]=useState(false)
    const isalerts=data?.dataset==="Alerts" && !!data?.starting_date && !!data?.ending_date
    const isdriverslog=data?.dataset==="Driver Logs" && !!data?.starting_date && !!data?.ending_date

    const normalstartingdate=data?.starting_date.replace("T"," ") + ":00"
    const normalendingdate=data?.ending_date.replace("T"," ") + ":00"

    const {data :driver_data ,isLoading :driver_data_loading } =useQuery({

        queryKey:["Driver Logs"],
        queryFn:async()=>{
        const {data :driver_data_query,error}=await supabase.from("driver")
                .select("id,date_and_time,latitude,longitude,speed,ambient_temperature")
                .gte("date_and_time", normalstartingdate)  
                .lte("date_and_time", normalendingdate); 
            

            if(error || !driver_data_query){
           
            console.log(error)
            return
            }
            return driver_data_query
        },

        enabled:isdriverslog
    })



    const {data :alerts_data ,isLoading :alerts_data_loading} =useQuery({

        queryKey:["Alerts"],
        queryFn:async()=>{
            
            const {data :alerts_data_query,error}=await supabase.from("driver")
            .select("*")
            .gte("date_and_time",normalstartingdate)
            .lte("date_and_time",normalendingdate)
            .in("alerts",[1,2])


        if(error || !alerts_data_query){   
            console.log(error)
            return
        }
            return alerts_data_query
        },

        enabled:isalerts
    })

    useEffect(()=>{
        const timer =setTimeout(()=>{SetPageLoaded(true)},1000)
        
        return ()=>{clearTimeout(timer)}
    },[])

    if(!data?.dataset && !data?.ending_date && !data?.starting_date){
        return(
            <div className="center_error">
                    <div className="error">Data not available</div>
            </div>
        )
    }


    if(!PageLoaded){
    return <Loading/>
    }

    function redirect(){
        router.push("/Logs")
    }

    function moreinforedirect(id : string){
        router.push(`/Logs/LogTable/${id}`)
    }


    if(driver_data_loading || alerts_data_loading){
        return <Loading/>
    }

    if(data?.dataset==="Driver Logs" && (!driver_data || driver_data.length===0)){

        return(
            <div className="center_error">
                    <div className="error">
                        Data not available</div>
            </div>
        )
    }else if(data?.dataset==="Alerts" && (!alerts_data || alerts_data.length===0)){
        
        return(
            <div className="center_error">
                    <div className="error">Data not available</div>
            </div>
        )
    }

    function driver_table_data(){

        return(
            <>
            <div className="tableholder">
                <table>
                    <caption>Drivers Data</caption>
                    <thead>
                    <tr>
                        <th>Date and Time</th>                        
                        <th>Ambient Temperature</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Speed</th>
                        <th>Additional Information</th>
                    </tr>
                    </thead>
                    <tbody>
                    {driver_data?.map((rows)=>{

                        return(    
                    <tr key={rows.id}>
                            <td data-cell ="Time">{new Date(rows.date_and_time).toLocaleString()}</td>
                            <td data-cell ="Temperature">{rows.ambient_temperature}</td>
                            <td data-cell ="Latitude">{rows.latitude}</td>
                            <td data-cell ="Longitude">{rows.longitude}</td>
                            <td data-cell ="Speed">{rows.speed}</td>
                            <td><button className="morebutton" onClick={()=>{moreinforedirect(rows.id)}}>View More</button></td>
                    </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            </>
        )
    }


    function alerts_table_data(){

        return(
            <>
            <div className="tableholder">
                <table>
                    <caption>Alerts</caption>
                    <thead>
                    <tr>
                        <th>Date and Time</th>                        
                        <th>Heart Rate</th>
                        <th>Spo2</th>
                        <th>Body temperature</th>
                        <th>Alerts</th>
                        <th>Additional Information</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alerts_data?.map((rows)=>{

                        return(    
                    <tr key={rows.id}>
                            <td data-cell ="Time">{new Date(rows.date_and_time).toLocaleString()}</td>
                            <td data-cell ="Heart Rate">{rows.heart_rate}</td>
                            <td data-cell ="Spo2">{rows.spo2}</td>
                            <td data-cell ="Body Temperature">{rows.body_temperature}</td>
                            <td data-cell ="Alerts" color={Alerts[rows.alerts][1]}>{Alerts[rows.alerts][0]}</td>
                            <td><button className="morebutton" onClick={()=>{moreinforedirect(rows.id)}}>View More</button></td>
                    </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            </>
        )
    }

    


    if(data?.dataset && data?.starting_date && data?.ending_date){
    
            return(
        <>
        <div className="databar">
            <div>
                <span>Commencement Time : </span>
                <span>{new Date(data?.starting_date).toLocaleString()}</span>
            </div>
            <div>
                <span>End Time : </span>
                <span>{new Date(data?.ending_date).toLocaleString()}</span>
            </div>
            <div>
                <span>Information : </span>
                <span>{data?.dataset}</span>
            </div>
            <button className="goback" onClick={redirect}>Go Back</button>
        </div>
        
        {isdriverslog && driver_table_data()}
        {isalerts && alerts_table_data()}
        <div className="centergoback">
            <button className="goback" onClick={redirect}>Go Back</button>
        </div>

        </>
        
    )
    }
    else{
        return(
            <div className="center_error">
                <div className="error">Data not available</div>
            </div>
        )
    }

}

export default LogTable