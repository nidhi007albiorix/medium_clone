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
exports.articleRoute = void 0;
const express_1 = require("express");
const articles_1 = require("../controllers/articles");
const auth_1 = require("../middleware/auth");
const route = (0, express_1.Router)();
exports.articleRoute = route;
// list articles
route.get("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield (0, articles_1.getAllArticles)();
        return res.status(201).json(articles);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not find articles",
            },
        });
    }
}));
// feed articles
route.get("/feeds", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield (0, articles_1.getFeedArticles)(req.user.email);
        return res.status(201).json(article);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not find articles",
            },
        });
    }
}));
// article by slug
route.get("/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield (0, articles_1.getArticleBySlug)(req.params.slug);
        return res.status(201).json(article);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not find articles",
            },
        });
    }
}));
// create an article
route.post("/", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield (0, articles_1.createArticle)(req.body.article, req.user.email);
        return res.status(201).json(article);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not create article",
            },
        });
    }
}));
// update an article
route.patch("/:slug", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield (0, articles_1.updateArticle)(req.params.slug, req.body.article);
        console.log(article);
        return res.status(201).json(article);
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not update article",
            },
        });
    }
}));
// delete an article
route.delete("/:slug", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, articles_1.deleteArticle)(req.params.slug);
        return res.status(201).json({ message: "Successfully deleted" });
    }
    catch (error) {
        return res.status(422).send({
            errors: {
                body: "Could not delete article",
            },
        });
    }
}));
