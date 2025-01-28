import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { hashPassword } from "../../utils/bcrypt";

const register: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/",

    schema: {
      body: Type.Object({
        name: Type.String(),
        email: Type.String(),
        password: Type.String(),
      }),
      response: {
        "2xx": Type.Object({
          data: Type.Object({
            name: Type.String(),
            email: Type.String(),
          }),
        }),
        "5xx": Type.Object({
          error: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const { email, password, name } = request.body;

      try {
        //Check if user exists
        const user = await fastify.prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        //If user exists, return error
        if (user) {
          return reply.send({
            error: "User already exists",
          });
        }

        //Hash password
        const hashedPassword = await hashPassword(password);
        //Create user
        const newUser = await fastify.prisma.user.create({
          data: {
            name: name,
            email: email,
            password: hashedPassword,
          },
        });

        reply.send({
          data: {
            name: newUser.name,
            email: newUser.email,
          },
        });
      } catch (error) {
        reply.code(500).send({
          error: "Internal server error",
        });
      }
    },
  });
};

export default register;
