"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.hassPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt_round = 18;
function hassPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, salt_round, (err, encrypted) => {
            if (err)
                return reject(err);
            resolve(encrypted);
        });
    });
}
exports.hassPassword = hassPassword;
function matchPassword(hash, password) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, hash, (err, same) => {
            if (err)
                return reject(err);
            resolve(same);
        });
    });
}
exports.matchPassword = matchPassword;
