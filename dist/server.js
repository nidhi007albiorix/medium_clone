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
const user_1 = require("./routes/user");
const users_1 = require("./routes/users");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello word");
});
app.use("/api/users", users_1.usersRoute);
app.use("/api/user", user_1.userRoute);
const port = 3232;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)({
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
        app.listen(3232, () => {
            console.log("Server started on http://localhost:3232");
        });
    });
}
start();
