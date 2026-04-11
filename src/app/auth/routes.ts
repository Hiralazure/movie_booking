import express from "express";
import { AuthenticationController } from "./controller";
import { authenticationMiddleware } from "./middleware/auth.middleware";
const authController = new AuthenticationController();
export const authRouter = express.Router();

authRouter.post("/signup", authController.handleSign.bind(authController));
authRouter.post("/signin", authController.handleSignin.bind(authController));

authRouter.get("/me", authController.getUserDetails.bind(authController));
