"use client";

import React from "react";
import { Footer } from "@/components/Footer/Footer";
import { LegalHeader } from "@/app/legal/LegalHeader";

export function WorkInProgressPage() {
  return (
    <div className="
    min-h-dvh bg-white  
    ">    
      <LegalHeader 
        title="Working on it..." 
      />
      
    <main aria-labelledby="wip-title">
        
      <div>
        <section>
          <div
            className="
            text-center
            mt-[10%]
            xl:mt-[3%]
            "  
          >
            <h1 id="wip-title">
              This space is still in progress.
              <br />
              Soon, it will bring you something warm and useful — designed with
              care, calm, and science.
            </h1>
          </div>
          <div
            className="
            text-center
            mt-[5%]
            mr-[5%]
            ml-[5%]
            xl:mt-[3%]
            "  
          >
            <p>
              Calm in the making — <strong>quiz, chatbot, and personalised
              guidance to support your child</strong>, and to help <strong>parents,
              educators, and therapists</strong> with science and care. We’re also
              creating <strong>storybooks for children</strong> — gentle, realistic
              tales about rare but important moments like adoption or life with a
              twin. <strong>Coming Oct 31, 2025.</strong>
            </p>
          </div>
          <div 
          role="status" 
          aria-live="polite"
          className="
            text-center
            mt-[35%]
            xl:mt-[20%]
            " 
          >
            Coming Oct 31, 2025
          </div>
        </section>
        <footer 
        role="contentinfo" 
        className="
          px-4 py-6 
          text-center
          "
        >
          <Footer />
        </footer>
      </div>
    </main>
    </div>
  );
}
