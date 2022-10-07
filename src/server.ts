import express, { Request, Response } from "express";
import { createConnection, DataSource } from "typeorm";
import { Article } from "./entities/Article";
import { Comment } from "./entities/Comment";
import { User } from "./entities/User";
import { articleRoute } from "./routes/articles";
import { commentRoute } from "./routes/comments";
import { userRoute } from "./routes/user";
import { usersRoute } from "./routes/users";
const app = express();
app.use(express.json());
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
    host: "localhost",
    port: 5432,
    username: "medium_user",
    password: "medium_clone",
    database: "medium_clone",
    entities:[Article,User,Comment],
    synchronize: true,
    logging: true,
  });
  app.listen(3232, () => {
    console.log("Server started on http://localhost:3232");
  });
}

start();
