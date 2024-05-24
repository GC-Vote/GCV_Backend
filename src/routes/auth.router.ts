import { authController } from "@/controllers";
import express from "express";


const authRouter = express.Router();

// authRouter.get("/", (req, res) => res.send("AuthRouter is working"));

authRouter.post(
    '/signUp',
    authController.signUpValidator(),
    authController.signUp
)

export default authRouter;