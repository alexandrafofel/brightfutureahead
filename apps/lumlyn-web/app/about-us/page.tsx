
"use client"

import { Button } from "@/components/Button/button";
import { Footer } from "@/components/Footer/Footer";
import { Logo } from "@/components/Logo/Logo";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

import { AboutUsImage } from "./AboutUsImage";
import { about } from "../about-us/messages/en";


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
          <div 
            className="
            col-start-2 justify-self-center 
            block
            "
          >
            <Logo />
          </div>
      </header>
    
      <nav aria-label="desktop nav" className="hidden xl:block"
      >
        <Button
          variant="back"
          className="
            absolute top-[31px] right-[31px] lg:left-[31px] lg:right-auto justify-self-end lg:justify-self-start lg:col-start-1
            shrink-0 focus-visible:ring-2 focus-visible:ring-slate-400"
        >
            <span className="sr-only">Back</span>
            </Button>
      </nav>
    
      <nav aria-label="Primary nav mobile" className="xl:hidden absolute top-[15px] right-[30px]">
        <MobileMenu />
      </nav> 

      <main className="flex-col items-center text-center">

        <h1 aria-label="title" className='text-2xl md:text-2xl font-bold text-[#111]'>
          {about.title}
        </h1>

        <section
          aria-label="section desktp text"
          className="
            hidden
            xl:mx-auto xl:self-center               /* centrează secțiunea în părinte */
            xl:w-full xl:max-w-[390px] xl:max-w-[605px]
            xl:min-h-[200px] xl:min-h-[400px]    /* dă înălțime ca să meargă centrara pe verticală */
            xl:flex xl:flex-col xl:justify-center xl:items-center
            xl:text-sm xl:p-2.5 xl:gap-2.5 xl:leading-[20px] xl:text-center
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
              mb-10
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
        </section>

        <section
          aria-label="section mobile text"
          className="
            xl:hidden
            mx-auto self-center             
            w-full max-w-[345px] max-h-[476px]
            flex flex-col justify-center items-center
            text-base p-2.5 gap-1 leading-[28px] text-center left-[28px] !text-left font-normal
          "
        >
          <p aria-label="intro mobile" className="mt-[250px]">
            {about.introMob}
          </p>

          <p aria-label="descriptive image">
            <AboutUsImage/>
          </p>

          <p aria-label="problem mobile" >
            {about.problemMob}
          </p>

          <p aria-label="solution mobile" className="mt-4">
            {about.solutionMob}
          </p>
          
          <div aria-label="mission frame"
            className=" flex flex-col justify-center items-center mt-1 ">
            <p
            aria-label="mission mobile"
            className=" 
              mb-10 flex w-[318px] h-[110px] pt-[23px] pr-[19px] pb-[22px] pl-[19px]
              justify-center items-center shrink-0 rounded-xl
              bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9] shadow-[0_4px_24px_0_rgba(0,0,0,0.25)]"
            >
              {about.missionMob}
            </p>
          </div>
          
        </section>

      </main>

        <footer className="text-center mt-[220px] xl:mt-10 xl:mb-[200px]">
          <Footer/>
        </footer>

    </section>
  )
}