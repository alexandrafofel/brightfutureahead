'use client';

import { useState } from 'react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Buton hamburger */}
      <button
        type="button"
        className="inline-flex flex-col justify-center items-center gap-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
        <div id="mobile-menu" className="absolute top-16 right-4 rounded-xl bg-white p-4 shadow-xl">
          <p className="text-gray-800">Menu is open 🎉</p>
        </div>
      )}
    </>
  );
}
