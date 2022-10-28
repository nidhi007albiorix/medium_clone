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
exports.getArticleBySlug = exports.getFeedArticles = exports.getAllArticles = exports.deleteArticle = exports.updateArticle = exports.createArticle = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entities/Article");
const User_1 = require("../entities/User");
const security_1 = require("../utils/security");
const slugify_1 = require("../utils/slugify");
function createArticle(data, email) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.title)
            throw new Error("Article title absent");
        if (!data.description)
            throw new Error("Article description absent");
        if (!data.body)
            throw new Error("Article body absent");
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        const userRepo = (0, typeorm_1.getRepository)(User_1.User);
        try {
            const user = yield userRepo.findOne({ where: { email: email } });
            if (!user)
                throw new Error("User not found");
            const article = new Article_1.Article();
            (article.slug = (0, slugify_1.slugify)(data.title)),
                (article.title = data.title),
                (article.description = data.description),
                (article.body = data.body),
                // article.tags= data.tags,
                (article.author = (0, security_1.sanitizeFeilds)(user));
            yield articleRepo.save(article);
            return article;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createArticle = createArticle;
function updateArticle(slug, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        try {
            const property = yield articleRepo.findOne({
                where: { slug: slug },
            });
            const article = yield articleRepo.save(Object.assign(Object.assign({}, property), data));
            if (!article)
                throw new Error("User does not exist");
            return article;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateArticle = updateArticle;
function deleteArticle(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        try {
            const article = yield articleRepo.delete(slug);
            if (!article)
                throw new Error("User does not exist");
            return true;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteArticle = deleteArticle;
function getAllArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        try {
            const article = yield articleRepo.find();
            if (!article)
                throw new Error("User does not exist");
            return article;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getAllArticles = getAllArticles;
function getFeedArticles(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        try {
            const article = yield articleRepo.find({
                where: {
                    author: { email: email },
                },
            });
            // article.totalComments=length(article.comments)
            if (!article)
                throw new Error("User does not exist");
            return article;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getFeedArticles = getFeedArticles;
function getArticleBySlug(slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        try {
            const article = yield articleRepo.findOne({
                where: { slug: slug },
                relations: ["author"],
            });
            if (!article)
                throw new Error("User does not exist");
            article.author = (0, security_1.sanitizeFeilds)(article.author);
            return article;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getArticleBySlug = getArticleBySlug;
