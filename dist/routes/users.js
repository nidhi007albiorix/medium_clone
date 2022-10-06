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
exports.usersRoute = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
const route = (0, express_1.Router)();
route.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_1.createUser)({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not create user"
            }
        });
    }
}));
route.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_1.loginUser)({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Login Failed"
            }
        });
    }
}));
exports.usersRoute = route;
