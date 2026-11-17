import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
   test: {
      include: ["src/**/*.test.ts"],
      testTimeout: 5_000,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      coverage: {
         provider: "v8",
         include: ["src/**/*.ts"],
         exclude: ["src/**/*.test.ts"],
         reporter: ["text", "html"],
         thresholds: {
            lines: 80,
            functions: 80,
            branches: 80,
            statements: 80,
         },
      },
   },
});
