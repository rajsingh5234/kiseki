# 009: Error handling: Problem Details and AppError

- **Date:** 2026-11-20
- **Status:** Accepted
- **Extends:** decision 001 §5 (services know nothing about HTTP) and §6 (errors are classes)

## Context

Fastify's default error handler sends a crashing route's real error message to the caller (a database error would reveal table and constraint names), and each kind of error had a different shape with Fastify's internal codes in it. Every Phase 1 feature will produce errors, so the rules come first.

## Choice

### Expected errors: `AppError` (`apps/api/src/core/errors/app-error.ts`)

- One class for expected problems whose message is **safe to show** the user ("Target not found"). Anything thrown that is not an `AppError` is treated as a bug.
- It carries a **kind**, not an HTTP status: `invalid`, `unauthenticated`, `forbidden`, `not_found`, `conflict`. Services pick the kind; only the HTTP layer turns it into a status, so services stay HTTP-free and the worker can reuse the same errors.
- A stable **`code`** in UPPER_SNAKE_CASE (`TARGET_NOT_FOUND`, typed `Uppercase<string>`): the web app reacts to it and translates it, logs and tests search for it. It never changes once released; the message can.
- An optional **`cause`** (the wrapped original error, e.g. a database error): logged, never shown.
- One class with a `kind` field rather than a class per kind; options are passed as one object.
- Feature code throws it; controllers never catch errors just to answer them.

### Response format: Problem Details (RFC 9457)

Every error response is `application/problem+json`:

```json
{
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "Target not found",
  "code": "TARGET_NOT_FOUND",
  "requestId": "05340f46-…"
}
```

`type` is `about:blank` (the standard's value when there is no docs page), `title` is the standard status name, `code` and `requestId` are our extension fields. The `ProblemDetails` type moves to `packages/contracts` when that package exists, and error codes become a shared `ErrorCode` list there.

### What is shown and what is logged (`apps/api/src/core/http/problem-details.ts`)

The pure function `problemFor(error, requestId)` decides everything; it knows nothing about Fastify.

| Thrown                                                       | Status                                                                                      | `detail`                                  | `code`                                             | Logged                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| `AppError`                                                   | from its kind: invalid 400, unauthenticated 401, forbidden 403, not_found 404, conflict 409 | its message                               | its code                                           | `info`, plus its cause if any (no stack trace) |
| Fastify's own 4xx (code `FST_…`: broken JSON, too large…)    | Fastify's                                                                                   | Fastify's message (written for clients)   | from the status (`BAD_REQUEST`), never `FST_ERR_…` | `info`                                         |
| Anything else (bugs, 5xx, other libraries, non-Error throws) | 500                                                                                         | "Something went wrong. Please try again." | `INTERNAL_ERROR`                                   | **`error`**, with the full error and stack     |

- Unknown URLs answer 404 `ROUTE_NOT_FOUND` ("This endpoint does not exist."), kept apart from features' `*_NOT_FOUND` codes; no extra log line (Fastify's request lines show the 404).
- **Default deny:** only the two proven-safe kinds of error show their message. Another library's error with a `statusCode` is not trusted.
- `invalid` is 400, not 422: Fastify's own validation already answers 400, and one status for bad input is simpler for clients.
- **Never a stack trace in a response**, in any environment; in development the terminal shows it.
- An `error` log line always means a real bug, so production can alert on it.

### Wiring (`apps/api/src/core/http/error-handler.ts`, `app.ts`)

`errorHandler` has no decisions of its own: it calls `problemFor`, logs with `request.log` (so the line carries `reqId`, equal to the body's `requestId`), and sends the body. `notFoundHandler` sends the 404 body. `buildApp` registers both, so every module inherits them.

## Alternatives

- **Fastify's default handler:** leaks internal messages; inconsistent shapes.
- **Our own shape** (`{ "error": { "code", "message" } }`, Stripe-like): simple, but not a standard that tools understand.
- **The HTTP status inside the error** (`new AppError(404, …)`, NestJS style): services would know HTTP.
- **A class per kind** (`NotFoundError`, `ConflictError`…): five classes that differ by one field.
- **Errors as return values** (`Result` types, e.g. neverthrow): a new style for the whole codebase.
- **Logging decisions inside the Fastify handler:** split the decisions across two files; moved into `problemFor` so one pure function decides everything.
- **A shared errors package now:** only the API produces errors today. `AppError` moves to `packages/extension-sdk` when extensions with API code need to throw it.

## Why

Nothing internal reaches a caller; every error has one standard shape with a stable code and a request ID that links to the logs; services stay free of HTTP; all decisions sit in one pure, fully tested function.
