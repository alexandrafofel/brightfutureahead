```plaintext
lumlyn-web/

app/
 ├── api/
      ├── ping/
              └── route.ts      # smoke test pentru backend
      └── leads.ts              # endpoint API pentru lead-uri
 
 ├── gdpr-consent/              
      └── page.tsx              # pagină GDPR
 ├── privacy-policy/            
      └── page.tsx              # pagină Privacy
 ├── terms/                     
       └── page.tsx              # pagină Terms
 ├── layout.tsx                 # layout global
 ├── page.tsx                   # pagina principală
 ├── providers.tsx              # providers (react-hook-form, supabase)


components/                      # componente reutilizabile
 ├── EmailCaptureForm.tsx
 ├── GdprConsentCheckbox.tsx
 ├── Logo.tsx
 ├── WorkinprogressPage.tsx
 └── ConsentHero.tsx

public/                          # assets statice (imagini, favicon, etc.)
 ├── favicon.ico
 └── lumlyn-logo-512.png

styles/                          # (opțional, css suplimentar)
 └── globals.css                # stiluri globale
lib/                             # funcții utilitare / helpers
 ├── policy.ts
 └── supabaseClient.ts

e2e/                             # teste end-to-end
tests/                           # teste unitare

.env.local                       # variabile de mediu
next.config.js                   # config Next.js
tailwind.config.js                # config Tailwind
tsconfig.json                     # config TypeScript
package.json

```
