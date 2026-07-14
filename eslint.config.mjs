import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/next-env.d.ts"
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Pack rule (Arch S1-A1 §7): no `any` in gate/resolution
    files: ["packages/gate/**/*.ts", "packages/resolution/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error"
    }
  },
  {
    // Root-level CommonJS config files (e.g. .dependency-cruiser.cjs) run
    // under Node's CJS loader, not the ESM/browser default.
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "writable",
        exports: "writable",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly"
      }
    }
  }
);
