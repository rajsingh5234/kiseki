import closeWithGrace from "close-with-grace";

import { type AppConfig, ConfigError, loadConfig } from "#core/config/app-config.ts";

import { buildApp } from "./app.ts";
import { composeModules } from "./composition-root.ts";

const SHUTDOWN_TIMEOUT_MS = 10_000;

function readConfig(): AppConfig {
   try {
      return loadConfig(process.env);
   } catch (error) {
      if (error instanceof ConfigError) {
         console.error(error.message);
         process.exit(1);
      }
      throw error;
   }
}

const config = readConfig();
const app = buildApp(config, composeModules());

closeWithGrace({ delay: SHUTDOWN_TIMEOUT_MS, logger: app.log }, async ({ signal, err }) => {
   if (err) {
      app.log.error({ err }, "crashed: shutting down");
   } else {
      app.log.info({ signal }, "shutting down");
   }
   await app.close();
});

try {
   await app.listen({ host: config.host, port: config.port });
} catch (error) {
   app.log.fatal({ err: error }, "could not start the server");
   process.exit(1);
}
