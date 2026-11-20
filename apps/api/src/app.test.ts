import type { FastifyInstance } from "fastify";
import { describe, expect, it, onTestFinished } from "vitest";

import { testConfig } from "#core/config/app-config.fixture.ts";
import { AppError } from "#core/errors/app-error.ts";
import type { ApiModule } from "#core/http/api-module.ts";
import { UUID } from "#core/http/request-id.fixture.ts";

import { buildApp } from "./app.ts";

const PING_MODULE: ApiModule = {
   prefix: "/ping",
   routes: (app, _options, done) => {
      app.get("/", () => ({ pong: true }));
      done();
   },
};

function setup(modules: readonly ApiModule[] = []): FastifyInstance {
   const app = buildApp(testConfig(), modules);
   onTestFinished(() => app.close());
   return app;
}

describe("buildApp", () => {
   describe("happy path", () => {
      it("registers each module under its prefix", async () => {
         const app = setup([PING_MODULE]);

         const response = await app.inject({
            url: "/ping",
            headers: { "x-request-id": "trace-42" },
         });

         expect(response.statusCode).toBe(200);
         expect(response.json()).toEqual({ pong: true });
         expect(response.headers["x-request-id"]).toBe("trace-42");
      });

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

      it("answers an unknown URL with a 404 problem", async () => {
         const app = setup();

         const response = await app.inject({ url: "/no-such-page" });

         expect(response.statusCode).toBe(404);
         expect(response.headers["content-type"]).toMatch(/^application\/problem\+json/);
         expect(response.json()).toMatchObject({
            code: "ROUTE_NOT_FOUND",
            requestId: response.headers["x-request-id"],
         });
      });

      it("hides a crashing route's details behind a generic 500 problem", async () => {
         const app = setup();
         app.get("/boom", () => {
            throw new Error('duplicate key value violates unique constraint "users_email_key"');
         });

         const response = await app.inject({
            url: "/boom",
            headers: { "x-request-id": "trace-42" },
         });

         expect(response.statusCode).toBe(500);
         expect(response.headers["content-type"]).toMatch(/^application\/problem\+json/);
         expect(response.headers["x-request-id"]).toBe("trace-42");
         expect(response.json()).toEqual({
            type: "about:blank",
            title: "Internal Server Error",
            status: 500,
            detail: "Something went wrong. Please try again.",
            code: "INTERNAL_ERROR",
            requestId: "trace-42",
         });
         expect(response.body).not.toContain("users_email_key");
      });

      it("answers an AppError with its own status, code and message", async () => {
         const app = setup();
         app.get("/target", () => {
            throw new AppError({
               kind: "not_found",
               code: "TARGET_NOT_FOUND",
               message: "Target not found",
            });
         });

         const response = await app.inject({ url: "/target" });

         expect(response.statusCode).toBe(404);
         expect(response.json()).toMatchObject({
            code: "TARGET_NOT_FOUND",
            detail: "Target not found",
         });
      });

      it("answers broken JSON with a 400 problem", async () => {
         const app = setup();
         app.post("/echo", () => ({ ok: true }));

         const response = await app.inject({
            method: "POST",
            url: "/echo",
            headers: { "content-type": "application/json" },
            payload: "{not json",
         });

         expect(response.statusCode).toBe(400);
         expect(response.json()).toMatchObject({ code: "BAD_REQUEST" });
         expect(response.body).not.toContain("FST_");
      });

      it("handles errors thrown inside modules too", async () => {
         const app = setup([
            {
               prefix: "/broken",
               routes: (module, _options, done) => {
                  module.get("/", () => {
                     throw new Error("module bug");
                  });
                  done();
               },
            },
         ]);

         const response = await app.inject({ url: "/broken" });

         expect(response.statusCode).toBe(500);
         expect(response.json()).toMatchObject({ code: "INTERNAL_ERROR" });
      });
   });
});
