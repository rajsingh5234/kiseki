import { STATUS_CODES } from "node:http";

import { AppError, type ErrorKind } from "#core/errors/app-error.ts";

export const PROBLEM_CONTENT_TYPE = "application/problem+json";

/** The error response body (RFC 9457 "Problem Details", plus our `code` and `requestId`). */
export type ProblemDetails = {
   readonly type: "about:blank";
   readonly title: string;
   readonly status: number;
   readonly detail: string;
   readonly code: string;
   readonly requestId: string;
};

/** How to log a failed request. */
export type ProblemLog = {
   /** "error" for bugs and server failures; "info" for expected client problems. */
   readonly level: "info" | "error";
   readonly message: "request failed" | "request rejected";
   /** An error to log in full (message and stack): the bug itself, or an AppError's cause. */
   readonly err?: unknown;
};

/** Everything decided about a thrown value: what the caller sees, and what we log. */
export type Problem = {
   readonly body: ProblemDetails;
   readonly log: ProblemLog;
};

const STATUS_BY_KIND: Readonly<Record<ErrorKind, number>> = {
   invalid: 400,
   unauthenticated: 401,
   forbidden: 403,
   not_found: 404,
   conflict: 409,
};

const INTERNAL_ERROR = {
   status: 500,
   code: "INTERNAL_ERROR",
   detail: "Something went wrong. Please try again.",
};

const ROUTE_NOT_FOUND = {
   status: 404,
   code: "ROUTE_NOT_FOUND",
   detail: "This endpoint does not exist.",
};

const REJECTED = { level: "info", message: "request rejected" } as const;
const FAILED = { level: "error", message: "request failed" } as const;

type ProblemFields = { readonly status: number; readonly code: string; readonly detail: string };

/** Decides what the caller sees and what we log, for any thrown value. Only AppError and Fastify's own 4xx errors show their message. */
export function problemFor(error: unknown, requestId: string): Problem {
   if (error instanceof AppError) {
      const status = STATUS_BY_KIND[error.kind];
      return {
         body: build({ status, code: error.code, detail: error.message }, requestId),
         log: { ...REJECTED, err: error.cause },
      };
   }
   if (isFastifyClientError(error)) {
      const status = error.statusCode;
      return {
         body: build({ status, code: codeFor(status), detail: error.message }, requestId),
         log: REJECTED,
      };
   }
   return { body: build(INTERNAL_ERROR, requestId), log: { ...FAILED, err: error } };
}

/** The answer for URLs that match no route (not an error to log: Fastify's request lines already show the 404). */
export function routeNotFoundProblem(requestId: string): ProblemDetails {
   return build(ROUTE_NOT_FOUND, requestId);
}

function build(fields: ProblemFields, requestId: string): ProblemDetails {
   return {
      type: "about:blank",
      title: STATUS_CODES[fields.status] ?? "Error",
      status: fields.status,
      detail: fields.detail,
      code: fields.code,
      requestId,
   };
}

type FastifyClientError = Error & { readonly code: string; readonly statusCode: number };

/** An error Fastify raised itself for a bad request: code "FST_…" and a 4xx status. */
function isFastifyClientError(error: unknown): error is FastifyClientError {
   return (
      error instanceof Error &&
      "code" in error &&
      typeof error.code === "string" &&
      error.code.startsWith("FST_") &&
      "statusCode" in error &&
      typeof error.statusCode === "number" &&
      error.statusCode >= 400 &&
      error.statusCode < 500
   );
}

/** "Payload Too Large" → "PAYLOAD_TOO_LARGE". */
function codeFor(status: number): string {
   return (STATUS_CODES[status] ?? "Error").toUpperCase().replaceAll(/[^A-Z0-9]+/g, "_");
}
