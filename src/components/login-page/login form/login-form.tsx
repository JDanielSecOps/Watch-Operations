"use client"

import LoginFormStyle from "@/components/login-page/login form/login-form.module.scss"
import { useForm} from "react-hook-form";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { motion} from "motion/react";
import { useRouter } from "next/navigation";
import {createClient}from "@/utils/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";
import { error } from "console";

const schema =z.object({
    
    email:z.string().email({message:"Invalid Email"}).nonempty({message:"email connot be empty"}),
    password:z.string().nonempty({message:"Password cannot be empty"})
})


type LoginFormtype=z.infer<typeof schema>

const LoginForm =()=>{

    const supabase=createClient()
    const router = useRouter()
    

    const {register,handleSubmit,setError,formState:{errors,isSubmitting}} =useForm<LoginFormtype>(
        {
            resolver:zodResolver(schema)
        }
    )

    const submit=async(data : LoginFormtype)=>{



        const email=data.email
        const password=data.password

        try{

            const {data : userdata ,error}=await supabase.auth.signInWithPassword({email,password})
            if(!error){
                router.push("/About")
                return
            }

            const code=error?.code
            const name=error?.name
            
            let error_string=""

            if(code==="invalid_credentials"){
                toast.error("Invalid Crendentials")
            }
            else if(name==="AuthRetryableFetchError"){
                toast.error("Something went wrong please try again")
            }
            else{
                toast.error("Something went wrong please try again")
            }
            
        
        }

        catch(err){
             toast.error("Something went wrong please try again")       
        }
    }

    useEffect(()=>{
        Object.values(errors).forEach(error=>[
            toast.error(error.message)
        ])
    },[errors])
    

    return(
        <motion.div 
        initial={{scale:0,opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{duration:0.5,ease:"linear"}}
        className={LoginFormStyle.FormCenter}>
        <form onSubmit={handleSubmit(submit)}>
            <div className={LoginFormStyle.title}>Sign In</div>

            <input {...register("email")} type="email"  placeholder="Email" maxLength={254} ></input>
            
 

            <input {...register("password")} type="password"  placeholder="Password" maxLength={18} ></input>


            <button disabled={isSubmitting}>{
                isSubmitting ? <motion.svg 
                animate={{rotate:360,}}
                transition={{repeat:Infinity,duration:1,ease:"linear"}}
                xmlns="http://www.w3.org/2000/svg" 
                className={LoginFormStyle.svg} height="1.2rem" width="1.2rem" viewBox="0 -960 960 960" 
                fill="var(--card_button_svg_color)"><path d="m480-281 59-59h81v-81l59-59-59-59v-81h-81l-59-59-59 59h-81v81l-59 59 59 59v81h81l59 59Zm0 253L346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
                </motion.svg>:
                "Submit"}</button>
        </form>
        </motion.div>
    )

}



export default LoginForm