import Fastify, { type FastifyInstance } from "fastify";

import type { AppConfig } from "#core/config/app-config.ts";
import type { ApiModule } from "#core/http/api-module.ts";
import { errorHandler, notFoundHandler } from "#core/http/error-handler.ts";
import { REQUEST_ID_HEADER, requestIdFrom } from "#core/http/request-id.ts";
import { loggerOptions } from "#core/logger/logger-options.ts";

const REQUEST_TIMEOUT_MS = 30_000;

export function buildApp(config: AppConfig, modules: readonly ApiModule[]): FastifyInstance {
   const app = Fastify({
      logger: loggerOptions(config),
      genReqId: (request) => requestIdFrom(request.headers[REQUEST_ID_HEADER]),
      requestTimeout: REQUEST_TIMEOUT_MS,
   });

   app.addHook("onRequest", (request, reply, done) => {
      reply.header(REQUEST_ID_HEADER, request.id);
      done();
   });

   app.setErrorHandler(errorHandler);
   app.setNotFoundHandler(notFoundHandler);

   for (const module of modules) {
      app.register(module.routes, { prefix: module.prefix });
   }

   return app;
}
