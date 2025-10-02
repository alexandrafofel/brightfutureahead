# Contact page documentation

This document provides an overview of the contact form implementation in the
Lumlyn web application.  It covers the folder structure, design decisions,
developer workflow, testing commands and a QA checklist for validating the
feature across devices.

## Folder structure

The contact page lives entirely within the `app/contact` route and the
`components/contact` directory.  Files are grouped by responsibility:

apps/lumlyn-web
├── app/contact/
│ ├── page.tsx # server component that renders the page shell
│ ├── actions.ts # server action handling POST /lead
│ ├── rate-limit.ts # simple in‑memory rate limiter
│ ├── CONTACT_README.md # this documentation
│ └── tests/ # Jest unit & integration tests
│ ├── ContactForm.unit.test.tsx
│ └── ContactForm.integration.test.tsx
├── components/contact/
│ ├── ContactForm.tsx # client component with form logic and state
│ ├── TextField.tsx # generic text input with error handling
│ ├── Textarea.tsx # generic textarea with error handling
│ ├── Checkbox.tsx # consent checkbox component
│ ├── SuccessToast.tsx # success overlay shown after submission
│ └── ErrorToast.tsx # error overlay shown on failure
└── e2e/contact/
└── contact.spec.ts # Playwright tests covering mobile & desktop


### Key files

- **`page.tsx`** – a server component that constructs the overall page layout,
  imports the reusable `<Logo/>`, `<Button>` and `<Footer/>` components and
  positions the `ContactForm` within a card.  The copy, icons and spacing are
  derived from the provided designs.

- **`ContactForm.tsx`** – a client component using `react-hook-form` to handle
  validation and manage form state.  It calls the `submitContact` server
  action via a `FormData` object, displays either a `SuccessToast` or an
  `ErrorToast` and hides the toast after ~1.6 s.  PostHog events are emitted
  without including any personally identifiable information.

- **`actions.ts`** – defines the server action `submitContact`, which
  re‑validates the input, applies a naive per‑IP rate limit and forwards the
  payload to a `/lead` endpoint.  A TODO marker highlights where the real
  backend call should be wired up once available.  The action uses headers
  from the incoming request to identify the client IP and session.

- **`rate-limit.ts`** – contains a tiny in‑memory rate limiter.  It tracks
  requests per IP over a 10‑minute window and allows up to 5 submissions.
  A helper `__resetRateLimit` exists solely for test isolation.

- **`CONTACT_README.md`** – this documentation.  Keep it up to date when
  modifying behaviour or adding features to the contact page.

## Running the application

1. Install dependencies from the monorepo root (assuming you are already in
   `apps/lumlyn-web`):

   ```bash
   npm install
   # or
   pnpm install
