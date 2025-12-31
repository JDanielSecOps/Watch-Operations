"use client";

import React, { useEffect, useState } from "react";
import CardComponentForIndex from "@/components/about-page/card component/card-component";
import "@/styles/page.scss"
import { motion } from "motion/react"
import Loading from "../../(auth)/loading";



const Index =()=>{
    
    const [PageLoaded,setPageLoaded]=useState(false)
    
    useEffect(()=>{
        const timer =setTimeout(()=>setPageLoaded(true),500)
        return ()=>clearTimeout(timer)
    },[])

    if(!PageLoaded){
        return <Loading/>
    }



    return(
        <motion.section
        initial={{scale:0,opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{duration:0.5,ease:"linear"}}
        >
            
            <CardComponentForIndex  title="Dashboard" svg={<svg xmlns="http://www.w3.org/2000/svg" color="red" viewBox="0 -960 960 960"  fill="#FFFFFF"><path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/></svg>}  
            alt="Dashboard icon" 
            href="/Dashboard"
            para="The Dashboard shows information such as vitals,surrounding temperature and 
            gps coordinates along with other information"></CardComponentForIndex>
            <CardComponentForIndex title="Logs" svg={<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="#FFFFFF"><path d="M680-160v-640q33 0 56.5 23.5T760-720v480q0 33-23.5 56.5T680-160ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h360q33 0 56.5 23.5T600-800v640q0 33-23.5 56.5T520-80H160Zm680-160v-480q25 0 42.5 17.5T900-660v360q0 25-17.5 42.5T840-240Zm-680 80h360v-640H160v640Zm0-640v640-640Z"/></svg>}  
            href="/Logs"
            alt="Logs icon" 
            para="The logs allow the user to look into prior information
            such as alerts and the normal logs for reviewing purposes"></CardComponentForIndex>
            <CardComponentForIndex title="Account" svg={<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="#FFFFFF"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>}  
            alt="Accounts icon"
            href="/Accounts"
            para="Authentiation is implemented to allow the user to visit 
            the site and view the data from supabase in a safe manner"></CardComponentForIndex>
            <CardComponentForIndex title="Alerts" svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#e3e3e3"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm0 200q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z"/></svg>}  
            alt="Alerts icon" 
            href="/Alerts"
            para="It is used to view the alerts which are raised by the system 
            in case of emergencies "></CardComponentForIndex>
          </motion.section>
    )
}

export default Index

