import { describe, expect, it } from "vitest";

import { ConfigError, loadConfig } from "./app-config.ts";

function captureConfigError(env: Record<string, string | undefined>): ConfigError {
   try {
      loadConfig(env);
   } catch (error) {
      if (error instanceof ConfigError) {
         return error;
      }
      throw error;
   }
   throw new Error("Expected loadConfig to throw a ConfigError");
}

describe("loadConfig", () => {
   describe("happy path", () => {
      it("applies defaults when only NODE_ENV is set", () => {
         expect(loadConfig({ NODE_ENV: "development" })).toEqual({
            env: "development",
            port: 3000,
            host: "127.0.0.1",
            logLevel: undefined,
         });
      });

      it("reads every variable and converts PORT to a number", () => {
         const config = loadConfig({
            NODE_ENV: "production",
            PORT: "8080",
            HOST: "0.0.0.0",
            LOG_LEVEL: "warn",
         });

         expect(config).toEqual({
            env: "production",
            port: 8080,
            host: "0.0.0.0",
            logLevel: "warn",
         });
      });

      it("treats empty values as not set, so defaults apply", () => {
         const config = loadConfig({ NODE_ENV: "test", PORT: "", HOST: "  ", LOG_LEVEL: "" });

         expect(config).toEqual({
            env: "test",
            port: 3000,
            host: "127.0.0.1",
            logLevel: undefined,
         });
      });

      it("returns a frozen config", () => {
         expect(Object.isFrozen(loadConfig({ NODE_ENV: "test" }))).toBe(true);
      });
   });

   describe("sad path", () => {
      it("rejects a missing NODE_ENV", () => {
         expect(captureConfigError({}).message).toContain("NODE_ENV");
      });

      it("rejects an empty NODE_ENV as missing", () => {
         expect(captureConfigError({ NODE_ENV: "" }).message).toContain("NODE_ENV");
      });

      it("lists every invalid variable in one error", () => {
         const { message } = captureConfigError({
            NODE_ENV: "staging",
            PORT: "30OO",
            LOG_LEVEL: "loud",
         });

         expect(message).toContain("Invalid environment");
         expect(message).toContain("NODE_ENV");
         expect(message).toContain("PORT");
         expect(message).toContain("LOG_LEVEL");
      });

      it.each(["0", "70000", "3.5"])("rejects PORT=%s", (port) => {
         expect(captureConfigError({ NODE_ENV: "test", PORT: port }).message).toContain("PORT");
      });

      it("throws a ConfigError, not a plain Error", () => {
         expect(() => loadConfig({})).toThrow(ConfigError);
      });
   });
});
