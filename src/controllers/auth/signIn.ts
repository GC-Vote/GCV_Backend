import { UserEntity } from "@/entities";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { userService } from "@/services";
import { comparePassword, encryptPassword, errorHandlerWrapper } from "@/utils";
import { CustomError } from "@/errors";
import jwt from "jsonwebtoken";
import { JWT_TOKEN, JWT_EXPIRATION_TIME } from "@/config";

export const signInValidator = () => {
  return [
    body("email").notEmpty().withMessage("email is required"),
    body("email").optional().isEmail().withMessage("email type is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email: string;
  password: string;
};

type ReqQuery = unknown;

export const signInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;

  const user: UserEntity = await userService.getUserFromEmail(email);

  const validatePassword: Boolean = await comparePassword(
    password,
    user.password
  );

  if (!validatePassword) {
    throw new CustomError("Password is not correct.", httpStatus.BAD_REQUEST);
  }

  const token: string = jwt.sign({ email }, JWT_TOKEN, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  res.status(httpStatus.OK).json({ token: token });
};

export const signIn = errorHandlerWrapper(signInHandler);
