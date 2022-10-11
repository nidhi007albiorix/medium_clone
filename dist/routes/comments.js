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
exports.commentRoute = void 0;
const express_1 = require("express");
const comments_1 = require("../controllers/comments");
const auth_1 = require("../middleware/auth");
const route = (0, express_1.Router)();
exports.commentRoute = route;
// // article comments
route.get("/:slug", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, comments_1.getArticleComment)(req.params.slug);
        return res.status(201).json(comments);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not find comments",
            },
        });
    }
}));
// post comments
route.post("/:slug", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield (0, comments_1.createComment)(req.body.comment, req.user.email, req.params.slug);
        return res.status(201).json(comment);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not create comment",
            },
        });
    }
}));
route.patch("/:id", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield (0, comments_1.updateComment)(req.params.id, req.body.comment);
        return res.status(201).json(comment);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not update comment",
            },
        });
    }
}));
// delete an comment
route.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, comments_1.deleteComment)(req.params.id);
        return res.status(201).json({ message: "Successfully deleted" });
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not delete comment",
            },
        });
    }
}));
