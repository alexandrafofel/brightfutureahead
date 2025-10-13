"use client"

import { Button } from "@/components/Button/button";
import { Logo } from "@/components/Logo/Logo";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

type LegalHeaderProps = {
  title: string;
};

export function LegalHeader({ title }: LegalHeaderProps) {
  return (
    <section className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.14)]">
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
          <div>
          <header 
                className="
                absolute 
                xl:left-[60%] xl:top-[10%]
                left-[55%] top-[10%]
                "
              >
                  <Logo/>
          </header>
          <nav
                  aria-label="Primary nav Desktop"
                  >
                    <Button
                      variant="back"
                      className="
                        absolute 
                        xl:!mx-0 xl:!self-auto xl:top-4 xl:right-12 xl:left-[25.5%] xl:top-[35%] xl:right-auto
                        top-[14px] left-[20px]
                      "
                    >
                      <span className="sr-only">Back</span>
                    </Button>
               </nav>
          
                <nav 
                  aria-label="Primary nav mobile"
                  className="xl:hidden absolute top-[15px] right-[30px]"
                >
                  <MobileMenu />
                </nav> 
            </div>
            <h1
              className="
                  text-2xl
                  font-bold
                  text-slate-900
                  pt-[15%]
                  pb-[5%]

                  relative right-[20%]   /* mobil */
                  xl:right-0            /* desktop reset */
                  xl:left-2
                  xl:pb-[5%]
                  xl:text-3xl
                  sm:whitespace-nowrap
                  sm:text-lg
              "
              >
              {title}
            </h1>
          </div>
    </section>
  );
}

