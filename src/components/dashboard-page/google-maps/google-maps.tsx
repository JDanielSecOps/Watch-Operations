"use client"

import { useState,useEffect } from "react"
import mapstyles from "@/components/dashboard-page/google-maps/google-maps.module.scss"
import { set } from "zod/v4"

type mapprops={

    latitude?:string,
    longitude?:string,
    classname?:string

}




const Googlemaps=(props : mapprops)=>{

    const [latitude,setlatitude]=useState<string | undefined>(props.latitude ??"19.202510")
    const [longitude,setlongitude]=useState<string | undefined>(props.longitude ?? "20.202510")




    function setlocation(){
        setlatitude(props.latitude)
        setlongitude(props.longitude)
    }

    return(
    <>
    <div className={mapstyles.card}>
       <iframe className={mapstyles.map}src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=18&output=embed`}></iframe>
       <button onClick={setlocation} className={mapstyles.refresh}>Refresh</button>
    </div>
    </>
    )

}


export default Googlemaps