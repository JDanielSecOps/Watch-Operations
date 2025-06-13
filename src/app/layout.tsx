

import React from "react";
import { Metadata } from "next";
import "@/styles/layout.scss"






export const metadata :Metadata ={

    title:"Watch Operations",
    description:"Designed and Built by Joseph Daniel",
    icons:{
        icon:"/images/orbital.svg"
    }
}


export default function Mainlayout({children}:Readonly<{children:React.ReactNode}>){
  

    return(
    <html lang="en">
        <body>      
            {children}
        </body>
    </html>
    )
}




