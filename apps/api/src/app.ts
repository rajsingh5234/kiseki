import Fastify, { type FastifyInstance } from "fastify";

import type { AppConfig } from "#core/config/app-config.ts";
import { REQUEST_ID_HEADER, requestIdFrom } from "#core/http/request-id.ts";
import { loggerOptions } from "#core/logger/logger-options.ts";

const REQUEST_TIMEOUT_MS = 30_000;

export function buildApp(config: AppConfig): FastifyInstance {
   const app = Fastify({
      logger: loggerOptions(config),
      genReqId: (request) => requestIdFrom(request.headers[REQUEST_ID_HEADER]),
      requestTimeout: REQUEST_TIMEOUT_MS,
   });

   app.addHook("onRequest", (request, reply, done) => {
      reply.header(REQUEST_ID_HEADER, request.id);
      done();
   });

   return app;
}
