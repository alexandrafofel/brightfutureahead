```plaintext
lumlyn-web/

app/
 ├── api/
      └── leads.ts              # endpoint API pentru lead-uri
 
 ├── gdpr-consent/              # pagină GDPR
 ├── privacy-policy/            # pagină Privacy
 ├── terms/                     # pagină Terms
 
 ├── layout.tsx                 # layout global
 ├── page.tsx                   # pagina principală
 ├── providers.tsx              # providers (react-hook-form, supabase)
 └── globals.css                # stiluri globale

components/                      # componente reutilizabile
 ├── EmailCaptureForm.tsx
 ├── GdprConsentCheckbox.tsx
 ├── Logo.tsx
 └── ConsentHero.tsx

public/                          # assets statice (imagini, favicon, etc.)
 └── lumlyn-logo-512.png

styles/                          # (opțional, css suplimentar)

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
