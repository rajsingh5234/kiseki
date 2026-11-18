import type { FastifyReply, FastifyRequest } from "fastify";

import type { HealthService } from "./health.service.ts";

const SERVICE_UNAVAILABLE = 503;

const OK = { status: "ok" } as const;
const UNAVAILABLE = { status: "unavailable" } as const;

type HealthBody = typeof OK | typeof UNAVAILABLE;

export class HealthController {
   private readonly service: HealthService;

   constructor(service: HealthService) {
      this.service = service;
   }

   live = (): HealthBody => OK;

   ready = async (request: FastifyRequest, reply: FastifyReply): Promise<HealthBody> => {
      const { ready, failing } = await this.service.checkReadiness();
      if (ready) {
         return OK;
      }
      request.log.warn({ failing }, "not ready: health checks failed");
      reply.code(SERVICE_UNAVAILABLE);
      return UNAVAILABLE;
   };
}
