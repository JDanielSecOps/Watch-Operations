"use client"

import React, { useEffect } from "react";
import { Metadata } from "next";
import Footer from "@/components/footer/footer";
import LoginNavbar from "@/components/login-page/login page navbar/login-navbar";
import { toast, Toaster } from "sonner";






export default function Authlayout({children}:Readonly<{children:React.ReactNode}>){
    

    
    return(
        <>
        <LoginNavbar/>
                {children}
        <Footer/>
        </>

    )
}




