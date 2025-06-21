import { useForm } from "react-hook-form"
import logsfromstyle from "@/components/logs-page/logsform/logsform.module.scss" 
import {datetimeRegex, z} from "zod"
import { string } from "zod/v4"
import { redirect,useRouter } from "next/navigation";
import {motion} from "motion/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { formcontext } from "@/context/formcontext";
import { type } from "os";
import { time } from "console";

const schema =z.object({

    starting_time:z.string().datetime({local:true,message:"Invalid Date and Time"}).nonempty({message:"Cannot be empty"}),
    ending_time:z.string().datetime({local:true,message:"Invalid Date and Time"}).nonempty({message:"Cannot be empty"}),
    information:z.string().nonempty({message:"Cannot be empty"})
})


type LogsFromType =z.infer<typeof schema>

const LogsForm =()=>{

    const {setformdata}=useContext(formcontext)
    const router=useRouter()


    const {register,handleSubmit,setError,formState:{errors,isSubmitting}} =useForm<LogsFromType>(

        {
            resolver:zodResolver(schema)
        }
    )

    const submit=async(data : LogsFromType)=>{

        if(data.information==="Driver Logs"){
        try{
        const starting_date=new Date(data.starting_time)
        const ending_time=new Date(data.ending_time)

        const time_in_seconds=(ending_time.getTime()-starting_date.getTime())/1000

        if(time_in_seconds>300){
            setError("root",{
                type:"server",
                message:"Cannot Query more than 5 minutes of data"
            })
            return
        }else if(time_in_seconds<=0 ){
            setError("root",{
                type:"server",
                message:"Time cannot be negative or zero"
            })
            return
        }

        setformdata(
            {
            starting_date:data.starting_time,
            ending_date:data.ending_time,
            dataset:data.information,
            }
        )

        router.push("/Logs/LogTable")
        }

        catch(err){
            console.log(err)
            setError("root",{
                type:"server",
                message:"Something went wrong please try later"
            })
        }

        }else if(data.information==="Alerts"){
        
        try{

        const starting_date=new Date(data.starting_time)
        const ending_time=new Date(data.ending_time)

        const time_in_days=(ending_time.getTime()-starting_date.getTime())/(24*3600*1000)



        if(time_in_days>2){

            setError("root",{
                type:"server",
                message:"Cannot Query more than 2 days of data"
            })
            return
        }else if(time_in_days<=0 ){
            setError("root",{
                type:"server",
                message:"Time cannot be negative or zero"
            })
            return
        }

        setformdata(
            {
            starting_date:data.starting_time,
            ending_date:data.ending_time,
            dataset:data.information,
            }
        )

        router.push("/Logs/LogTable")
        }
        catch(err){
            console.log(err)
            setError("root",{
                type:"server",
                message:"Something went wrong please try later"
            })
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
            <input  {...register("starting_time")}type="datetime-local" className={logsfromstyle.starttime} required></input>

            {errors.starting_time ? <motion.div 
            initial={{scale:0,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.3}}
            className={logsfromstyle.error}>{errors.starting_time?.message}</motion.div> :<></>}

            <div className={logsfromstyle.endtitle}>End Time</div>
            <input {...register("ending_time")} type="datetime-local" className={logsfromstyle.endtime} required></input>

            {errors.ending_time ? <motion.div 
            initial={{scale:0,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.3}}
            className={logsfromstyle.error}>{errors.ending_time?.message}</motion.div> :<></>}

            <div className={logsfromstyle.endtitle}>Information</div>
            <select {...register("information")} className={logsfromstyle.select} required>
                <option className={logsfromstyle.options}>Driver Logs</option>
                <option className={logsfromstyle.options}>Alerts</option>
            </select>
            
            {errors.information ? <motion.div 
            initial={{scale:0,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.3}}
            className={logsfromstyle.error}>{errors.information?.message}</motion.div> :<></>}

            {errors.root ? <motion.div 
            initial={{scale:0,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.3}}
            className={logsfromstyle.error}>{errors.root?.message}</motion.div> :<></>}

            <button disabled={isSubmitting} className={logsfromstyle.submitbtn}>{
                isSubmitting ? <motion.svg 
                animate={{rotate:360,}}
                transition={{repeat:Infinity,duration:1,ease:"linear"}}
                xmlns="http://www.w3.org/2000/svg" 
                height="1.2rem" width="1.2rem" viewBox="0 -960 960 960" 
                fill="#FFFFFF"><path d="m480-281 59-59h81v-81l59-59-59-59v-81h-81l-59-59-59 59h-81v81l-59 59 59 59v81h81l59 59Zm0 253L346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-112 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
                </motion.svg>:
                "Submit"}</button>
        </motion.form>
        </>
    )
}


export default LogsForm