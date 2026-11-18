import { baseConfig } from "@kiseki/vitest-config/base";
import { mergeConfig } from "vitest/config";

export default mergeConfig(baseConfig, {
   test: {
      coverage: {
         // The entry point runs in a child process (server.test.ts), where coverage can't see it.
         exclude: ["src/server.ts"],
      },
   },
});
