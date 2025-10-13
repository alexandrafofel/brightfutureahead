import Image from "next/image";
import { Logo } from "../../components/Logo/Logo";
import { Footer } from "../../components/Footer/Footer";
import { Button } from "../../components/Button/button";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import ContactFormClient from "./ContactFormClient";



/**
 * Contact page – routes under `/contact`.
 *
 * This server component renders the page shell for the contact form.  The
 * interactive logic lives inside the `ContactForm` client component.  The
 * layout respects the provided design specifications for both mobile and
 * desktop breakpoints.  See `CONTACT_README.md` for details.
 */
export default function ContactPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center bg-[var(--background)] text-[#111]">
      {/* Header */}
      <header className="relative w-full max-w-[1440px] px-4 lg:px-8 flex flex-col items-center gap-0">
        
        <div className="z-10">
          <Logo />
        </div>
        <h1 className="text-center font-bold text-2xl leading-[0px] lg:text-3xl lg:leading-[48px]">
          Contact&nbsp;Us
        </h1>
        <p className="mt-4 max-w-[720px] text-left text-base font-medium leading-6 px-4">
          We’d love to hear from you. Whether you’re a parent with a question, an educator searching for
          resources, or a therapist looking for support or collaboration, our team is here for you.
        </p>
        <div className="mt-4 flex flex-col gap-2 text-base leading-6 ">
          <div className="flex items-center gap-2">
            <Image src="/images/envelope.svg" alt="Email icon" width={20} height={20} />
            <span>
              Email: <a href="mailto:lumlyn.global@gmail.com" className="font-semibold text-[#3B20FF] underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4ED2E0]">lumlyn.global@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/images/lumlyn-logo-cloud.svg" alt="Form icon" width={15} height={10} />
            <span>Or use the form — we’ll reply within 48h.</span>
          </div>
        </div>
      </header>
      <nav
        aria-label="Primary nav Desktop"
        className="hidden xl:block"      >
          <Button
            variant="back"
            className="hidden xl:block xl:!mx-0 xl:!self-auto xl:top-6 xl:right-6 xl:left-8 xl:top-8 xl:right-auto"
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

      {/* Form card */}
      <main className="w-full flex flex-col items-center px-4">
        <div className="relative w-full max-w-[350px] sm:max-w-[640px] bg-white border-[3px] border-[rgba(151,71,255,0.40)] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.15)] p-4 sm:p-6">
          <ContactFormClient />
        </div>
        <p className="mt-8 max-w-[720px] text-center text-[#6CA9F6] text-base font-medium leading-6 px-4">
          ✨ Our promise: Every message is read with empathy. We respond without judgement, always with the goal of helping families feel calmer and more supported.
        </p>
      </main>
      <footer className="mt-8 mb-6 w-full flex justify-center">
        <Footer />
      </footer>
    </div>
  );
}
