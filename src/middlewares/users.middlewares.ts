import { Request, Response, NextFunction } from "express";

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid username or password" });
  }
  next();
};
