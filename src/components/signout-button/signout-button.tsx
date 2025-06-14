"use client"

import SignoutButtonstyles from "@/components/signout-button/signout-button.module.scss"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

type SignoutButtontypes={
    className?:string
}

const SignoutButton=({className} : SignoutButtontypes)=>{

    const router =useRouter()

    const exit= async ()=>{

        const supabase =createClient()
        const {error}=await supabase.auth.signOut()
        window.location.href="/"

    }

    return(
        <>
        <button className={`${SignoutButtonstyles.SignoutButton} ${className}`} onClick={exit}>Sign Out</button>
        </>
    )
}

export default SignoutButton