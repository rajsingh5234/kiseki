import type { FastifyServerOptions } from "fastify";

import type { AppConfig, LogLevel } from "#core/config/app-config.ts";

const DEFAULT_LEVEL: Readonly<Record<AppConfig["env"], LogLevel>> = {
   development: "debug",
   test: "silent",
   production: "info",
};

const SECRET_PATHS = [
   "req.headers.authorization",
   "req.headers.cookie",
   'res.headers["set-cookie"]',
   "password",
   "*.password",
   "token",
   "*.token",
];

export function loggerOptions(config: AppConfig): FastifyServerOptions["logger"] {
   return {
      level: config.logLevel ?? DEFAULT_LEVEL[config.env],
      redact: { paths: SECRET_PATHS, censor: "[REDACTED]" },
   };
}
