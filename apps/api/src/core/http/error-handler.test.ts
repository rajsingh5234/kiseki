import Fastify, { type FastifyInstance } from "fastify";
import { describe, expect, it, onTestFinished } from "vitest";

import { AppError } from "#core/errors/app-error.ts";
import { type LogCapture, logCapture } from "#core/logger/log-capture.fixture.ts";

import { errorHandler, notFoundHandler } from "./error-handler.ts";

const SECRET = 'duplicate key value violates unique constraint "users_email_key"';

function setup(): { app: FastifyInstance; logs: LogCapture } {
   const logs = logCapture();
   const app = Fastify({ logger: { level: "info", stream: logs.stream } });
   app.setErrorHandler(errorHandler);
   app.setNotFoundHandler(notFoundHandler);
   onTestFinished(() => app.close());
   return { app, logs };
}

/** The handler's own log line ("request failed" or "request rejected"), parsed. */
function handlerLog(logs: LogCapture): unknown {
   const lines = logs.lines.filter((line) => /"msg":"request (failed|rejected)"/.test(line));
   expect(lines).toHaveLength(1);
   const parsed: unknown = JSON.parse(lines[0] ?? "");
   return parsed;
}

describe("errorHandler", () => {
   describe("happy path", () => {
      it("logs an AppError at info with its code and no stack trace", async () => {
         const { app, logs } = setup();
         app.get("/target", () => {
            throw new AppError({
               kind: "not_found",
               code: "TARGET_NOT_FOUND",
               message: "Target not found",
            });
         });

         await app.inject({ url: "/target" });

         const entry = handlerLog(logs);
         expect(entry).toMatchObject({
            level: 30,
            code: "TARGET_NOT_FOUND",
            msg: "request rejected",
         });
         expect(entry).not.toHaveProperty("err");
      });

      it("logs an AppError's cause, so the root problem stays visible", async () => {
         const { app, logs } = setup();
         app.post("/signup", () => {
            throw new AppError({
               kind: "conflict",
               code: "EMAIL_TAKEN",
               message: "Email taken",
               cause: new Error(SECRET),
            });
         });

         const response = await app.inject({ method: "POST", url: "/signup" });

         expect(handlerLog(logs)).toMatchObject({
            level: 30,
            code: "EMAIL_TAKEN",
            err: { message: SECRET },
         });
         expect(response.body).not.toContain("users_email_key");
      });

      it("answers unknown URLs without an extra error log", async () => {
         const { app, logs } = setup();

         const response = await app.inject({ url: "/nowhere" });

         expect(response.json()).toMatchObject({ code: "ROUTE_NOT_FOUND" });
         expect(logs.lines.join("")).not.toMatch(/request (failed|rejected)/);
      });
   });

   describe("sad path", () => {
      it("logs a bug at error with its real message and stack, but never sends them", async () => {
         const { app, logs } = setup();
         app.get("/boom", () => {
            throw new Error(SECRET);
         });

         const response = await app.inject({ url: "/boom" });

         expect(handlerLog(logs)).toMatchObject({
            level: 50,
            code: "INTERNAL_ERROR",
            msg: "request failed",
            reqId: response.json<{ requestId: string }>().requestId,
            err: { message: SECRET, stack: expect.stringContaining(`Error: ${SECRET}`) },
         });
         expect(response.statusCode).toBe(500);
         expect(response.body).not.toContain("users_email_key");
      });

      it("logs a thrown non-error value at error too", async () => {
         const { app, logs } = setup();
         app.get("/odd", () => {
            throw "something odd";
         });

         const response = await app.inject({ url: "/odd" });

         expect(response.statusCode).toBe(500);
         expect(handlerLog(logs)).toMatchObject({ level: 50, code: "INTERNAL_ERROR" });
      });
   });
});
