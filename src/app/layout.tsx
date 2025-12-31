

import React from "react";
import { Metadata } from "next";
import "@/styles/global.css"
import { Toaster } from "sonner";
import QueryProvider from "@/components/queryprovider/queryprovider";
import { ThemeProvider } from "@/components/Theme-Provider/theme-provider";







export const metadata :Metadata ={

    title:"Watch Operations",
    description:"A real time driver monitering system",
    icons:{
        icon:"/images/orbital.svg"
    }
}


export default function Rootlayout({children}:Readonly<{children:React.ReactNode}>){
  

    return(
    <html lang="en" suppressHydrationWarning>
           
        <body>
            
           <ThemeProvider
           attribute={"class"}
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange>
            <QueryProvider>
                <Toaster position="top-right"/>
                {children}
            </QueryProvider>
           </ThemeProvider>
        </body>
    </html>
    )
}




