import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import userService from "~/services/users.services";
import { validate } from "~/utils/validation";

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

export const registerValidation = validate(
  checkSchema({
    name: {
      notEmpty: true,
      trim: true,
      isString: true,
      isLength: { options: { min: 6, max: 100 } },
      errorMessage: "Name must be at least 6 characters long",
    },
    email: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const exists = await userService.checkEmailExists(value);
          if (exists) {
            throw new Error("E-mail already in use");
          }
          return true;
        },
      },
      // Here you can add a check to see if the email already exists in your database
      errorMessage: "Invalid email address",
    },
    password: {
      notEmpty: true,
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
      },
      isLength: { options: { min: 6, max: 50 } },
      errorMessage: "Password must be at least 6 characters long",
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
      },
      isLength: { options: { min: 6, max: 50 } },
      errorMessage: "Password must be at least 6 characters long",
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
          }
          return true;
        },
      },
    },
    date_of_birth: {
      isISO8601: { options: { strict: true, strictSeparator: true } },
    },
  }),
);
