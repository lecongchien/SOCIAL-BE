import jwt, { SignOptions } from "jsonwebtoken";

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: "HS256" },
}: {
  payload: object;
  privateKey?: string;
  options?: SignOptions;
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options || {}, (err, token) => {
      if (err || !token) {
        return reject(err);
      }
      resolve(token as string);
    });
  });
};
