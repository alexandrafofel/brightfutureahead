// lib/policy.ts

// Meta-info despre policy/terms
export const POLICY_VERSION =
  process.env.NEXT_PUBLIC_POLICY_VERSION || "v1.0";

export const POLICY_EFFECTIVE =
  process.env.NEXT_PUBLIC_POLICY_EFFECTIVE || "2025-10-31";

// URL-uri oficiale (rămân fixe)
export const TERMS_URL = "/legal/terms";
export const PRIVACY_URL = "/legal/privacy-policy";
export const CONTACT_URL = "/contact";

// Structură de documente legale (extensibilă)
export const legalDocs = {
  terms: {
    title: "Terms & Conditions",
    url: TERMS_URL,
    effective: POLICY_EFFECTIVE,
    version: POLICY_VERSION,
  },
  privacy: {
    title: "Privacy Policy",
    url: PRIVACY_URL,
    effective: POLICY_EFFECTIVE,
    version: POLICY_VERSION,
  },
  contact: {
    title: "Contact us",
    url: CONTACT_URL,
  }
} as const;

// Funcție helper care poate întoarce placeholder de WIP
export function getLegalDoc(slug: keyof typeof legalDocs) {
  const doc = legalDocs[slug];
  return {
    ...doc,
    // Dacă nu e gata pagina, putem afișa ceva generic
    content: `Pagina pentru ${doc.title} este în lucru. Revino curând 🙏`,
  };
}
