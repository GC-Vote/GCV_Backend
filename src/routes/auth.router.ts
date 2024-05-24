import { authController } from "@/controllers";
import express from "express";

const authRouter = express.Router();

authRouter.post(
  "/signUp",
  authController.signUpValidator(),
  authController.signUp
);

authRouter.post(
  "/signIn",
  authController.signInValidator(),
  authController.signIn
);

export default authRouter;
