'use client';

import React,{useEffect, useState,useRef, JSXElementConstructor, JSX}from "react";
import Link from "next/link";
import navbarstyles from "@/components/navbar/navbar.module.scss"
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import SignoutButton from "../signout-button/signout-button";
import { svg } from "motion/react-client";
import { color } from "chart.js/helpers";
import { hover } from "motion";

const Navbar =()=>{

    const supabase =createClient()

    const[display,Setdisplay]=useState<boolean>(false)
    const pathname :string   = usePathname()
    const nav = useRef<HTMLDivElement | null>(null)

    const path =[
        {href:"/About",label:"About",svg:(
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#96ffeeff"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        )},
        {href:"/Dashboard",label:"Dashboard",svg:(
            <svg xmlns="http://www.w3.org/2000/svg" color="red" viewBox="0 -960 960 960"  fill="#96ffeeff"><path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/></svg>
        )},
        {href:"/Logs",label:"Logs",svg:(
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="#96ffeeff"><path d="M680-160v-640q33 0 56.5 23.5T760-720v480q0 33-23.5 56.5T680-160ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h360q33 0 56.5 23.5T600-800v640q0 33-23.5 56.5T520-80H160Zm680-160v-480q25 0 42.5 17.5T900-660v360q0 25-17.5 42.5T840-240Zm-680 80h360v-640H160v640Zm0-640v640-640Z"/></svg>
        )},
        {href:"/Accounts",label:"Account",svg:(
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  fill="#96ffeeff"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
        )},
        {href:"/Alerts",label:"Alerts",svg:(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#96ffeeff"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm0 200q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Z"/></svg>
        )},
        
    ]

    function render(path : {href:string,label:string,svg?:JSX.Element}[]){
        return path.map((paths,index)=>{
            const isactive : boolean =pathname===paths.href
            return(


                <Link 
                href={paths.href} 
                key={index} 
                className={`${navbarstyles.default} ${isactive ? navbarstyles.active:""}`}>

                    {paths.svg  && <span className={`${navbarstyles.icondefault} ${isactive ? navbarstyles.iconactive : ""}`}
                    >{paths.svg}</span>}

                    {paths.label && <span className={`${navbarstyles.labeldefault} ${isactive ? navbarstyles.labelactive : ""}`}
                    >{paths.label}</span>} 
                </Link>
            )
            
        })
    }
    
    function mobilenavactivate(){
        Setdisplay(true)
    }

    function mobilenavdeactivate(){
        Setdisplay(false)
    }

    useEffect(()=>{
        const handler=(e:Event)=>{
            if(!nav.current?.contains(e.target as Node)){
                Setdisplay(false)
            }
        }

        document.addEventListener("mousedown",handler)

        return ()=>{
            document.removeEventListener("mousedown",handler)
        }
    },[])




    return(
        <div className={navbarstyles.navbar}>
            <div className={navbarstyles["image-and-title"]}>
               <svg xmlns="http://www.w3.org/2000/svg" className={navbarstyles.symbol} viewBox="0 0 512 512" ><path  d="M256.25 20.656c-32.78 0-64.03 6.79-92.438 19c-8.182-10.618-20.994-17.468-35.437-17.468c-24.716 0-44.78 20.033-44.78 44.75c0 8.356 2.324 16.18 6.31 22.874c-42.638 42.655-69.093 101.49-69.093 166.282c0 129.617 105.823 234.72 235.438 234.72c129.615-.002 234.72-105.103 234.72-234.72c0-129.618-105.105-235.438-234.72-235.438zm0 19.313c119.515 0 216.094 96.607 216.094 216.124s-96.58 216.094-216.094 216.094c-119.515 0-216.813-96.577-216.813-216.094c0-59.568 24.176-113.438 63.22-152.5c7.273 5.113 16.15 8.094 25.718 8.094c24.716 0 44.75-20.034 44.75-44.75c0-3.453-.385-6.804-1.125-10.032C197.91 46 226.396 39.97 256.25 39.97zm-.125 51.81c-91.3 0-165.875 74.575-165.875 165.876c0 91.3 74.576 165.406 165.875 165.406c35.12 0 67.708-10.965 94.5-29.656c7.13 4.23 15.45 6.656 24.344 6.656c26.396 0 47.81-21.384 47.81-47.78c0-12.763-5.005-24.366-13.155-32.938c7.677-19.067 11.906-39.884 11.906-61.688c0-91.3-74.106-165.875-165.405-165.875zm0 19.126c81.2 0 146.78 65.55 146.78 146.75c0 17.833-3.172 34.924-8.967 50.72a47.715 47.715 0 0 0-18.97-3.907c-26.396 0-47.78 21.414-47.78 47.81a47.562 47.562 0 0 0 9.28 28.283c-23.065 15.084-50.66 23.843-80.343 23.843c-81.2 0-147.22-65.55-147.22-146.75s66.02-146.75 147.22-146.75zm-1.063 19.625c-7.462 31.99-21.767 62.112-42.906 83.25c-21.14 21.14-48.73 32.913-80.72 40.376c31.99 7.462 62.112 21.736 83.25 42.875c21.14 21.14 32.914 48.764 40.376 80.75c7.463-31.986 19.204-59.61 40.344-80.75c21.14-21.138 51.262-35.412 83.25-42.874c-32.236-7.428-59.455-19.11-80.72-40.375c-21.262-21.263-35.446-51.013-42.873-83.25zm.094 86.564c20.498 0 37.125 16.627 37.125 37.125c0 20.496-16.626 37.124-37.124 37.124c-20.497 0-37.125-16.628-37.125-37.125c0-20.5 16.63-37.126 37.126-37.126z"/></svg>
                <span className={navbarstyles.title}>Watch Operations</span>
                  <button className={navbarstyles.NavbarButton} onClick={mobilenavactivate}>
            <svg className={navbarstyles.NavSvg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button> 
            </div>    
            <div ref={nav} className={`${navbarstyles.nav} ${display ? navbarstyles.on : navbarstyles.off}`}>
            <button className={navbarstyles.Close} onClick={mobilenavdeactivate}>
            <svg className={navbarstyles.CloseSvg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                {render(path)}
                <SignoutButton className={navbarstyles.signout}/>
            </div>
        </div>
    )
}


export default Navbar