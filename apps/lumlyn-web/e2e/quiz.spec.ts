import { test, expect } from '@playwright/test';

// End‑to‑end tests for the quiz run flow. These tests exercise the UI in the
// browser, ensuring that questions advance correctly, the mid‑check appears
// after the second question, and that completion navigates to the outro page.

test('quiz flow navigates through all steps and finishes', async ({ page }) => {
  await page.goto('/quiz/run');

  // Intro start button
  const start = page.getByRole('button', { name: /start/i });
  await start.click();

  // Q1 of 6 should appear
  await expect(page.getByText('Q1 of 6')).toBeVisible();
  // Answer Q1
  await page.getByRole('radio').first().click();
  await expect(page.getByText('Q2 of 6')).toBeVisible();

  // Answer Q2 → midcheck
  await page.getByRole('radio').first().click();
  await expect(page.getByText("You’re doing great — let’s keep going.")).toBeVisible();
  const continueBtn = page.getByRole('button', { name: /continue/i });
  await continueBtn.click();

  // Should go to Q3
  await expect(page.getByText('Q3 of 6')).toBeVisible();

  // Answer remaining questions (Q3–Q6)
  for (let i = 3; i <= 6; i++) {
    const progress = `Q${i} of 6`;
    await expect(page.getByText(progress)).toBeVisible();
    await page.getByRole('radio').first().click();
  }

  // Wait for navigation to outro
  await page.waitForURL('**/quiz/outro');
  await expect(page.url()).toContain('/quiz/outro');
});

test('quiz run with flags does not error', async ({ page }) => {
  await page.goto('/quiz/run?quiz_adaptive_enabled=1&force_low_conf=1');
  // It should still load and show start button
  const start = page.getByRole('button', { name: /start/i });
  await expect(start).toBeVisible();
});