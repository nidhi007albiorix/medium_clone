"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFeilds = void 0;
function sanitizeFeilds(user) {
    if (user.password)
        delete user.password;
    return user;
}
exports.sanitizeFeilds = sanitizeFeilds;
