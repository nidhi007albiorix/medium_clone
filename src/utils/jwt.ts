import jwt, { VerifyErrors } from "jsonwebtoken";
import { User } from "../entities/User";

const JWT_SECRET = "some-secret";
export async function sign(user: User): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        userName: user.userName,
        email: user.email,
      },
      JWT_SECRET,
      (err: any, encoded: string | undefined) => {
        if (err) return reject(err);
        else {
          resolve(encoded as string);
        }
      }
    );
  });
}

export async function decode(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err: VerifyErrors|null, decoded: any) => {
      if (err) return reject(err);
      else return resolve(decoded);
    });
  });
}
