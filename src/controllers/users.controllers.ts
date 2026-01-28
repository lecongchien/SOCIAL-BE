import { NextFunction, Request, Response } from "express";
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const result = await userService.register({ email, password });
    return res.json({
      message: "Register successful",
      result,
    });
  } catch (error) {
    next(error);
  }
};
