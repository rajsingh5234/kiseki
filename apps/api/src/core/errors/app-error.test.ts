import { describe, expect, it } from "vitest";

import { AppError } from "./app-error.ts";

describe("AppError", () => {
   describe("happy path", () => {
      it("keeps the kind, code and message", () => {
         const error = new AppError({
            kind: "not_found",
            code: "TARGET_NOT_FOUND",
            message: "Target not found",
         });

         expect(error).toMatchObject({
            kind: "not_found",
            code: "TARGET_NOT_FOUND",
            message: "Target not found",
         });
      });

      it("is a real Error, named AppError in logs", () => {
         const error = new AppError({
            kind: "conflict",
            code: "EMAIL_TAKEN",
            message: "Email taken",
         });

         expect(error).toBeInstanceOf(Error);
         expect(error).toBeInstanceOf(AppError);
         expect(error.name).toBe("AppError");
         expect(error.stack).toContain("AppError: Email taken");
      });

      it("keeps the original error as its cause", () => {
         const original = new Error(
            'duplicate key value violates unique constraint "users_email_key"',
         );

         const error = new AppError({
            kind: "conflict",
            code: "EMAIL_TAKEN",
            message: "Email taken",
            cause: original,
         });

         expect(error.cause).toBe(original);
      });
   });

   describe("sad path", () => {
      it("does not treat a plain Error (a bug) as an AppError", () => {
         const bug = new Error("Cannot read properties of undefined");

         expect(bug).not.toBeInstanceOf(AppError);
      });

      it("has no cause when none is given", () => {
         const error = new AppError({ kind: "invalid", code: "BAD_INPUT", message: "Bad input" });

         expect(Object.hasOwn(error, "cause")).toBe(false);
      });
   });
});
