import { describe, expect, it, vi } from "vitest";

import { HealthService } from "./health.service.ts";
import type { IHealthCheck } from "./health.types.ts";

function passing(name: string): IHealthCheck {
   return { name, check: () => Promise.resolve(true) };
}

function failing(name: string): IHealthCheck {
   return { name, check: () => Promise.resolve(false) };
}

function crashing(name: string): IHealthCheck {
   return { name, check: () => Promise.reject(new Error("connection lost")) };
}

describe("HealthService", () => {
   describe("happy path", () => {
      it("is ready when there are no checks", async () => {
         const service = new HealthService([]);

         await expect(service.checkReadiness()).resolves.toEqual({ ready: true, failing: [] });
      });

      it("is ready when every check passes", async () => {
         const service = new HealthService([passing("database"), passing("shutdown")]);

         await expect(service.checkReadiness()).resolves.toEqual({ ready: true, failing: [] });
      });

      it("starts every check without waiting for the others", async () => {
         const slow = Promise.withResolvers<boolean>();
         const second = vi.fn<IHealthCheck["check"]>(() => Promise.resolve(true));
         const service = new HealthService([
            { name: "slow", check: () => slow.promise },
            { name: "second", check: second },
         ]);

         const pending = service.checkReadiness();

         expect(second).toHaveBeenCalledOnce();
         slow.resolve(true);
         await expect(pending).resolves.toEqual({ ready: true, failing: [] });
      });
   });

   describe("sad path", () => {
      it("is not ready when a check fails", async () => {
         const service = new HealthService([passing("shutdown"), failing("database")]);

         await expect(service.checkReadiness()).resolves.toEqual({
            ready: false,
            failing: ["database"],
         });
      });

      it("treats a check that rejects as failed", async () => {
         const service = new HealthService([crashing("database")]);

         await expect(service.checkReadiness()).resolves.toEqual({
            ready: false,
            failing: ["database"],
         });
      });

      it("treats a check that throws before returning a promise as failed", async () => {
         const service = new HealthService([
            {
               name: "database",
               check: () => {
                  throw new Error("not connected");
               },
            },
         ]);

         await expect(service.checkReadiness()).resolves.toEqual({
            ready: false,
            failing: ["database"],
         });
      });

      it("lists every failed check, in order", async () => {
         const service = new HealthService([
            failing("cache"),
            passing("shutdown"),
            crashing("database"),
         ]);

         await expect(service.checkReadiness()).resolves.toEqual({
            ready: false,
            failing: ["cache", "database"],
         });
      });
   });
});
