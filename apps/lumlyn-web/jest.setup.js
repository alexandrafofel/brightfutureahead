import "@testing-library/jest-dom";

// Blochează orice apel real către analytics în teste.
jest.mock("posthog-js", () => ({
  capture: () => {},
  init: () => {},
  identify: () => {},
}));

// (Optional) Polyfill ușor pentru TextEncoder/TextDecoder dacă apar avertismente în Node.
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
