import { randomUUID } from "node:crypto";

export const REQUEST_ID_HEADER = "x-request-id";

const VALID_REQUEST_ID = /^[\w.:-]{1,128}$/;

export function requestIdFrom(header: string | string[] | undefined): string {
   return typeof header === "string" && VALID_REQUEST_ID.test(header) ? header : randomUUID();
}
