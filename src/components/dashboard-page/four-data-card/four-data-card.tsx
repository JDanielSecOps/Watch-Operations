
import fourdatacardstyle from "@/components/dashboard-page/four-data-card/four-data-card.module.scss"
import { color } from "motion"



type FourDataCardProps={

    classname?:string

    title_one?:string,
    content_one?:string,
    color_one?:string,

    title_two?:string,
    content_two?:string,
    color_two?:string,

    title_three?:string,
    content_three?:string,
    color_three?:string,

    title_four?:string,
    content_four?:string,
    color_four?:string,

    
    title_five?:string,
    content_five?:string,
    color_five?:string,

}



const FourDataCard=(props : FourDataCardProps)=>{

    return(
        <div className={`${fourdatacardstyle.main} ${props.classname ?? ""}`}>

                <div className={fourdatacardstyle.maintitle}>{props.title_one}</div>
                <div style={{color:props.color_one}}>{props.content_one}</div>

                <div className={fourdatacardstyle.title}>{props.title_two}</div>
                <div style={{color:props.color_two}}>{props.content_two}</div>

                <div className={fourdatacardstyle.title}>{props.title_three}</div>
                <div style={{color:props.color_three}}>{props.content_three}</div>

                <div className={fourdatacardstyle.title}>{props.title_four}</div>
                <div style={{color:props.color_four}}>{props.content_four}</div>
                
                <div className={fourdatacardstyle.title}>{props.title_five}</div>
                <div style={{color:props.color_five}}>{props.content_five}</div>
        </div>
    )
}


export default FourDataCard