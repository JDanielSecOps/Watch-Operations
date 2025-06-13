"use client"

import { useEffect, useState } from "react"
import Loading from "./loadings"
import AccountCard from "@/components/accounts-page/accounts-card/account-card"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/styles/account.scss"



const Accounts =()=>{

    
    const [PageLoaded,SetPageLoaded]=useState(false)

    useEffect(()=>{
        const timer =setTimeout(()=>{SetPageLoaded(true)},1000)
        
        return ()=>{clearTimeout(timer)}
    },[])

    if(!PageLoaded){
    return <Loading/>
    }

    return(
        
        <div className="center">
            <AccountCard/>
        </div>    
        
    )
}



export default Accounts