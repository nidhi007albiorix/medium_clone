import bcrypt from "bcrypt";

const salt_round = 18;
export function hassPassword(password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(
      password,
      salt_round,
      (err: Error | undefined, encrypted: string) => {
        if (err) return reject(err);

        resolve(encrypted);
      }
    );
  });
}

export function matchPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, hash, (err: Error | undefined, same: boolean) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
}
