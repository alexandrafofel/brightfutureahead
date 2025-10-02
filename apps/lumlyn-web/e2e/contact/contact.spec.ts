import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * End‑to‑end tests for the contact form.  These tests exercise the full
 * application in a browser environment including accessibility checks with
 * axe‑core and visual snapshots.  Both mobile and desktop breakpoints are
 * covered.  The Playwright configuration at the bottom of this file
 * launches a development server before running the tests.
 */

// Helper to perform the happy‑path submission on a given page.  It fills in
// the required fields, ticks the consent checkbox, clicks submit and waits
// for the success toast to appear.
async function submitHappyPath(page: Page) {
  await page.fill('input[placeholder="Your full name"]', 'Test User');
  await page.fill('input[placeholder="your@email.com"]', 'test@example.com');
  await page.fill('textarea[placeholder="How can we help you?"]', 'This is a sufficiently long message.');
  await page.check('input[type="checkbox"]');
  await page.getByRole('button', { name: /send with care/i }).click();
  await expect(page.getByText(/Thank you! We’ve received your message/i)).toBeVisible();
}

test.describe('contact form', () => {
  const viewports = [
    { label: 'mobile', width: 390, height: 844 },
    { label: 'desktop', width: 1440, height: 1024 },
  ];

  for (const vp of viewports) {
    test.describe(`in ${vp.label} viewport`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      test(`happy path shows success toast and passes accessibility`, async ({ page }) => {
        await page.goto('/contact');
        // Capture initial idle state snapshot
        await expect(page).toHaveScreenshot(`contact-idle-${vp.label}.png`);
        // Perform a happy path submission
        await submitHappyPath(page);
        // Run axe accessibility scan
        const axe = new AxeBuilder({ page });
        const results = await axe.analyze();
        expect(results.violations).toEqual([]);
        // Capture the success state
        await expect(page).toHaveScreenshot(`contact-success-${vp.label}.png`);
      });

      test(`server error displays error toast`, async ({ page }) => {
        // Intercept the POST to /lead and force a server error
        await page.route(/lead$/, route => route.fulfill({ status: 500, body: 'error' }));
        await page.goto('/contact');
        // Fill fields except name (optional)
        await page.fill('input[placeholder="your@email.com"]', 'error@example.com');
        await page.fill('textarea[placeholder="How can we help you?"]', 'Another sufficiently long message.');
        await page.check('input[type="checkbox"]');
        await page.getByRole('button', { name: /send with care/i }).click();
        // Expect error toast to appear
        await expect(page.getByText(/Oops – something went wrong/i)).toBeVisible();
        // Capture error state
        await expect(page).toHaveScreenshot(`contact-error-${vp.label}.png`);
      });
    });
  }
});

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/contact',
  use: { baseURL: 'http://localhost:3000', headless: true },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
