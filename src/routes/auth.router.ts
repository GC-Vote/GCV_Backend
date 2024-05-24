import { authController } from "@/controllers";
import { signUpVerifyHandler, signUpVerifyValidator } from "@/controllers/auth/signUp.verify";
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

authRouter.post(
    '/signUpVerify',
    signUpVerifyValidator(),
    signUpVerifyHandler    
)

export default authRouter;
