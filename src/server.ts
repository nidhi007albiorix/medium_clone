import express, { Request, Response } from "express";
import { DataSource } from "typeorm";
import { Article } from "./entities/Article";
import { User } from "./entities/User";
const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello word");
});

const port = 3232;
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "medium_user",
  password: "medium_clone",
  database: "medium_clone",
  entities:[Article,User],
  synchronize: true,
  logging: true,
});
async function start() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
  app.listen(port, () => {
    console.log("Server started at :", port);
  });
}

start();
