import fp from "fastify-plugin";
import jwt, { FastifyJWTOptions } from "@fastify/jwt";

/**
 * This plugin adds JWT utilities to the Fastify app
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp<FastifyJWTOptions>(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || "secret",
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });
});
