"use client"

import { useContext, useEffect,useState } from "react"
import Loading from "./loading"
import { formcontext } from "@/context/formcontext"
import "@/styles/logtable.scss"
import { useRouter, useSearchParams } from "next/navigation"
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
    const searchparams =useSearchParams()

    const starting_date =searchparams.get("st")
    const ending_date =searchparams.get("et")
    const info =searchparams.get("info")

    const [PageLoaded,SetPageLoaded]=useState(false)
    const isalerts=info==="Alerts" && !!starting_date && !!ending_date
    const isdriverslog=info==="Driver Logs" && !!starting_date && !!ending_date

    const normalstartingdate=new Date(starting_date!!).toLocaleString()
    const normalendingdate=new Date(ending_date!!).toLocaleString()

    // new Date(starting_date!!).toISOString()
    // new Date(ending_date!!).toISOString()

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

    if(info && !ending_date && !starting_date){
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

    if(info==="Driver Logs" && (!driver_data || driver_data.length===0)){

        return(
            <div className="center_error">
                    <div className="error">
                        Data not available</div>
            </div>
        )
    }else if(info==="Alerts" && (!alerts_data || alerts_data.length===0)){
        
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
                            <td><button className="morebutton" onClick={()=>{moreinforedirect(rows.id)}}>View</button></td>
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

    


    if(info && starting_date && ending_date){
    
            return(
        <>
        <div className="databar">
            <div>
                <span>Commencement Time : </span>
                <span>{new Date(starting_date).toLocaleString("en-IN")}</span>
            </div>
            <div>
                <span>End Time : </span>
                <span>{new Date(ending_date).toLocaleString("en-IN")}</span>
            </div>
            <div>
                <span>Information : </span>
                <span>{info}</span>
            </div>
            <button className="gobacktop" onClick={redirect}>Go Back</button>
        </div>
        
        {isdriverslog && driver_table_data()}
        {isalerts && alerts_table_data()}
        <div className="centergoback">
            <button className="gobackbottom" onClick={redirect}>Go Back</button>
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