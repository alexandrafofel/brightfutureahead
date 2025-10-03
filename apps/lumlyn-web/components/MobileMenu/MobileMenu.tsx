'use client';

import { useState } from 'react';
import {CloseMenu} from "./x"
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from 'next/link';



export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Buton hamburger */}
      <button
        type="button"
        className="inline-flex flex-col justify-center items-center gap-1 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span className="block h-[2px] w-[24px] bg-[#111] rounded " />
        <span className="block h-[2px] w-[24px] bg-[#111] rounded " />
        <span className="block h-[2px] w-[24px] bg-[#111] rounded " />
      </button>

      <AnimatePresence>
      {open && (
        <>
    {/* Overlay semi-transparent */}
      <motion.div
        key="overlay"
        className="fixed inset-0 z-40 bg-black/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.3, ease: "linear" }}
        onClick={() => setOpen(false)}
      />

    {/* Mobile menu */}
    <motion.aside 
        id="mobile-menu" 
            className="
              fixed right-5 top-15 z-50
              w-[320px] h-[416px] gap-[10px]
              rounded-xl bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.10)]
              pt-[48px] pb-[48px] pl-[10px] pr-[10px]
              ml-[30px]
              "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ type: "spring", damping: 22, stiffness: 150 }}
            >
              <div
                className='
                  absolute
                  gap-[10px] top-[10px] left-[285px]
                  w-[40px] 
                '
              >
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <CloseMenu />
                </button>
              </div>
            <a 
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
            </a>
            <a
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                <Link href="/about-us" onClick={() => setOpen(false)}>
                  About Us
                </Link>
            </a>
            <a 
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
              <Link href="/about-app" onClick={() => setOpen(false)}>
                About App
              </Link>
            </a>
           <a 
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
              <Link href="/bright-hearts-press" onClick={() => setOpen(false)}>
                Books
              </Link>
            </a>
            <a 
              className="
               
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </a>
    </motion.aside> 
        </>   
      )
      }
      </AnimatePresence>
    </>
  );
}
