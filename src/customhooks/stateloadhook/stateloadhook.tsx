"use client"

import { useState,useEffect } from "react";




const StateLoader =(data : boolean | undefined | null ,truecondition : string ,falsecondition : string)=>{

    const [display,setdisplay]=useState<string>("Loading")

    useEffect(()=>{

        const value=data
        if(value != null){
            setdisplay(`${data ? truecondition : falsecondition}`)
        }
    },[data])

    return display

}

export default StateLoader