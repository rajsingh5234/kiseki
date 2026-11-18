import type { FastifyPluginCallback, RouteShorthandOptions } from "fastify";

import type { HealthController } from "./health.controller.ts";

const QUIET: RouteShorthandOptions = { logLevel: "warn" };

export function healthRoutes(controller: HealthController): FastifyPluginCallback {
   return (app, _options, done) => {
      app.addHook("onRequest", (_request, reply, next) => {
         reply.header("cache-control", "no-store");
         next();
      });

      app.get("/live", QUIET, controller.live);
      app.get("/ready", QUIET, controller.ready);

      done();
   };
}
