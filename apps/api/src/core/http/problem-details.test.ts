import { describe, expect, it } from "vitest";

import { AppError, type ErrorKind } from "#core/errors/app-error.ts";

import { problemFor, routeNotFoundProblem } from "./problem-details.ts";

const REQUEST_ID = "req-42";
const SECRET = 'duplicate key value violates unique constraint "users_email_key"';

function fastifyError(code: string, statusCode: number, message: string): Error {
   return Object.assign(new Error(message), { code, statusCode });
}

describe("problemFor", () => {
   describe("happy path", () => {
      it.each([
         ["invalid", 400, "Bad Request"],
         ["unauthenticated", 401, "Unauthorized"],
         ["forbidden", 403, "Forbidden"],
         ["not_found", 404, "Not Found"],
         ["conflict", 409, "Conflict"],
      ] satisfies [ErrorKind, number, string][])(
         "shows an AppError of kind %s as %i %s",
         (kind, status, title) => {
            const error = new AppError({ kind, code: "SOME_CODE", message: "A safe message" });

            expect(problemFor(error, REQUEST_ID)).toEqual({
               log: { level: "info", message: "request rejected" },
               body: {
                  type: "about:blank",
                  title,
                  status,
                  detail: "A safe message",
                  code: "SOME_CODE",
                  requestId: REQUEST_ID,
               },
            });
         },
      );

      it.each([
         ["FST_ERR_CTP_INVALID_JSON_BODY", 400, "Bad Request", "BAD_REQUEST"],
         ["FST_ERR_CTP_BODY_TOO_LARGE", 413, "Payload Too Large", "PAYLOAD_TOO_LARGE"],
         [
            "FST_ERR_CTP_INVALID_MEDIA_TYPE",
            415,
            "Unsupported Media Type",
            "UNSUPPORTED_MEDIA_TYPE",
         ],
         ["FST_ERR_UNUSUAL", 499, "Error", "ERROR"],
      ])("shows Fastify's %s as %i with a clean code", (fastifyCode, status, title, code) => {
         const error = fastifyError(fastifyCode, status, "Fastify's message for the client");

         expect(problemFor(error, REQUEST_ID)).toEqual({
            log: { level: "info", message: "request rejected" },
            body: {
               type: "about:blank",
               title,
               status,
               detail: "Fastify's message for the client",
               code,
               requestId: REQUEST_ID,
            },
         });
      });

      it("logs an AppError's cause, but never shows it", () => {
         const cause = new Error(SECRET);
         const error = new AppError({
            kind: "conflict",
            code: "EMAIL_TAKEN",
            message: "Email taken",
            cause,
         });

         const problem = problemFor(error, REQUEST_ID);

         expect(problem.log).toEqual({ level: "info", message: "request rejected", err: cause });
         expect(JSON.stringify(problem.body)).not.toContain("users_email_key");
      });
   });

   describe("sad path", () => {
      it.each([
         ["a bug", new Error(SECRET)],
         ["a thrown string", SECRET],
         ["a thrown null", null],
         [
            "another library's 4xx",
            Object.assign(new Error(SECRET), { code: "E_DB", statusCode: 400 }),
         ],
         ["a Fastify 5xx", fastifyError("FST_ERR_SOMETHING", 500, SECRET)],
         ["a Fastify error without a 4xx status", fastifyError("FST_ERR_SOMETHING", 302, SECRET)],
      ])("hides %s behind a generic 500", (_label, thrown) => {
         const problem = problemFor(thrown, REQUEST_ID);

         expect(problem).toEqual({
            log: { level: "error", message: "request failed", err: thrown },
            body: {
               type: "about:blank",
               title: "Internal Server Error",
               status: 500,
               detail: "Something went wrong. Please try again.",
               code: "INTERNAL_ERROR",
               requestId: REQUEST_ID,
            },
         });
         expect(JSON.stringify(problem.body)).not.toContain("users_email_key");
      });
   });
});

describe("routeNotFoundProblem", () => {
   describe("happy path", () => {
      it("answers 404 with its own code, apart from features' *_NOT_FOUND codes", () => {
         expect(routeNotFoundProblem(REQUEST_ID)).toEqual({
            type: "about:blank",
            title: "Not Found",
            status: 404,
            detail: "This endpoint does not exist.",
            code: "ROUTE_NOT_FOUND",
            requestId: REQUEST_ID,
         });
      });
   });

   describe("sad path", () => {
      it("never echoes anything from the request but its ID", () => {
         const body = routeNotFoundProblem("trace-7");

         expect(Object.keys(body).toSorted()).toEqual([
            "code",
            "detail",
            "requestId",
            "status",
            "title",
            "type",
         ]);
         expect(body.requestId).toBe("trace-7");
      });
   });
});
