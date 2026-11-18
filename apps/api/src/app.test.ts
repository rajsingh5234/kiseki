import type { FastifyInstance } from "fastify";
import { describe, expect, it, onTestFinished } from "vitest";

import { testConfig } from "#core/config/app-config.fixture.ts";
import { UUID } from "#core/http/request-id.fixture.ts";

import { buildApp } from "./app.ts";

function setup(): FastifyInstance {
   const app = buildApp(testConfig());
   onTestFinished(() => app.close());
   return app;
}

describe("buildApp", () => {
   describe("happy path", () => {
      it("gives every response a new request ID", async () => {
         const app = setup();

         const first = await app.inject({ url: "/" });
         const second = await app.inject({ url: "/" });

         expect(first.headers["x-request-id"]).toMatch(UUID);
         expect(second.headers["x-request-id"]).toMatch(UUID);
         expect(first.headers["x-request-id"]).not.toBe(second.headers["x-request-id"]);
      });

      it("echoes a valid incoming request ID", async () => {
         const app = setup();

         const response = await app.inject({ url: "/", headers: { "x-request-id": "trace-42" } });

         expect(response.headers["x-request-id"]).toBe("trace-42");
      });

      it("cuts off requests that take longer than 30 seconds to arrive", () => {
         const app = setup();

         expect(app.server.requestTimeout).toBe(30_000);
      });
   });

   describe("sad path", () => {
      it("replaces an invalid incoming request ID", async () => {
         const app = setup();

         const response = await app.inject({ url: "/", headers: { "x-request-id": "bad id" } });

         expect(response.headers["x-request-id"]).toMatch(UUID);
      });

      it("keeps the request ID on a 404", async () => {
         const app = setup();

         const response = await app.inject({ url: "/no-such-page" });

         expect(response.statusCode).toBe(404);
         expect(response.headers["x-request-id"]).toMatch(UUID);
      });

      it("keeps the request ID when a route fails", async () => {
         const app = setup();
         app.get("/boom", () => {
            throw new Error("boom");
         });

         const response = await app.inject({
            url: "/boom",
            headers: { "x-request-id": "trace-42" },
         });

         expect(response.statusCode).toBe(500);
         expect(response.headers["x-request-id"]).toBe("trace-42");
      });
   });
});
