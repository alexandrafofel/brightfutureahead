import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // 🔹 Importuri curate cu aliasuri
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./*"]
        }
      ],

      // 🔹 Evită en-dash, spații sau uppercase în nume de fișiere
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase"
        }
      ],

      // 🔹 Ordine importuri
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"]
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],

      // 🔹 Best practices TypeScript
      "@typescript-eslint/no-unused-vars": ["error"],
      "prefer-const": "error"
    },
    plugins: ["import", "unicorn", "@typescript-eslint"]
  },
];

export default eslintConfig;
