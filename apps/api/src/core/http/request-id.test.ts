import { describe, expect, it } from "vitest";

import { UUID } from "./request-id.fixture.ts";
import { requestIdFrom } from "./request-id.ts";

describe("requestIdFrom", () => {
   describe("happy path", () => {
      it.each(["abc-123", "trace_01.span:02", "3f2b9c1e-8a4d-4f6b-9c2e-1d7a5b8e0f34"])(
         "keeps a valid incoming ID: %s",
         (incoming) => {
            expect(requestIdFrom(incoming)).toBe(incoming);
         },
      );

      it("keeps an ID of exactly 128 characters", () => {
         const longest = "a".repeat(128);

         expect(requestIdFrom(longest)).toBe(longest);
      });

      it("makes a new UUID when no ID is sent", () => {
         expect(requestIdFrom(undefined)).toMatch(UUID);
      });

      it("makes a different ID every time", () => {
         expect(requestIdFrom(undefined)).not.toBe(requestIdFrom(undefined));
      });
   });

   describe("sad path", () => {
      it.each([
         ["empty", ""],
         ["too long (129 characters)", "a".repeat(129)],
         ["a space", "abc 123"],
         ["a newline (fake log line)", 'abc\n{"level":60,"msg":"hacked"}'],
         ["quotes", 'abc"123'],
         ["the header sent twice", "abc, def"],
      ])("replaces an ID with %s by a new UUID", (_reason, incoming) => {
         expect(requestIdFrom(incoming)).toMatch(UUID);
      });

      it("replaces a list of values by a new UUID", () => {
         expect(requestIdFrom(["abc", "def"])).toMatch(UUID);
      });
   });
});
