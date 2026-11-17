import { type AppConfig, loadConfig } from "./app-config.ts";

const TEST_ENV = { NODE_ENV: "test" };

export function testConfig(overrides: Partial<AppConfig> = {}): AppConfig {
   return Object.freeze({ ...loadConfig(TEST_ENV), ...overrides });
}
