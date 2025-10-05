
"use client"

import { Logo } from "@/components/Logo/Logo";
import { app } from "../about-app/messages/en";
import { Footer } from "@/components/Footer/Footer";
import { AboutUsImage } from "../about-us/AboutUsImage";
import { Button } from "@/components/Button/button";
import {LogoCloud} from "@/components/Logo/LogoCloud";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

export default function AboutApp(): JSX.Element{
  return(
    <section className=" bg-[var(--Background-lavanda,_rgba(249,246,255,0.90))] flex flex-col items-center justify-center">
      
      <header 
        className="
          grid grid-cols-[1fr_auto_1fr] items-center h-16 px-4
          mb-[110px]
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

      <nav aria-label="Primary nav Desktop" className="hidden xl:block" >
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
      </nav>

      <nav aria-label="Primary nav mobile" className="xl:hidden absolute top-[15px] right-[30px]">
        <MobileMenu />
      </nav> 

      <main aria-label="principal frame"
      className=" flex flex-col items-center justify-center xl:max-w-[550px] max-w-[]">

        <h1 aria-label="title"
          className='
            text-2xl md:text-2xl 
            font-bold 
            text-[#111]
          '
        >
          {app.title}
        </h1>

        <section aria-label="section text desktop"
          className="
            hidden
            xl:mx-auto 
            xl:w-full xl:min-h-[200px] xl:flex xl:flex-col xl:justify-center 
            xl:text-sm xl:p-2.5 xl:gap-2.5 xl:leading-[20px]
          "
        >
          <p aria-label="intro" className=" text-left mt-[10px] "> {app.description} </p>

          <p aria-label="how?" className=" flex flex-row gap-2 font-bold text-left text-base mt-[15px] ">
            <LogoCloud/> {app.titleHow}
          </p>

          <div aria-label="solution Desktop" className="hidden xl:flex xl:flex-col xl:mb-[10px] xl:mt-[10px]">
            {app.how.map((how, index) => (
              <div key={index} className="flex items-start gap-1">
                <div className="w-[3.5px] h-[3.5px] mt-2 bg-[#6C63FF] shrink-0 rounded-full">
                </div>
                <p className="text-left">{how}</p>
              </div>
            ))}
          </div>

          
           <div aria-label="mission desktop frame"
              className="
                flex flex-col
                justify-center 
                items-center 
                text-left
                xl:max-w-[550px]
                ">
              <p aria-label="mission"
                className="
                  xl:flex xl:w-[550px] xl:h-[100px] xl:pt-[10px] xl:pr-[19px] xl:pb-[22px] xl:pl-[19px]
                  xl:justify-center xl:shrink-0 xl:rounded-xl
                  xl:bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9]
                  xl:shadow-[0_4px_24px_0_rgba(0,0,0,0.25)]
                  xl:gap-x-[1rem]
                  "
              >
                <AboutUsImage/>{app.other}
              </p>
            </div>

          <p 
            className="xl:mt-8 xl:max-w-[720px] xl:text-center xl:text-[#6CA9F6] xl:text-base xl:font-medium xl:leading-6 xl:px-4">
            {app.promise}
          </p>
     
        </section>
      
        <section aria-label="section mobile text"
          className=" 
            xl:hidden mx-auto w-full max-w-[390px] xl:max-w-[713px]
            flex flex-col justify-center text-lg p-2.5 gap-2.5 leading-[28px]
          "
        >

          <p aria-label="description mobile" className=" xl:hidden text-left mt-[10px] " >
            {app.descriptionMob}
          </p>


          
          
          <article aria-label="solution mobile" className="flex flex-col">
            <h1 aria-label="how title mobile?" className=" flex flex-row gap-1 font-semibold text-left mt-[25px] mb-[15px] " >
            <LogoCloud/> {app.titleHow}
            </h1>
            {app.howMob.map((howMob, index) => (
              <div key={index} className="flex items-start gap-1">
                <div className="w-[3.5px] h-[3.5px] mt-2 bg-[#6C63FF] shrink-0 rounded-full">
                </div>
                <p className="text-left">{howMob}</p>
              </div>
            ))}
          </article>

          <p aria-label="promise mobile"
            className="xl:hidden mt-8 max-w-[720px] text-center text-[#6CA9F6] text-base font-medium leading-6 px-4 mb-[35px]">
            {app.promiseMob}
          </p>

        <div aria-label="mission mobile"
          className="flex flex-col justify-center items-center text-left">
          <p aria-label="mission text mobile"
            className="
              flex pt-[5px] pr-[2px] pb-[3px] pl-[4px] gap-x-[0.5rem] mb-[75px] w-[364px] h-[91px]
              justify-center shrink-0 rounded-xl max-w-[394px] max-h-[90px] text-base
              bg-gradient-to-r from-[#9E8CF6] to-[#C9BDF9] shadow-[0_4px_24px_0_rgba(0,0,0,0.25)]
              "
          >
               <AboutUsImage/>{app.otherMob}
          </p>
        </div>

      </section>
    </main>

      <footer className="text-center">
        <Footer/>
      </footer>

    </section>
  )
}