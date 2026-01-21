import { Router } from "express";
import {
  loginController,
  registerController,
} from "~/controllers/users.controllers";
import {
  loginValidation,
  registerValidation,
} from "~/middlewares/users.middlewares";

const userRouter = Router();

userRouter.post("/login", loginValidation, loginController);

userRouter.post("/register", registerValidation, registerController);

export default userRouter;
