import React from "react";
import footerstyle from "@/components/footer/footer.module.scss"



const Footer =()=>{


    return(
        <div className={footerstyle.footer}>
            <div className={footerstyle.content}>Designed and built by <a href="https://github.com/JDanielSecOps">Joseph Daniel</a></div>
        </div>
    )
}



export default Footer