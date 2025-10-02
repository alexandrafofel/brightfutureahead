"use client";

import React from "react";
import { Footer } from "@/components/Footer/Footer";
import { Logo } from "@/components/Logo/Logo";
import { inProgress } from "../work-in-progress/messeges/en"
import { Button } from "../Button/button";

export function WorkInProgressPage() {
  return (
    <div
      className="
        relative
        flex flex-col  
        items-center
        xl:w-[1440px] xl:h-[1024px]
        gap-1
      "
    >   
      <header  
        aria-labelledby="Lumlyn Logo"
        className="
          
          "
        >
        <Logo/>
      </header> 
       
      <main 
        aria-labelledby="wip-details"
        className="
            text-center font-[#333]  
            flex flex-col 
            items-center
            gap-8     
          "
        >
          <div 
              className="   
                font-bold xl:text-2xl
                flex flex-col 
                items-center
                gap-5 
                xl:w-[720px]
                mx-auto
              ">
            <p 
              className="   
                
              "
            >
              {inProgress.status}
            </p>  
            <p 
              className="

              "
            >
              {inProgress.promise}
            </p>
          </div>
          <p 
            className="
              xl:text-lg xl:w-[680px]
              mx-auto
              "
            >
            {inProgress.description}
          </p>
          <p
            className="
              gap-3
              xl:w-[200px] xl:h-[64px] rounded-full
              border-[#6C63FF] bg-gradient-to-b from-[#A8EDE1] to-[#52D6C5] 
              text-base text-black text-center
              justify-center items-center py-5 px-3
              "
          >
            {inProgress.release}
          </p>

      </main>

    <footer 
      role="contentinfo" 
      className="
        text-center
        mt-40
        "
      >
        <Footer />
    </footer>

  </div>
  );
}
