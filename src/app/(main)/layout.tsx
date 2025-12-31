

import React from "react";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import FormData from "@/context/formcontext";





export default function Mainlayout({children}:Readonly<{children:React.ReactNode}>){
    


    return(  
        <>
            <Navbar/>
                <FormData>
                    {children}
                </FormData>      
            <Footer/>  
        </>
    )
}




