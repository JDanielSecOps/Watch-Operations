"use client"

import React, { useEffect, useState } from "react";
import LoginForm from "@/components/login-page/login form/login-form";
import "@/styles/login.scss"
import Loading from "./loading";
import Link from "next/link";
import QueryProvider from "@/components/queryprovider/queryprovider";



const Login =()=>{
     
    const[Pageloaded,SetPageLoaded]=useState(false)

    useEffect(()=>{
        const timer=setTimeout(()=>{SetPageLoaded(true)},1000)
        return ()=>{clearTimeout(timer)}
    },[])

    if(!Pageloaded){
        return <Loading/>
    }
    
     return(
        <>
        <QueryProvider>
        <div className="center">
            <LoginForm></LoginForm>
            <span className="reenter">Already signed in ? <Link href={"/About"}>Click here to continue</Link></span>
        </div>
        </QueryProvider>
        </>

    )
}


export default Login