"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cors_1 = __importDefault(require("cors"));
const Article_1 = require("./entities/Article");
const Comment_1 = require("./entities/Comment");
const User_1 = require("./entities/User");
const articles_1 = require("./routes/articles");
const comments_1 = require("./routes/comments");
const user_1 = require("./routes/user");
const users_1 = require("./routes/users");
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.get("/", (req, res) => {
    res.send("Hello word");
});
app.use("/api/users", users_1.usersRoute);
app.use("/api/user", user_1.userRoute);
app.use("/api/articles", articles_1.articleRoute);
app.use("/api/comments", comments_1.commentRoute);
const port = 3232;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            host: process.env.HOST,
            port: Number(process.env.PORT),
            username: process.env.USERNAMEDB || undefined,
            password: process.env.PASSWORD || undefined,
            database: process.env.DATABASE || undefined,
            entities: [Article_1.Article, User_1.User, Comment_1.Comment],
            synchronize: true,
            logging: true,
        });
        app.listen(3232, () => {
            console.log("Server started on http://localhost:3232");
        });
    });
}
start();
