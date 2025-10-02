import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  // Rulează DOAR unit/integration din __tests__ (nu e2e)
  testMatch: ['<rootDir>/app/**/__tests__/**/*.(test|spec).(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/.next/', '<rootDir>/node_modules/'],

  // SWC transform pentru TS/TSX
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2021',
          parser: { syntax: 'typescript', tsx: true },
          transform: {
            react: { runtime: 'automatic', development: true }
          }
        },
        module: { type: 'commonjs' },
        sourceMaps: true
      }
    ]
  },

  // ✅ Important: mapează aliasul Next.js `@/` către rădăcina app-ului pentru Jest
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;