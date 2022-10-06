import { Router, Request, Response } from "express";
import { getUserByEmail } from "../controllers/users";
import { auth } from "../middleware/auth";

const route = Router();
route.get("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail((req as any).user.email);
    if (!user) throw new Error("No such user found");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(404).json({
      error: { body: ["No such user found"] },
    });
  }
});

export const userRoute = route;
