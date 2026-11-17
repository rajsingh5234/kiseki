import { z } from "zod";

const LOG_LEVELS = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;

const configSchema = z
   .object({
      NODE_ENV: z.enum(["development", "test", "production"]),
      PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
      HOST: z.string().min(1).default("127.0.0.1"),
      LOG_LEVEL: z.enum(LOG_LEVELS).optional(),
   })
   .transform((vars) => ({
      env: vars.NODE_ENV,
      port: vars.PORT,
      host: vars.HOST,
      logLevel: vars.LOG_LEVEL,
   }));

export type AppConfig = Readonly<z.infer<typeof configSchema>>;

export type LogLevel = (typeof LOG_LEVELS)[number];

export class ConfigError extends Error {
   override readonly name = "ConfigError";
}

type Env = Readonly<Record<string, string | undefined>>;

function withoutEmptyValues(env: Env): Env {
   return Object.fromEntries(
      Object.entries(env).map(([name, value]) => [name, value?.trim() === "" ? undefined : value]),
   );
}

export function loadConfig(env: Env): AppConfig {
   const result = configSchema.safeParse(withoutEmptyValues(env));

   if (!result.success) {
      const problems = result.error.issues.map(
         (issue) => `- ${issue.path.join(".")}: ${issue.message}`,
      );
      throw new ConfigError(`Invalid environment:\n${problems.join("\n")}`);
   }

   return Object.freeze(result.data);
}
