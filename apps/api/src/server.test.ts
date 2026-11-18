import { type ChildProcess, spawn } from "node:child_process";
import { EventEmitter, once } from "node:events";
import { createServer, type Server } from "node:net";
import { join } from "node:path";

import { describe, expect, it, onTestFinished } from "vitest";

const SERVER_FILE = join(import.meta.dirname, "server.ts");
const HOST = "127.0.0.1";

type Run = {
   readonly child: ChildProcess;
   /** Everything the server printed so far (stdout and stderr). */
   readonly output: () => string;
   /** Resolves once the server has printed `text`; rejects if it exits first. */
   readonly printed: (text: string) => Promise<void>;
   readonly exitCode: Promise<number | null>;
};

function runServer(env: Record<string, string>): Run {
   const child = spawn(process.execPath, [SERVER_FILE], { env });
   const events = new EventEmitter();
   let output = "";
   const onOutput = (chunk: Buffer): void => {
      output += chunk.toString();
      events.emit("output");
   };
   child.stdout.on("data", onOutput);
   child.stderr.on("data", onOutput);

   const exitCode = new Promise<number | null>((resolve) => {
      child.once("exit", (code) => resolve(code));
   });
   onTestFinished(() => {
      if (child.exitCode === null) child.kill("SIGKILL");
   });

   const printed = (text: string): Promise<void> =>
      new Promise((resolve, reject) => {
         const check = (): void => {
            if (output.includes(text)) resolve();
         };
         events.on("output", check);
         child.once("exit", () =>
            reject(new Error(`exited before printing "${text}":\n${output}`)),
         );
         check();
      });

   return { child, output: () => output, printed, exitCode };
}

async function occupyFreePort(): Promise<{ server: Server; port: number }> {
   const server = createServer();
   server.listen(0, HOST);
   await once(server, "listening");
   const address = server.address();
   if (address === null || typeof address === "string") throw new Error("no port assigned");
   onTestFinished(() => {
      server.close();
   });
   return { server, port: address.port };
}

async function freePort(): Promise<number> {
   const { server, port } = await occupyFreePort();
   server.close();
   await once(server, "close");
   return port;
}

describe("server", { timeout: 15_000 }, () => {
   describe("happy path", () => {
      it.each(["SIGTERM", "SIGINT"] as const)(
         "starts, serves requests, and exits cleanly on %s",
         async (signal) => {
            const port = await freePort();
            const run = runServer({
               NODE_ENV: "test",
               HOST,
               PORT: String(port),
               LOG_LEVEL: "info",
            });
            await run.printed("Server listening");

            const response = await fetch(`http://${HOST}:${port}/health/live`);
            run.child.kill(signal);

            expect(response.status).toBe(200);
            await expect(run.exitCode).resolves.toBe(0);
            expect(run.output()).toContain(`"signal":"${signal}"`);
         },
      );
   });

   describe("sad path", () => {
      it("exits with code 1 and a readable message when the config is invalid", async () => {
         const run = runServer({ NODE_ENV: "test", PORT: "abc" });

         await expect(run.exitCode).resolves.toBe(1);
         expect(run.output()).toContain("Invalid environment:\n- PORT:");
         expect(run.output()).not.toContain("    at ");
      });

      it("exits with code 1 when the port is already taken", async () => {
         const { port } = await occupyFreePort();

         const run = runServer({ NODE_ENV: "test", HOST, PORT: String(port), LOG_LEVEL: "fatal" });

         await expect(run.exitCode).resolves.toBe(1);
         expect(run.output()).toContain("EADDRINUSE");
      });
   });
});
