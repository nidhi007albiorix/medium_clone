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
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function auth(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(" ");
        if (!authHeader)
            return res.status(401).json({
                errors: { body: ['Authorization failed', 'No Authorization header'] }
            });
        if (authHeader[0] != 'Token')
            return res.status(401).json({
                errors: { body: ['Authorization failed', 'Token is missing'] }
            });
        const token = authHeader[1];
        try {
            const loginUser = yield (0, jsonwebtoken_1.decode)(token);
            if (!loginUser)
                throw new Error("No user found in token");
            req.user = loginUser;
            return next();
        }
        catch (error) {
            return res.status(401).json({
                errors: { body: ['Authorization failed'] }
            });
        }
    });
}
exports.auth = auth;
