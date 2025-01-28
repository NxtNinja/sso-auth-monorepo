import { FastifyPluginAsync } from "fastify";

const logout: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/",
    { preValidation: [fastify.authenticate] }, // Ensure user is authenticated before logout
    async function (request, reply) {
      // Clear the JWT token from the cookie
      reply.clearCookie("token");

      return { message: "You have been logged out successfully." };
    }
  );
};

export default logout;
