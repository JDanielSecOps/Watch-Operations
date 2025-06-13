import "@/styles/error.scss"
import Link from "next/link"




export default function NotFound(){


    return(
        <>
        <div className="center">
            <div className="error">Error 404</div>
            <div className="explain">Page not found</div>
            <Link href="/About">Click here to return home</Link>
        </div>
        </>

    )
}