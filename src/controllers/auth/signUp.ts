import { REASON_CODES } from "consts";
import { UserEntity } from "@/entities";
import { DuplicateError, CustomError } from "@/errors";
import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { userService } from "services";
import { encryptPassword, errorHandlerWrapper } from "@/utils";
import { getUserFromEmail } from "@/services/user.service";
import path from "path";

export const signUpValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").optional().isEmail().withMessage("Email type is not valid"),
    body("password")
      .isLength({ min: 6, max: 30 })
      .withMessage("The length of password must be between 6 and 30."),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
};
type ReqQuery = unknown;

export const signUpHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { name, email, avatar, password } = req.body; 

  const user: UserEntity = await getUserFromEmail(email);

  if (user) {
    throw new DuplicateError("This Email is already exists.");
  }

  const hashPassword: string = await encryptPassword(password);

  const newUser: UserEntity = await userService.createUser({
    name: name,
    email: email,
    avatar: avatar ? avatar : `${path.join(__dirname, '../../../','public/upload/img/default.png')}`,
    password: hashPassword,
  });

  res.status(httpStatus.OK).json(newUser);
};

export const signUp = errorHandlerWrapper(signUpHandler);
