'use client'
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";
import { cn } from "@/lib/utils";

export default function Footer () {
    const pathname = usePathname();
     const isHomePage = pathname === '/'; 
    return (
        <>
        {!isHomePage && <footer className="flex flex-col items-center justify-center text-black mb-10 md:mb-4">
                <div
                        className={cn(
                        "absolute inset-0",
                        "[background-size:20px_20px]",
                        "[background-image:radial-gradient(#FCDD81_1px,transparent_1px)]",
                        "-z-20"
                        )}
                />            
                <hr className="h-0.2 w-3/5 md:w-1/3 bg-[#FCDD81] border border-[#FCDD81] mb-4"></hr>
                <div className="flex flex-col items-center justify-center w-5/6 md:w-2/4">
                    <p className="text-[0.6rem] md:text-[0.7rem] pb-2">This project is designed and developed for the Masters Thesis Submission 
                    as part of the requirement for the award of MSc Cyber Security at Royal Holloway, University of London.</p>
                    <Link href="#" className="flex items-center font-bold border border-2 border-transparent justify-center link-underline focus:border focus:border-2 focus:border-amber-300"><p className="text-[0.6rem] md:text-[0.7rem] pr-1">Read the thesis</p><MdArrowOutward size={10}/></Link>
                </div>
            </footer>}
        </>
    )
}