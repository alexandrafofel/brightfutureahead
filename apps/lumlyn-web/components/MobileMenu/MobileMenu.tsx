'use client';

import { useState } from 'react';


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

      {/* Debug: afișăm doar un text ca să confirmăm toggle */}
      {open && (
        <div 
          id="mobile-menu" 
          className="
            absolute top-[6px] right-[4px] z-50
            w-[320px] h-[416px] gap-[10px]
            rounded-xl bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.10)]
            pt-[48px] pb-[48px] pl-[10px] pr-[10px]
            mt-[37px] ml-[30px]
            "
          >
            <a 
              href='./'
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                Home
            </a>
            <a 
              href='./about-us'
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                About Us
            </a>
            <a 
              href='./about-app'
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                About App
            </a>
           <a 
              href='./bright-hearts-press'
              className="
                mb-[10px]
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                Books
            </a>
            <a 
              href='./contact'
              className="
               
                inline-flex items-center justify-center
                text-[#1A1A1A] text-center text-xl font-bold leading-normal
                w-[300px] h-[56px] shrink-0 
                rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] border-2 border-[#6C63FF]
                "
              >
                Contact Us
            </a>
        </div>
      )}
    </>
  );
}
