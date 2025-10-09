'use client';

import { useState } from 'react';
import { CloseMenu } from "./x";
import { AnimatePresence, motion } from "framer-motion";
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
        <span className="block h-[2px] w-[24px] bg-[#111] rounded" />
        <span className="block h-[2px] w-[24px] bg-[#111] rounded" />
        <span className="block h-[2px] w-[24px] bg-[#111] rounded" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay semi-transparent */}
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/30"
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
                pt-[48px] pb-[48px] pl-[10px] pr-[10px] ml-[30px]
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", damping: 22, stiffness: 150 }}
            >
              {/* Buton închidere */}
              <div className="absolute top-[10px] left-[285px] w-[40px]">
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <CloseMenu />
                </button>
              </div>

              {/* Linkuri */}
              {[
                { href: "/", label: "Home" },
                { href: "/about-us", label: "About Us" },
                { href: "/about-app", label: "About App" },
                { href: "/books", label: "Books" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="
                    mb-[10px]
                    inline-flex items-center justify-center
                    text-[#1A1A1A] text-center text-xl font-bold leading-normal
                    w-[300px] h-[56px] shrink-0
                    rounded-[12px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]
                    border-2 border-[#6C63FF]
                    hover:bg-[#F7F7F9] focus-visible:ring-2 focus-visible:ring-[#6C63FF]
                  "
                >
                  {label}
                </Link>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
