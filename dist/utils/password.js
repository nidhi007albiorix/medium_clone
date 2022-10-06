"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.hassPassword = void 0;
const bcrypt = require('bcrypt');
const salt_round = 18;
function hassPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt_round, (err, encrypted) => {
            if (err)
                return reject(err);
            resolve(encrypted);
        });
    });
}
exports.hassPassword = hassPassword;
function matchPassword(hash, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
            if (err)
                return reject(err);
            resolve(same);
        });
    });
}
exports.matchPassword = matchPassword;
