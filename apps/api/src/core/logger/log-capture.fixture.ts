import { Writable } from "node:stream";

export type LogCapture = {
   /** Give this to the logger in place of the terminal. */
   readonly stream: Writable;
   /** Every log line written so far, as raw JSON text. */
   readonly lines: string[];
   /** The same lines, parsed. */
   entries(): unknown[];
};

export function logCapture(): LogCapture {
   const lines: string[] = [];
   const stream = new Writable({
      write(chunk: Buffer, _encoding, done) {
         lines.push(chunk.toString());
         done();
      },
   });
   return { stream, lines, entries: () => lines.map((line): unknown => JSON.parse(line)) };
}
