import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { comparePasswords } from "../../utils/bcrypt";
import * as jwt from "jsonwebtoken";

const login: FastifyPluginAsyncTypebox = async (
  fastify,
  opts
): Promise<void> => {
  fastify.route({
    method: "POST",

    url: "/",

    schema: {
      body: Type.Object({
        email: Type.String(),
        password: Type.String(),
      }),
      response: {
        "2xx": Type.Object({
          data: Type.Object({
            message: Type.String(),
            token: Type.String(),
          }),
        }),
        "5xx": Type.Object({
          error: Type.String(),
        }),
      },
    },

    handler: async (request, reply) => {
      const { email, password } = request.body;

      try {
        //Check if user exists
        const user = await fastify.prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        //If user does not exists, return error
        if (!user) {
          return reply.send({
            error: "User does not exist",
          });
        }

        //Check if password is correct
        const isPasswordCorrect = await comparePasswords(
          password,
          user.password
        );
        if (!isPasswordCorrect) {
          reply.send({
            error: "Incorrect password",
          });
        }
        //If password is correct, return token
        const token = await jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "secret",
          {
            expiresIn: "1h",
          }
        );

        reply.setCookie("token", token);

        reply.send({
          data: {
            message: "Login successful",
            token: token,
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

export default login;
