import { defineConfig } from "oxlint";

// Import limits, each written once. An override REPLACES a rule's options instead of adding to
// them, so every file group below lists all the limits that apply to it.

const MODULE_BOUNDARY = {
   group: ["#modules/*/**", "!#modules/*/index.ts"],
   message:
      "Import another module only through its public index.ts, e.g. #modules/health/index.ts.",
};

const NO_ZOD = {
   group: ["zod", "zod/**"],
   message:
      "Zod belongs only in packages/contracts, *.validation.ts files and core/config (decision 001 §7).",
};

const NO_FIXTURES = {
   group: ["**/*.fixture.ts"],
   message: "Fixtures are test-only: import them only from *.test.ts files.",
};

const TEST_FILES = ["**/*.test.ts", "**/*.fixture.ts"];
const ZOD_ALLOWED = ["apps/api/src/core/config/**", "**/*.validation.ts", "packages/contracts/**"];

function restrictImports(...patterns: (typeof MODULE_BOUNDARY)[]) {
   return ["error", { patterns }] as const;
}

export default defineConfig({
   plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "promise", "vitest", "node"],
   categories: {
      correctness: "error",
      suspicious: "error",
      perf: "warn",
   },
   rules: {
      "import/no-relative-parent-imports": "error",
      // Only the entry point reads process.env; everything else receives the validated config.
      "node/no-process-env": "error",
      // Tests and fixtures: module boundary + no Zod.
      "no-restricted-imports": restrictImports(MODULE_BOUNDARY, NO_ZOD),
   },
   overrides: [
      {
         // Normal code: module boundary + no Zod + no fixtures.
         files: ["**/*.ts"],
         excludeFiles: TEST_FILES,
         rules: { "no-restricted-imports": restrictImports(MODULE_BOUNDARY, NO_ZOD, NO_FIXTURES) },
      },
      {
         // Places where Zod belongs: module boundary + no fixtures.
         files: ZOD_ALLOWED,
         excludeFiles: TEST_FILES,
         rules: { "no-restricted-imports": restrictImports(MODULE_BOUNDARY, NO_FIXTURES) },
      },
      {
         // The entry point: the one file that reads process.env.
         files: ["apps/api/src/server.ts"],
         rules: { "node/no-process-env": "off" },
      },
   ],
   options: {
      typeAware: true,
   },
});
