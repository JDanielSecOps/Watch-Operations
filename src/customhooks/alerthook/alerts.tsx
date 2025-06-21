"use  client"

import { useState,useEffect } from "react"




const Alertsetter=(data : number)=>{

    const Alerts : Record <number,string>={
        0:"There are no emergencies as of now",
        1:"Emergency check on the driver could be required",
        2:"An accident or emergency has happened kindly check on the driver"
    }


    const [display,setdisplay]=useState<string>("Loading")
    
    useEffect(()=>{
        const value=data
        if(value != null){
            setdisplay(`${Alerts[data]}`)
        }
    },[data])

    return display

}



export default Alertsetter