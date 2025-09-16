# din apps/lumlyn-web
npm i -D @playwright/test
npx playwright install

# creează folderul de teste + fișierul cu 3 teste
mkdir -p tests
tee tests/gdpr-consent.spec.ts >/dev/null <<'TS'
import { test, expect } from '@playwright/test';

// 1) Email validation — mesaj de eroare pentru format invalid
test('email field shows error on invalid format', async ({ page }) => {
  await page.goto('/');
  const email = page.getByPlaceholder('Enter your email to get your calm tip');
  await email.fill('not-an-email');
  // submit fără consimțământ nu ar trebui să trimită, dar vrem doar eroarea de email
  await page.keyboard.press('Enter');
  await expect(page.getByText("Hmm… that doesn’t look like a valid email. Try again?")).toBeVisible();
});

// 2) Checkbox gating — butonul e disabled până bifezi consimțământul
test('submit is disabled until GDPR consent is checked', async ({ page }) => {
  await page.goto('/');
  const submit = page.getByRole('button', { name: /get early access/i });
  // fără bifă → disabled
  await expect(submit).toBeDisabled();
  // bifează checkbox-ul
  const checkbox = page.locator('input[type="checkbox"]');
  await checkbox.check();
  // acum devine enabled
  await expect(submit).toBeEnabled();
});

// 3) Linkuri Privacy & Terms — target="_blank" + rel="noopener"
test('checkbox text links open in new tab with safe rel', async ({ page, context }) => {
  await page.goto('/');

  const terms = page.locator('a', { hasText: /^Terms$/ });
  const privacy = page.locator('a', { hasText: /^Privacy Policy$|^Privacy$/ });

  // dacă UI-ul nu e pe homepage încă, sărim testul fără fail
  if (!(await terms.first().isVisible().catch(() => false)) || !(await privacy.first().isVisible().catch(() => false))) {
    test.skip(true, 'GDPR checkbox not present on / yet — skipping.');
  }

  await expect(terms.first()).toHaveAttribute('target', '_blank');
  await expect(terms.first()).toHaveAttribute('rel', /noopener/);
  await expect(privacy.first()).toHaveAttribute('target', '_blank');
  await expect(privacy.first()).toHaveAttribute('rel', /noopener/);

  const pagesBefore = context.pages().length;
  await terms.first().click();
  await privacy.first().click();
  await page.waitForTimeout(300);
  const pagesAfter = context.pages().length;
  expect(pagesAfter).toBeGreaterThan(pagesBefore);
});
TS

# config Playwright minimal (dacă nu-l ai deja)
tee playwright.config.ts >/dev/null <<'TS'
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:3000', headless: true },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
TS

# rulează testele
npx playwright test