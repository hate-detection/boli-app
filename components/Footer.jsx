'use client'
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";

export default function Footer () {
    const pathname = usePathname();
     const isHomePage = pathname === '/';
     const isThesisPage = pathname === '/thesis'; 
    return (
        <>
        {!isHomePage && !isThesisPage && <footer className="flex flex-col items-center justify-center text-black mb-10 md:mb-4">          
                <hr className="h-0.2 w-3/5 md:w-1/3 bg-[#FCDD81] border border-[#FCDD81] mb-4"></hr>
                <div className="flex flex-col items-center justify-center w-5/6 md:w-2/4">
                    <p className="text-[0.6rem] md:text-[0.7rem] pb-2">This project is designed and developed for the Masters Thesis Submission 
                    as part of the requirement for the award of MSc Cyber Security at Royal Holloway, University of London.</p>
                    <Link href="https://doi.org/10.13140/RG.2.2.11381.44004" target="_blank" className="flex items-center font-bold border border-2 border-transparent justify-center link-underline focus:border focus:border-2 focus:border-amber-300"><p className="text-[0.6rem] md:text-[0.7rem] pr-1">Read the thesis</p><MdArrowOutward aria-label="Outward Arrow Icon" size={10}/></Link>
                </div>
            </footer>}
        </>
    )
}