'use client'
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import logo from "../assets/logo.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RiMenu4Fill } from "react-icons/ri";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
};

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full h-12 bg-[#F2EDD0]/20 backdrop-blur-[2px] py-8 px-4 md:px-26 fixed text-black z-10">
      {/* Desktop Menu */}
      <div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href='/'>
          <Image
            src={logo}
            alt="Logo Image"
            width={50}
            height={50}
            priority={true}
            quality={100}
            placeholder="empty"
            className="flex ml-2 mt-2 md:ml-2 md:mt-2"
          />
          </Link>
        </motion.div>
      </div>
      <motion.ul
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ul className="hidden md:flex p-4 items-center">
          <Link href='/about' className="nav-links hover:cursor-pointer mx-4 font-bold link-underline border border-2 border-transparent focus:border focus:border-2 focus:border-amber-300">
            <li className="">
              about
            </li>
          </Link>
          <Link href='/privacy-policy' className="nav-links hover:cursor-pointer mx-4 font-bold link-underline border border-2 border-transparent focus:border focus:border-2 focus:border-amber-300">
            <li className="">
              privacy policy
            </li>
          </Link>
          <Link href='https://boli.gitbook.io/api/' target="_blank" className="nav-links hover:cursor-pointer mx-4 font-bold link-underline border border-2 border-transparent focus:border focus:border-2 focus:border-amber-300">
            <li className="">
              api docs
            </li>
          </Link>
        </ul>
      </motion.ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setNav(!nav)}
        className="cursor-pointer px-4 z-10 text-black md:hidden"
      >
        {nav ? <HiOutlineX size={30} /> : <RiMenu4Fill size={30} className="fill-[#BF0404]" />}
      </button>

      {/* Mobile Menu */}
      <motion.ul
        initial="closed"
        animate={nav ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-start pt-46 items-center absolute top-0 left-0 w-full h-screen bg-amber-300"
      >
        <Link href='/about' className="nav-links p-4 border border-3 border-transparent cursor-pointer text-2xl link-underline-mob focus:border-black">
          <li className="">
            about
          </li>
        </Link>
        <Link href='/privacy-policy' className="nav-links p-4 border border-3 border-transparent cursor-pointer text-2xl link-underline-mob focus:border-black">
          <li className="">
            privacy policy
          </li>
        </Link>
        <Link href='https://boli.gitbook.io/api/' target="_blank" className="nav-links p-4 border border-3 border-transparent cursor-pointer text-2xl link-underline-mob focus:border-black">
          <li className="">
            api docs
          </li>
        </Link>
      </motion.ul>
    </nav>
  );
};

export default Navbar;