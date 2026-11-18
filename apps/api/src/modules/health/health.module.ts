import type { ApiModule } from "#core/http/api-module.ts";

import { HealthController } from "./health.controller.ts";
import { healthRoutes } from "./health.routes.ts";
import { HealthService } from "./health.service.ts";
import type { IHealthCheck } from "./health.types.ts";

export type HealthModuleDeps = {
   readonly checks: readonly IHealthCheck[];
};

export function createHealthModule({ checks }: HealthModuleDeps): ApiModule {
   const service = new HealthService(checks);
   const controller = new HealthController(service);
   return { prefix: "/health", routes: healthRoutes(controller) };
}
