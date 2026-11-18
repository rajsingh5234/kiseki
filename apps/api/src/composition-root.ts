import type { ApiModule } from "#core/http/api-module.ts";
import { createHealthModule } from "#modules/health/index.ts";

export function composeModules(): readonly ApiModule[] {
   return [createHealthModule({ checks: [] })];
}
