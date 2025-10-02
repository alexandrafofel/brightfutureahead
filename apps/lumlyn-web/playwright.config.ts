import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Rulează DOAR testele din folderul e2e
  testDir: './e2e',

  // Ia numai fișierele .spec.ts
  testMatch: ['**/*.spec.ts'],

  // Ignoră complet testele de Jest
  testIgnore: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],

  // Viewporturi cerute (mobil + desktop)
  projects: [
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: 'desktop',
      use: { viewport: { width: 1440, height: 1024 } },
    },
  ],

  // Pornește app-ul înainte de e2e (dacă vrei din Playwright)
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },

  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});
