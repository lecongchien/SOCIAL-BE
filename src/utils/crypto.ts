import { createHash } from "node:crypto";

export function sha256(contetent: string) {
    return createHash("sha256").update(contetent).digest("hex");
}

export function hashPassword(password: string,) {
    return sha256(password + process.env.PASSWORD_SECRET);
}