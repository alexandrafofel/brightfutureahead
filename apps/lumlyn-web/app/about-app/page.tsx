
"use client"

import { Logo } from "@/components/Logo/Logo";
import { app } from "../about-app/messages/en";
import { Footer } from "@/components/Footer/Footer";
import { AboutUsImage } from "../about-us/AboutUsImage";
import { Button } from "@/components/Button/button";
import {LogoCloud} from "@/components/Logo/LogoCloud";

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
          mb-[110px]
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
          {app.title}
        </h1>

        <section
          aria-label="section text"
          className="
            mx-auto 
            w-full max-w-[390px] xl:max-w-[713px]
            min-h-[200px] xl:min-h-[400px]    /* dă înălțime ca să meargă centrara pe verticală */
            flex flex-col justify-center 
            text-sm p-2.5 gap-2.5 leading-[20px]
          "
        >
          <p 
            aria-label="intro"
            className="
            text-left
            mb-4
            "
          >
            {app.description}
          </p>


          <p
            aria-label="how?"
            className="
              flex flex-row gap-2
              font-bold
              text-left
            "
            >
            <LogoCloud/> {app.titleHow}
          </p>

          <p 
            aria-label="solution"
            className="
            text-left
            mb-5
            ">
            {app.how}
            
          </p>
        </section>

        <div 
          aria-label="mission frame"
          className="
            flex flex-col
            justify-center 
            items-center 
            text-left
            ">
          <p
            aria-label="mission"
            className="
              xl:mb-20
              mb-10
              flex 
              w-[318px] h-[110px]
              xl:w-[713px] xl:h-[134px]
              pt-[23px] pr-[19px] pb-[22px] pl-[19px]
              justify-center 
              shrink-0
              rounded-xl
              bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9]
              shadow-[0_4px_24px_0_rgba(0,0,0,0.25)]
              gap-x-[1rem]
              "
          >
               <AboutUsImage/>{app.other}
          </p>
          <p 
          className="mt-8 max-w-[720px] text-center text-[#6CA9F6] text-base font-medium leading-6 px-4">
          {app.promise}
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