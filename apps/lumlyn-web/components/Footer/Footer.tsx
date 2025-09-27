"use client";
import { TERMS_URL, PRIVACY_URL } from "@/lib/policy";
import Link from "next/link";
import styles from "./FooterTermsPrivacy.module.css";


function TermsPrivacy(){
    return (
        <div className={styles.terms_privacy}>
            <label className={styles.Lumlyn2025}>
            © 2025 Lumlyn ·{" "}
            <Link href={TERMS_URL} className="underline hover:text-blue-600">
            Terms & Conditions
            </Link>{" "}
             · {" "}
            <Link href={PRIVACY_URL} className="underline hover:text-blue-600">
            Privacy Policy
            </Link>
      </label>    
        </div>
    );
}

export function Footer(): JSX.Element {
  return (
    <>
      <TermsPrivacy />
    </>
  );
}