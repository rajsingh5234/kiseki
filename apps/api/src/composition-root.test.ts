import type { FastifyInstance } from "fastify";
import { describe, expect, it, onTestFinished } from "vitest";

import { testConfig } from "#core/config/app-config.fixture.ts";

import { buildApp } from "./app.ts";
import { composeModules } from "./composition-root.ts";

function setup(): FastifyInstance {
   const app = buildApp(testConfig(), composeModules());
   onTestFinished(() => app.close());
   return app;
}

describe("composeModules", () => {
   describe("happy path", () => {
      it.each(["/health/live", "/health/ready"])("serves %s in the real app", async (url) => {
         const app = setup();

         const response = await app.inject({ url });

         expect(response.statusCode).toBe(200);
         expect(response.json()).toEqual({ status: "ok" });
      });
   });

   describe("sad path", () => {
      it.each(["/health/nope", "/live", "/health"])("answers 404 for %s", async (url) => {
         const app = setup();

         const response = await app.inject({ url });

         expect(response.statusCode).toBe(404);
      });
   });
});
