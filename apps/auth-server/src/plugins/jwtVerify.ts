import fp from "fastify-plugin";

/**
 * This plugin adds an `authenticate` decorator to verify JWT tokens
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp(async (fastify) => {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify(); // Verify the JWT token
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
