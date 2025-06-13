"use client"


import "@/styles/error.scss"
import Link from "next/link"




export default function Error(){


    return(
        <>
        <div className="center">
            <div className="error">Error 500</div>
            <div className="explain">Something went wrong please try later</div>
            <Link href="/About">Click here to return home</Link>
        </div>
        </>

    )
}