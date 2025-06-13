

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
            <span className={CardComponenetSytle.spansvg} color={props.color}><Link href={props.href}>{props.svg}</Link></span>
            <Link href={props.href}>{props.title}</Link>
            <div>{props.para}</div>
        </div>
    )
}

export default CardComponentForIndex
