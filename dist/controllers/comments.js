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
exports.createComment = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("../entities/Article");
const Comment_1 = require("../entities/Comment");
const User_1 = require("../entities/User");
const security_1 = require("../utils/security");
function createComment(data, email, slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleRepo = (0, typeorm_1.getRepository)(Article_1.Article);
        const commentRepo = (0, typeorm_1.getRepository)(Comment_1.Comment);
        const userRepo = (0, typeorm_1.getRepository)(User_1.User);
        try {
            const article = yield articleRepo.findOne({ where: { slug: slug } });
            const user = yield userRepo.findOne({ where: { email: email } });
            if (!article)
                throw new Error("Article not found");
            if (!user)
                throw new Error("user not found");
            const comment = new Comment_1.Comment();
            (comment.body = data.body),
                (comment.article = article),
                // article.tags= data.tags,
                (comment.user = (0, security_1.sanitizeFeilds)(user));
            console.log(comment);
            yield commentRepo.save(comment);
            return comment;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createComment = createComment;
// export async function getArticleComment(slug: string): Promise<commentData> {
// }
