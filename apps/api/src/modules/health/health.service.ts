import type { IHealthCheck, Readiness } from "./health.types.ts";

export class HealthService {
   private readonly checks: readonly IHealthCheck[];

   constructor(checks: readonly IHealthCheck[]) {
      this.checks = checks;
   }

   async checkReadiness(): Promise<Readiness> {
      const results = await Promise.all(
         this.checks.map(async (check) => ({ name: check.name, healthy: await passes(check) })),
      );
      const failing = results.filter((result) => !result.healthy).map((result) => result.name);
      return { ready: failing.length === 0, failing };
   }
}

async function passes(check: IHealthCheck): Promise<boolean> {
   try {
      return await check.check();
   } catch {
      return false;
   }
}
