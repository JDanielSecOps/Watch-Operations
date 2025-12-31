"use client"

import LogsForm from "@/components/logs-page/logsform/logsform";
import { useState,useEffect} from "react";
import Loading from "./LogTable/loading";
import "@/styles/logs.scss"


const Logs=()=>{
    



        
    const [PageLoaded,SetPageLoaded]=useState(false)

    useEffect(()=>{
        const timer =setTimeout(()=>{SetPageLoaded(true)},500)
        
        return ()=>{clearTimeout(timer)}
    },[])

    if(!PageLoaded){
    return <Loading/>
    }

    return(
        
        <div className="center">
            <LogsForm/>
        </div>
        
    )
}

export default Logs