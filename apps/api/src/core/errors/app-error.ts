/** What went wrong, in words the HTTP layer maps to a status code (services never pick status codes). */
export type ErrorKind = "invalid" | "unauthenticated" | "forbidden" | "not_found" | "conflict";

export type AppErrorOptions = {
   readonly kind: ErrorKind;
   /** Stable, machine-readable name, e.g. "TARGET_NOT_FOUND". Never changes once released. */
   readonly code: Uppercase<string>;
   /** Human-readable and safe to show to the user. */
   readonly message: string;
   /** The original error, if one was wrapped. Goes to the logs only, never to the user. */
   readonly cause?: unknown;
};

/**
 * An expected problem whose message is safe to show to the user, e.g. "Target not found".
 * Anything thrown that is not an AppError is treated as a bug: the user gets a generic 500.
 */
export class AppError extends Error {
   override readonly name = "AppError";
   readonly kind: ErrorKind;
   readonly code: Uppercase<string>;

   constructor({ kind, code, message, cause }: AppErrorOptions) {
      super(message, cause === undefined ? undefined : { cause });
      this.kind = kind;
      this.code = code;
   }
}
