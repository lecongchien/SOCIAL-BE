import { Router } from "express";
import {
  loginController,
  registerController,
} from "~/controllers/users.controllers";
import {
  loginValidation,
  registerValidation,
} from "~/middlewares/users.middlewares";
import { wrapRequestHandler } from "~/utils/handlers";

const userRouter = Router();

userRouter.post("/login", loginValidation, loginController);

userRouter.post(
  "/register",
  registerValidation,
  wrapRequestHandler(registerController),
);

export default userRouter;
