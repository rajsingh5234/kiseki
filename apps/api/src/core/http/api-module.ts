import type { FastifyPluginCallback } from "fastify";

/** What every module gives the app: its routes and the URL they live under. */
export type ApiModule = {
   /** URL prefix for all the module's routes, e.g. "/health". */
   readonly prefix: string;
   /** A Fastify plugin that adds the module's routes. */
   readonly routes: FastifyPluginCallback;
};
