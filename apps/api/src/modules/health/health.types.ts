/**
 * One thing the API needs before it can serve users (e.g. the database).
 * Any part of the app can supply one; the health module runs them all.
 */
export interface IHealthCheck {
   /** Short label used in logs when the check fails, e.g. "database". */
   readonly name: string;
   /** Resolves `true` when healthy. Resolving `false` or throwing both mean "not ready". */
   check(): Promise<boolean>;
}

export type Readiness = {
   readonly ready: boolean;
   /** Names of the checks that failed; empty when ready. */
   readonly failing: readonly string[];
};
