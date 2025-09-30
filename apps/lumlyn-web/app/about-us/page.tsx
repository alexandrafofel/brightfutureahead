
"use client"

import {Logo} from "@/components/Logo/Logo";
import { motion } from "framer-motion";
import { about } from "../about-us/messages/en";
import { Footer } from "@/components/Footer/Footer";
import { AboutUsImage } from "./AboutUsImage";
import { Button } from "@/components/Button/button";

export default function AboutUs(): JSX.Element{
  return(
    <section
      className="
        bg-[var(--Background-lavanda,_rgba(249,246,255,0.90))] 
      "
    >
      <header 
        className="
          grid grid-cols-[1fr_auto_1fr] items-center h-16 px-4
          mb-[100px]
          "
        >
          <Button
              variant="back"
              className="
              absolute
              top-[31px] 
              right-[31px]   /* default = mobile */
              lg:left-[31px] /* pe XL mutăm pe stânga */
              lg:right-auto
              justify-self-end lg:justify-self-start lg:col-start-1
              shrink-0 
              focus-visible:ring-2 
              focus-visible:ring-slate-400"
            >
              <span className="sr-only">Back</span>
            </Button>
    
          <div 
            className="
            col-start-2 justify-self-center 
            block
            "
          >
            <Logo />
          </div>

         
            
        
      </header>
    
      <main 
      className="
        flex-col 
        items-center
        text-center
        "
      >

        <h1
          aria-label="title"
          className='
            text-2xl md:text-2xl 
            font-bold 
            text-[#111]
          '
        >
          {about.title}
        </h1>

        <section
          aria-label="section text"
          className="
            mx-auto self-center               /* centrează secțiunea în părinte */
            w-full max-w-[390px] xl:max-w-[605px]
            min-h-[220px] xl:min-h-[400px]    /* dă înălțime ca să meargă centrara pe verticală */
            flex flex-col justify-center items-center
            text-sm p-2.5 gap-2.5 leading-[20px] text-center
          "
        >
          <p 
            aria-label="intro"
            className="
            mb-4
            "
          >
            {about.intro}
          </p>


          <p
            aria-label="problem"
            >
            {about.problem}
          </p>

          <p
            aria-label="descriptive image"
            >
            <AboutUsImage/>
          </p>
          <p 
            aria-label="solution"
            className="
            mb-5
            ">
            {about.solution}
          </p>
        </section>

        <div 
          aria-label="mission frame"
          className="
            flex flex-col
            justify-center 
            items-center 
            ">
          <p
            aria-label="mission"
            className="
              xl:mb-20
              mb-20
              flex 
              w-[318px] h-[110px]
              xl:w-[705px] xl:h-[105px]
              pt-[23px] pr-[19px] pb-[22px] pl-[19px]
              justify-center 
              items-center 
              shrink-0
              rounded-xl
              bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9]
              shadow-[0_4px_24px_0_rgba(0,0,0,0.25)]
              "
          >
            {about.mission}
          </p>
        </div>

      </main>

        <footer className="
          text-center
          
          "
        >
          <Footer/>
        </footer>
    </section>
  )
}