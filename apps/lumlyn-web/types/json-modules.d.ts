// apps/lumlyn-web/types/json-modules.d.ts
// Allows importing JSON files (e.g., `import data from "@/data/calm_tips.json"`)
// even if `resolveJsonModule` isn't enabled or strict TS complains.

declare module "*.json" {
  const value: any;
  export default value;
}
