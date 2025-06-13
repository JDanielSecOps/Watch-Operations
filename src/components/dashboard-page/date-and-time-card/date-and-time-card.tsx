
import dateandtimestyles from "@/components/dashboard-page/date-and-time-card/date-and-time-card.module.scss"


type DateAndTimeCardProps={
    date_and_time? :string
    className?:string
}



const DateAndTimeCard=(props: DateAndTimeCardProps)=>{

    return(
        <div className={`${dateandtimestyles.card} ${props.className ?? ''}`}>
            <div className={dateandtimestyles.dateandtimetitle}>Date and Time</div>
            <div className={dateandtimestyles.dateandtime}>{props.date_and_time}</div>
        </div>
    )
}


export default DateAndTimeCard