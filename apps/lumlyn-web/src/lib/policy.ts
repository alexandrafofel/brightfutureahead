# din rădăcina proiectului apps/lumlyn-web
mkdir -p src/lib

tee src/lib/policy.ts > /dev/null <<'TS'
export const POLICY_VERSION =
  process.env.NEXT_PUBLIC_POLICY_VERSION ?? "v1.0";

export const POLICY_EFFECTIVE =
  process.env.NEXT_PUBLIC_POLICY_EFFECTIVE ?? "2025-10-31";

export const TERMS_URL =
  process.env.NEXT_PUBLIC_TERMS_URL ?? "/legal/terms";

export const PRIVACY_URL =
  process.env.NEXT_PUBLIC_PRIVACY_URL ?? "/legal/privacy";
TS

git add src/lib/policy.ts
git commit -m "chore(gdpr): add policy config (version, effective, links)"
npm run build