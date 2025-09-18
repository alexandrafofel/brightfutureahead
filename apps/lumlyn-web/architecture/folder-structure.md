lumlyn-web/

│── app/

│   │── api/

│   │   └── leads.ts          # endpoint API pentru lead-uri

│   │── gdpr-consent/         # pagină gdpr

│   │── privacy-policy/       # pagină privacy

│   │── terms/                # pagină terms

│   │── layout.tsx            # layout global

│   │── page.tsx              # pagina principală

│   │── providers.tsx         # providers (ex. pentru react-hook-form, supabase)

│   └── globals.css           # stiluri globale

│

│── components/               # componente reutilizabile

│   ├── EmailCaptureForm.tsx

│   ├── GdprConsentCheckbox.tsx

│   ├── Logo.tsx

│   └── ConsentHero.tsx

│

│── public/                   # assets statice (imagini, favicon, etc.)

│   └── lumlyn-logo-512.png

│

│── styles/                   # (opțional, dacă ai css suplimentar)

│

│── lib/                      # funcții utilitare / helpers

│   └── policy.ts

│   └── supabaseClient.ts

│

│── e2e/                      # teste end-to-end

│── tests/                    # teste unitare

│

│── .env.local                # variabile de mediu

│── next.config.js            # config Next.js

│── tailwind.config.js        # config Tailwind

│── tsconfig.json             # config TypeScript

│── package.json
