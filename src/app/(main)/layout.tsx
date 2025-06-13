

import React from "react";
import "@/styles/layout.scss"
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "@/components/queryprovider/queryprovider";
import FormData from "@/context/formcontext";


export const metadata ={

    title:"Watch Operations",
    description:"Designed and Built by Joseph Daniel",
    icons:{
        icon:"/images/orbital.svg"
    }
}





export default function Rootlayout({children}:Readonly<{children:React.ReactNode}>){
    


    return(  
        <QueryProvider>
            <Navbar/>
                <FormData>
                    {children}
                </FormData>      
            <Footer/>
        </QueryProvider>     
    )
}




