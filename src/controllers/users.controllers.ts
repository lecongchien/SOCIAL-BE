import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { RegisterReqBody } from "~/model/requests/User.requests";
import userService from "~/services/users.services";

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email === "admin" && password === "password") {
    res.json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
};

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
) => {
  const result = await userService.register(req.body);
  return res.json({
    message: "Register successful",
    result,
  });
};
