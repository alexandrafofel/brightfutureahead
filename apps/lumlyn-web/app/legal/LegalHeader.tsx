"use client"

import { Button } from "@/components/Button/button";
import { Logo } from "@/components/Logo/Logo";

type LegalHeaderProps = {
  title: string;
};

export function LegalHeader({ title }: LegalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.14)]">
        <div
            className="
            relative
            flex flex-col justify-end items-start
            gap-[3%] 
            pl-[15%] pr-[30%] pt-[20%] pb-[5%]
            w-full
            mx-auto
            xl:w-[1440px] xl:pl-[360px] xl:pt-[100px] xl:pb-[16px] xl:gap-[37px]
            "
        >
          <div className="flex items-center gap-3">
            <Button
              variant="back"
              className="
                  absolute
                  shrink-0 
                  focus-visible:ring-2
                  focus-visible:ring-slate-400  
                  xl:left-[360px]
                  !mx-0 !self-auto  
                  top-[25%] left-[5%]
              "
            />
            <span className="sr-only">Back</span>
            <h1
              className="
                  text-2xl
                  font-bold
                  text-slate-900
                  pt-[15%]
                  pb-[5%]

                  relative right-[27%]   /* mobil */
                  xl:right-0            /* desktop reset */

                  xl:pb-[5%]
                  xl:text-3xl
                  sm:whitespace-nowrap
                  sm:text-lg
              "
              >
              {title}
            </h1>
              <div 
                className="
                absolute left-[60%]
                absolute top-[10%]
                "
              >
                  <Logo/>
              </div>

          </div>
      </div>
    </header>
  );
}

