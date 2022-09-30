"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Article_1 = require("./entities/Article");
const User_1 = require("./entities/User");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello word");
});
const port = 3232;
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "medium_user",
    password: "medium_clone",
    database: "medium_clone",
    entities: [Article_1.Article, User_1.User],
    synchronize: true,
    logging: true,
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource.initialize()
            .then(() => {
            console.log("Data Source has been initialized!");
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        app.listen(port, () => {
            console.log("Server started at :", port);
        });
    });
}
start();
