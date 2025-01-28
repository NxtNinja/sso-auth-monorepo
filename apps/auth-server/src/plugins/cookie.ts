import fp from "fastify-plugin";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifyCookieOptions>(async (fastify) => {
  fastify.register(cookie, {
    secret: process.env.COOKIE_SECRET || "supersecretcookie",
    parseOptions: {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000,
    },
  });
});
