import express, { Request, Response } from "express";
import { createConnection, DataSource } from "typeorm";
import cors from "cors";
import { Article } from "./entities/Article";
import { Comment } from "./entities/Comment";
import { User } from "./entities/User";
import { articleRoute } from "./routes/articles";
import { commentRoute } from "./routes/comments";
import { userRoute } from "./routes/user";
import { usersRoute } from "./routes/users";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello word");
});
app.use("/api/users", usersRoute);
app.use("/api/user", userRoute);
app.use("/api/articles", articleRoute);
app.use("/api/comments", commentRoute);

const port = 3232;
async function start() {
  await createConnection({
    type: "postgres",
    host: process.env.HOST as string,
    port: Number(process.env.PORT),
    username: process.env.USERNAMEDB as string || undefined,
    password: process.env.PASSWORD as string || undefined,
    database: process.env.DATABASE as string || undefined,
    entities: [Article, User, Comment],
    synchronize: true,
    logging: true,
  });
  app.listen(3232, () => {
    console.log("Server started on http://localhost:3232");
  });
}

start();
