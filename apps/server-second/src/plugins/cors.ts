import fp from "fastify-plugin";
import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";

export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true); // Allow the origin
      } else {
        cb(new Error("Not allowed by CORS"), false); // Block the origin
      }
    },
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    exposedHeaders: ["Authorization"],
  });
});
