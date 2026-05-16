import { useForm } from "react-hook-form"
import logsfromstyle from "@/components/logs-page/logsform/logsform.module.scss" 
import {datetimeRegex, z} from "zod"
import { string } from "zod/v4"
import { redirect,useRouter } from "next/navigation";
import {motion} from "motion/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useEffect } from "react";

import { type } from "os";
import { error, time } from "console";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { start } from "repl";

const schema =z.object({

    starting_time:z.string().datetime({local:true,message:"Invalid Date and Time"}).nonempty({message:"Cannot be empty"}),
    ending_time:z.string().datetime({local:true,message:"Invalid Date and Time"}).nonempty({message:"Cannot be empty"}),
    information:z.string().nonempty({message:"Cannot be empty"})
})


type LogsFromType =z.infer<typeof schema>

const LogsForm =()=>{

    
    const router=useRouter()
    const supabase = createClient()

    const {register,handleSubmit,setError,formState:{errors,isSubmitting},getValues} =useForm<LogsFromType>(

        {
            resolver:zodResolver(schema)
        }
    )

    useEffect(()=>{
        
        Object.values(errors).forEach(error=>{
            toast.error(error.message)
        })
    },[errors])


    
    const date_query =useQuery({

            queryKey:["Date"],
            queryFn:async()=>{


                 const {data,error}=await supabase.from("driver").select("date_and_time")
                .order("date_and_time",{ascending : false}).limit(1)
                 

                if(error){
                    console.log(error)
                    return
                }
                 
                return data

            },
            enabled:false
        })

    const recent =async(data : LogsFromType)=>{


        const result =await date_query.refetch()  


        if(data.information==="Driver Logs"){
        try{

        const ending_time=(result.data) ? new Date(result.data[0].date_and_time) : new Date()
        const starting_date=new Date(ending_time.getTime()-(1*60*1000))
        
        
  

        router.push(`/Logs/LogTable?st=${starting_date.toISOString()}&et=${ending_time.toISOString()}&info=${data.information}`)
        }

        catch(err){
            console.log(err)
            toast.error("Something went wrong please try later")
        }

        }else if(data.information==="Alerts"){
        
        try{

         
        const ending_time=(result.data) ? new Date(result.data[0].date_and_time) : new Date()
        const starting_date=new Date(ending_time.getTime()-(1*60*1000))
        

        router.push(`/Logs/LogTable?st=${starting_date.toISOString()}&et=${ending_time.toISOString()}&info=${data.information}`)
        }
        catch(err){
            console.log(err)
            toast.error("Something went wrong please try later")
        }
        }

    }

    const submit=async(data : LogsFromType)=>{

        const starting_date=new Date(data.starting_time)
        const ending_time=new Date(data.ending_time)
        const time_in_seconds=(ending_time.getTime()-starting_date.getTime())/1000

        if(data.information==="Driver Logs"){
        try{


        if(time_in_seconds>300){
            toast.error("Cannot Query more than 5 minutes of data")
            return
        }else if(time_in_seconds<=0 ){
            toast.error("Time cannot be negative or zero")
            return
        }



        router.push(`/Logs/LogTable?st=${starting_date.toISOString()}&et=${ending_time.toISOString()}&info=${data.information}`)
        }

        catch(err){
            console.log(err)
            toast.error("Something went wrong please try later")
        }

        }else if(data.information==="Alerts"){
        
        try{

        const starting_date=new Date(data.starting_time)
        const ending_time=new Date(data.ending_time)
        const time_in_days=(ending_time.getTime()-starting_date.getTime())/(24*3600*1000)



        if(time_in_days>2){
            toast.error("Cannot Query more than 2 days of data")
            return
        }else if(time_in_days<=0 ){
            toast.error("Time cannot be negative or zero")
            return
        }



        router.push(`/Logs/LogTable?st=${starting_date.toISOString()}&et=${ending_time.toISOString()}&info=${data.information}`)
        }
        catch(err){
            console.log(err)
            toast.error("Something went wrong please try later")
        }
        }
    }



    return(
        <>
        <motion.form onSubmit={handleSubmit(submit)}
        initial={{scale:0,opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{duration:0.5,ease:"linear"}}
        
        className={logsfromstyle.card}>
            <div className={logsfromstyle.starttitle}>Commencement Time</div>
            <input  {...register("starting_time")}type="datetime-local" className={logsfromstyle.starttime} ></input>


            <div className={logsfromstyle.endtitle}>End Time</div>
            <input {...register("ending_time")} type="datetime-local" className={logsfromstyle.endtime} ></input>


            <div className={logsfromstyle.endtitle}>Information</div>
            <select {...register("information")} className={logsfromstyle.select} >
                <option className={logsfromstyle.options}>Driver Logs</option>
                <option className={logsfromstyle.options}>Alerts</option>
            </select>
            
            <div className={logsfromstyle.button_holder}>
            
            <button type="button" disabled={date_query.isLoading} className={logsfromstyle.submitbtn} onClick={()=>{recent(getValues())}}>{
            isSubmitting ? <motion.svg 
            animate={{rotate:360,}}
            transition={{repeat:Infinity,duration:1,ease:"linear"}}
            xmlns="http://www.w3.org/2000/svg" 
            height="1.2rem" width="1.2rem" viewBox="0 -960 960 960" 
            fill="#FFFFFF"><path d="m480-281 59-59h81v-81l59-59-59-59v-81h-81l-59-59-59 59h-81v81l-59 59 59 59v81h81l59 59Zm0 253L346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
            </motion.svg>:
            "Recent"}</button>

            <button type="submit" disabled={isSubmitting} className={logsfromstyle.submitbtn} >{
            isSubmitting ? <motion.svg 
            animate={{rotate:360,}}
            transition={{repeat:Infinity,duration:1,ease:"linear"}}
            xmlns="http://www.w3.org/2000/svg" 
            height="1.2rem" width="1.2rem" viewBox="0 -960 960 960" 
            fill="#FFFFFF"><path d="m480-281 59-59h81v-81l59-59-59-59v-81h-81l-59-59-59 59h-81v81l-59 59 59 59v81h81l59 59Zm0 253L346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
            </motion.svg>:
            "Submit"}</button>



            </div>
        </motion.form>
        </>
    )
}


export default LogsForm