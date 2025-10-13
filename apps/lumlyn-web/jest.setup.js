// jest.setup.js
import '@testing-library/jest-dom';
// 👉 asta înregistrează ȘI tipurile pentru matcherul .toHaveNoViolations
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';


// (mock-urile tale existente – păstrează-le)
jest.mock('posthog-js', () => ({
  capture: () => {},
  init: () => {},
  identify: () => {},
}));

// polyfills (dacă le ai deja, păstrează-le)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
  
}
