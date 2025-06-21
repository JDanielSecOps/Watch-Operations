

import React from "react";
import { Metadata } from "next";
import "@/styles/layout.scss"
import Footer from "@/components/footer/footer";
import LoginNavbar from "@/components/login-page/login page navbar/login-navbar";





export const metadata :Metadata ={

    title:"Watch Operations",
    description:"Designed and Built by Joseph Daniel",
    icons:{
        icon:"/images/orbital.svg"
    }
}


export default function Authlayout({children}:Readonly<{children:React.ReactNode}>){
  

    return(
        <>
        <LoginNavbar/>
                {children}
        <Footer/>
        </>

    )
}




