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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.loginUser = exports.createUser = void 0;
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const security_1 = require("../utils/security");
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = (0, typeorm_1.getRepository)(User_1.User);
        const existingUser = yield repo.findOne({ where: { email: data.email } });
        if (existingUser)
            throw new Error("User already exists");
        try {
            const user = new User_1.User();
            user.userName = data.userName;
            user.email = data.email;
            user.password = yield (0, password_1.hassPassword)(data.password);
            user.token = yield (0, jwt_1.sign)(user);
            yield repo.insert(user);
            return (0, security_1.sanitizeFeilds)(user);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createUser = createUser;
function loginUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = (0, typeorm_1.getRepository)(User_1.User);
        const existingUser = yield repo.findOne({ where: { email: data.email } });
        if (!existingUser)
            throw new Error("User does not exist");
        try {
            const user = new User_1.User();
            user.email = data.email;
            const passwordCheck = (0, password_1.matchPassword)(existingUser.password, data.password);
            if (!passwordCheck)
                throw Error("Wrong password");
            user.token = yield (0, jwt_1.sign)(user);
            return (0, security_1.sanitizeFeilds)(user);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.loginUser = loginUser;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const repo = (0, typeorm_1.getRepository)(User_1.User);
        try {
            const user = yield repo.findOne({ where: { email: email } });
            if (!user)
                throw new Error("User does not exist");
            return (0, security_1.sanitizeFeilds)(user);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getUserByEmail = getUserByEmail;
