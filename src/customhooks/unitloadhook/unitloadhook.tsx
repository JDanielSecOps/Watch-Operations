

import { useState ,useEffect } from "react"






const UnitLoader=(data : string | undefined | null ,unit : string)=>{

    const [display,setdisplay] =useState<string>(data ?? "Loading")
    
    
        useEffect(()=>{
            const value=data
    
            if(value !=null){
                setdisplay(`${data} ${unit}`)
            }
        },[data])

        return display
}

export default UnitLoader