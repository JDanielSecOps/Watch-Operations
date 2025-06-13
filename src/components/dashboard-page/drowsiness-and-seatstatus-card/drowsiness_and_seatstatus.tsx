
import DrowsinessandseatstatusStyles from "@/components/dashboard-page/drowsiness-and-seatstatus-card/drowsiness_and_seat_status.module.scss"


type DrowsinessAndSeatStatusprops={

    drowsiness?:string,
    seat_status?:string
    className?:string
}



const DrowsinessAndSeatStatus=(props : DrowsinessAndSeatStatusprops)=>{

    return(
        <div className={`${DrowsinessandseatstatusStyles.main} ${props.className??''}`}>
        <div>
            <span>
                <div className={DrowsinessandseatstatusStyles.sleeptitle}>Drowsiness</div>
                <div className={DrowsinessandseatstatusStyles.sleep}>{props.drowsiness}</div>
            </span>
        </div>
        <div>
            <span>
                <div className={DrowsinessandseatstatusStyles.statustitle}>Seat Status</div>
                <div className={DrowsinessandseatstatusStyles.status}>{props.seat_status}</div>
            </span>
        </div>
        </div>
    )
}


export default DrowsinessAndSeatStatus