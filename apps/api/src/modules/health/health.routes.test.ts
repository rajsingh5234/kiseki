import Fastify from "fastify";
import { describe, expect, it, onTestFinished } from "vitest";

import { logCapture } from "#core/logger/log-capture.fixture.ts";

import { HealthController } from "./health.controller.ts";
import { healthRoutes } from "./health.routes.ts";
import { HealthService } from "./health.service.ts";
import type { IHealthCheck } from "./health.types.ts";

const DATABASE_DOWN: IHealthCheck = { name: "database", check: () => Promise.resolve(false) };

async function setup(checks: readonly IHealthCheck[] = []) {
   const logs = logCapture();
   const app = Fastify({ logger: { level: "info", stream: logs.stream } });
   await app.register(healthRoutes(new HealthController(new HealthService(checks))), {
      prefix: "/health",
   });
   onTestFinished(() => app.close());
   return { app, logs };
}

describe("health routes", () => {
   describe("happy path", () => {
      it.each(["/health/live", "/health/ready"])("%s answers 200 ok", async (url) => {
         const { app } = await setup();

         const response = await app.inject({ url });

         expect(response.statusCode).toBe(200);
         expect(response.json()).toEqual({ status: "ok" });
      });

      it.each(["/health/live", "/health/ready"])("%s is never cached", async (url) => {
         const { app } = await setup();

         const response = await app.inject({ url });

         expect(response.headers["cache-control"]).toBe("no-store");
      });

      it("keeps routine checks out of the logs", async () => {
         const { app, logs } = await setup();

         await app.inject({ url: "/health/live" });
         await app.inject({ url: "/health/ready" });

         expect(logs.lines).toEqual([]);
      });
   });

   describe("sad path", () => {
      it("answers 503 without revealing which check failed", async () => {
         const { app } = await setup([DATABASE_DOWN]);

         const response = await app.inject({ url: "/health/ready" });

         expect(response.statusCode).toBe(503);
         expect(response.json()).toEqual({ status: "unavailable" });
         expect(response.body).not.toContain("database");
      });

      it("logs one warning naming the failed checks", async () => {
         const { app, logs } = await setup([DATABASE_DOWN]);

         await app.inject({ url: "/health/ready" });

         expect(logs.entries()).toEqual([
            expect.objectContaining({ level: 40, failing: ["database"] }),
         ]);
      });

      it("stays live when a readiness check fails", async () => {
         const { app } = await setup([DATABASE_DOWN]);

         const response = await app.inject({ url: "/health/live" });

         expect(response.statusCode).toBe(200);
      });
   });
});
