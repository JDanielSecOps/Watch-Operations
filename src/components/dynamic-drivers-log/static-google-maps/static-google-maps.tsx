"use client"

import { useState,useEffect } from "react"
import mapstyles from "@/components/dynamic-drivers-log/static-google-maps/static-google-maps.module.scss"
import { set } from "zod/v4"

type mapprops={

    latitude?:string,
    longitude?:string,
    classname?:string

}




const StaticGooglemaps=(props : mapprops)=>{

    const [latitude,setlatitude]=useState<string | undefined>("45.242424")
    const [longitude,setlongitude]=useState<string | undefined>("79.155922")

    
    useEffect(()=>{
    if(props.latitude && props.longitude){
        setlatitude(props.latitude)
        setlongitude(props.longitude)
    }
    },[props.latitude,props.longitude])

    return(
    <>
    <div className={mapstyles.card}>
       <iframe className={mapstyles.map}src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=18&output=embed`}></iframe>
    </div>
    </>
    )

}


export default StaticGooglemaps