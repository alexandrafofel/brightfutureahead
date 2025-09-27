import Image from "next/image";
        
export const Logo = {
    whiteLetters: 
        <Image
            src="/images/lumlyn-logo-letters.svg"
            alt="Lumlyn Logo Letters"
            width={100}
            height={200}
            priority
        />,
    solmonLetters: 
        <Image
            src="/images/logo-text-pressed-dark-solmon.svg"
            alt="Lumlyn Logo Letters Solmon"
            width={100}
            height={200}
            priority
        />,
    cloud: 
        <Image
            src="/images/lumlyn-logo-cloud.svg"
            alt="Lumlyn Logo Cloud"
            width={192}
            height={160}
            priority
        />
};