import express from "express";
import { authRouter } from "./auth/routes";
import { authenticationMiddleware } from "./auth/middleware/auth.middleware";
import { movieRouter } from "./movies/routes";
export function createApplication() {
  const app = express();
  app.use(express.json());
  app.use(authenticationMiddleware);
  app.use("/auth", authRouter);
  app.use("/movie", movieRouter);
  return app;
}
