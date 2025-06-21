"use client"

import React, { useState,createContext} from "react";


type formdatatype={
    starting_date:string,
    ending_date:string,
    dataset:string
}


type formcontexttype={
    data:formdatatype | null
    setformdata:(data : formdatatype)=>void
}

export const formcontext =createContext<formcontexttype>({
    data:null,
    setformdata:()=>{}
})




const FormData=({children} : Readonly<{children : React.ReactNode}>)=>{



    const [data,setformdata]=useState<formdatatype | null >(null)



    return(
        <formcontext.Provider value={{data,setformdata}}>
            {children}
        </formcontext.Provider>
    )
}




export default FormData