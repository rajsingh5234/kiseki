import type { FastifyReply, FastifyRequest } from "fastify";

import {
   PROBLEM_CONTENT_TYPE,
   type ProblemDetails,
   problemFor,
   routeNotFoundProblem,
} from "./problem-details.ts";

/** Turns anything a route throws into a Problem Details response. All decisions live in problemFor. */
export function errorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply): void {
   const { body, log } = problemFor(error, request.id);
   request.log[log.level]({ code: body.code, err: log.err }, log.message);
   send(reply, body);
}

/** Answers URLs that match no route. */
export function notFoundHandler(request: FastifyRequest, reply: FastifyReply): void {
   send(reply, routeNotFoundProblem(request.id));
}

function send(reply: FastifyReply, body: ProblemDetails): void {
   reply.code(body.status).type(PROBLEM_CONTENT_TYPE).send(body);
}
