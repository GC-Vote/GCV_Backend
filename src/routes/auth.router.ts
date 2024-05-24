import { authController } from "@/controllers";
import { signUpVerifyHandler, signUpVerifyValidator } from "@/controllers/auth/signUp.verify";
import express from "express";


const authRouter = express.Router();

// authRouter.get("/", (req, res) => res.send("AuthRouter is working"));

authRouter.post(
    '/signUp',
    authController.signUpValidator(),
    authController.signUp
)

authRouter.post(
    '/signUpVerify',
    signUpVerifyValidator(),
    signUpVerifyHandler    
)

export default authRouter;