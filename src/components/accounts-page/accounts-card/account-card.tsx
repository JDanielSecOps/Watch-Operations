"use client"

import SignoutButton from "@/components/signout-button/signout-button"
import { createClient } from "@/utils/supabase/client"
import { useQuery } from "@tanstack/react-query"
import AccountCardStyles from "@/components/accounts-page/accounts-card/account-card.module.scss"
import MiniLoader from "@/components/mini-loader/mini-loader"
import { motion } from "motion/react"
import { animate } from "motion"




const AccountCard =()=>{

    const supabase =createClient()

    const {data,error,isLoading,isError}=useQuery({
        queryKey:["user_details"],
        queryFn:async()=>{
            const {data : {session} , error} =await supabase.auth.getSession()
            return {session,error}
        }
    })
    

    return(
        <motion.div 
        initial={{scale:0,opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{duration:1}}
        
        className={AccountCardStyles.box}>
            <span className={AccountCardStyles.emailtitle}>Email :</span>

            {isLoading ? <MiniLoader className={AccountCardStyles.loading} />

            :<motion.span 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:1}}
            className={AccountCardStyles.email}>{data?.session?.user.email}</motion.span>}

            {isError ? <span className={AccountCardStyles.error}>Something went wrong</span> :<></>}
            <SignoutButton className={AccountCardStyles.signoutbutton}/>
        </motion.div>
    )
}




export default AccountCard