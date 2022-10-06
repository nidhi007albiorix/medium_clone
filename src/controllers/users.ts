import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { hassPassword, matchPassword } from "../utils/password";
import { sign } from "../utils/jwt";
import { sanitizeFeilds } from "../utils/security";

interface UserSignUpData {
  userName: string;
  email: string;
  password: string;
}
interface UserLoginData {
  email: string;
  password: string;
}

export async function createUser(data: UserSignUpData): Promise<User> {
  const repo = getRepository(User);
  const existingUser = await repo.findOne({ where: { email: data.email } });
  if (existingUser) throw new Error("User already exists");
  try {
    const user = new User();
    user.userName = data.userName;
    user.email = data.email;
    user.password = await hassPassword(data.password);
    user.token = await sign(user);
    await repo.insert(user);

    return sanitizeFeilds(user);
  } catch (error) {
    throw error;
  }
}

export async function loginUser(data: UserLoginData): Promise<User> {
  const repo = getRepository(User);
  const existingUser = await repo.findOne({ where: { email: data.email } });
  if (!existingUser) throw new Error("User does not exist");
  try {
    const user = new User();
    user.email = data.email;
    const passwordCheck = matchPassword(existingUser.password!, data.password);
    if (!passwordCheck) throw Error("Wrong password");
    user.token = await sign(user);

    return sanitizeFeilds(user);
  } catch (error) {
    throw error;
  }
}
export async function getUserByEmail(email: string): Promise<User> {
  const repo = getRepository(User);

  try {
    const user = await repo.findOne({ where: { email: email } });
    if (!user) throw new Error("User does not exist");

    return sanitizeFeilds(user);
  } catch (error) {
    throw error;
  }
}
