"use client"
import alerscardstyles from "@/components/alerts-page/alertscard/alertscard.module.scss"


type alertscardpropstype={
    id?:string | undefined,
    date_and_time:string ,
    alert:number,
    drowsiness:string,
    vitals:string,
    heart_rate:string,
    spo2:string,
    body_temperature:string,
    ambient_temperature:string,
    latitude:string,
    longitude:string,
    speed:string,
    actioncall:(id :string | undefined)=>void
}




const AlertsCard =(props: alertscardpropstype)=>{

    const Alerts : Record <number,[string,string]>={
    0:["No Emergency","green"],
    1:["Emergency","yellow"],
    2:["Critical","red"]
}
    return(
        <div key={props.id} className={alerscardstyles.card}>
            <div>
                <span className={alerscardstyles.title}>Time : </span>
                <span className={alerscardstyles.content}>{new Date(props.date_and_time).toLocaleString()}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Alerts : </span>
                <span className={alerscardstyles.content} style={{color:Alerts[props.alert][1]}}>{Alerts[props.alert][0]}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Drowsiness : </span>
                <span className={alerscardstyles.content}>{props.drowsiness}</span>
            </div>
                <div>
                <span className={alerscardstyles.title}>Vitals : </span>
                <span className={alerscardstyles.content}>{props.vitals ? "Normal" : "Abnormal"}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Heart Rate : </span>
                <span className={alerscardstyles.content}>{props.heart_rate}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Spo2 : </span>
                <span className={alerscardstyles.content}>{props.spo2}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Body Temp : </span>
                <span className={alerscardstyles.content}>{props.body_temperature}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Ambient Temp : </span>
                <span className={alerscardstyles.content}>{props.ambient_temperature}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Latitude : </span>
                <span className={alerscardstyles.content}>{props.latitude}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Longitude : </span>
                <span className={alerscardstyles.content}>{props.longitude}</span>
            </div>
            <div>
                <span className={alerscardstyles.title}>Speed : </span>
                <span className={alerscardstyles.content}>{props.speed}</span>
            </div>
            <button className={alerscardstyles.resolved} onClick={()=>{props.actioncall(props.id)}}>Resolved</button>
        </div>
    )
}


export default AlertsCard