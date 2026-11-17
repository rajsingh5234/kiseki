import { Writable } from "node:stream";

import Fastify from "fastify";
import { describe, expect, it } from "vitest";

import type { AppConfig } from "#core/config/app-config.ts";

import { loggerOptions } from "./logger-options.ts";

function configFor(env: AppConfig["env"], logLevel?: AppConfig["logLevel"]): AppConfig {
   return { env, port: 3000, host: "127.0.0.1", logLevel };
}

function levelFor(config: AppConfig): unknown {
   const options = loggerOptions(config);
   return typeof options === "object" ? options.level : undefined;
}

function captureLogs(config: AppConfig): { lines: string[]; app: ReturnType<typeof Fastify> } {
   const lines: string[] = [];
   const stream = new Writable({
      write(chunk: Buffer, _encoding, done) {
         lines.push(chunk.toString());
         done();
      },
   });
   const options = loggerOptions(config);
   const app = Fastify({ logger: typeof options === "object" ? { ...options, stream } : options });
   return { lines, app };
}

describe("loggerOptions", () => {
   describe("happy path", () => {
      it.each([
         ["development", "debug"],
         ["test", "silent"],
         ["production", "info"],
      ] as const)("uses level %s → %s by default", (env, level) => {
         expect(levelFor(configFor(env))).toBe(level);
      });

      it("lets LOG_LEVEL override the default", () => {
         expect(levelFor(configFor("production", "debug"))).toBe("debug");
         expect(levelFor(configFor("test", "warn"))).toBe("warn");
      });

      it("writes ordinary fields unchanged", () => {
         const { lines, app } = captureLogs(configFor("development"));

         app.log.info({ userId: "u_12" }, "target created");

         expect(lines.join("")).toContain('"userId":"u_12"');
      });
   });

   describe("sad path", () => {
      it("never writes secrets to the log", () => {
         const { lines, app } = captureLogs(configFor("development"));

         app.log.info(
            {
               password: "hunter2",
               token: "tok_live_123",
               user: { password: "hunter2", token: "tok_live_123" },
               req: { headers: { authorization: "Bearer abc.def", cookie: "sid=s3cret" } },
               res: { headers: { "set-cookie": "sid=s3cret" } },
            },
            "login attempt",
         );
         const output = lines.join("");

         expect(output).toContain("[REDACTED]");
         for (const secret of ["hunter2", "tok_live_123", "Bearer abc.def", "s3cret"]) {
            expect(output).not.toContain(secret);
         }
      });
   });
});
