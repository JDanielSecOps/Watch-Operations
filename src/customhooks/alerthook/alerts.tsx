"use  client"

import { useState,useEffect } from "react"


const state = (data : number) : string=>{

    let result = "Unknown";

    switch(data){

        case 0:
            result = "There are no emergencies as of now"

        case 1 :
            
            result ="Emergency check on the driver could be required"
            break

        case 2 :
            result = "An accident or emergency has happened kindly check on the driver"
            break
    }

    return result
}


const Alertsetter=(data : number) : string=>{



    const [display,setdisplay]=useState<string>("Loading")
    
    useEffect(()=>{
        const value=data
        if(value != null){
            setdisplay(state(data))
        }
    },[data]) 

    return display

}



export default Alertsetter