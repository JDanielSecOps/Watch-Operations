

import React from "react";
import CardComponenetSytle from "@/components/about-page/card component/card-component.module.scss"
import Link from "next/link";

type cardprops={
    title:string,
    alt:string,
    href:string,
    svg?:React.ReactNode,
    para:string
    color?:string
}

const CardComponentForIndex =(props:cardprops)=>{



    return(
        <div className={CardComponenetSytle.card}>
            <div className={CardComponenetSytle.holder}>

            
                <Link href={props.href}>{props.svg}</Link>
            <Link href={props.href}>{props.title}</Link>
        
            </div>
            <div className={CardComponenetSytle.para}>{props.para}</div>
        </div>
    )
}

export default CardComponentForIndex
