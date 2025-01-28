import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      return { message: "You are authorized to web second" };
    }
  );
};

export default root;
