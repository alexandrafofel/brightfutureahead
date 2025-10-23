// apps/lumlyn-web/eslint.config.mjs
import next from 'eslint-config-next';

export default [
  // Base: Next's core web vitals
  ...next(),

  // Our app-only rule tweaks to unblock compilation
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Too noisy right now — we'll fix incrementally
      'unicorn/filename-case': 'off',
      'no-restricted-imports': 'off',
      'import/order': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],

      // Keep critical correctness rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Tests: soften rules further
  {
    files: ['**/__tests__/**/*.{ts,tsx,js,jsx}', '**/*.test.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
