import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { sanitizeFeilds } from "../utils/security";

interface commentData {
  body: string;
  user: User;
  article: Article;
}
export async function createComment(
  data: commentData,
  email: string,
  slug: string
): Promise<commentData> {
  const articleRepo = getRepository(Article);
  const commentRepo = getRepository(Comment);
  const userRepo = getRepository(User);
  try {
    const article = await articleRepo.findOne({ where: { slug: slug } });
    const user = await userRepo.findOne({ where: { email: email } });
    if (!article) throw new Error("Article not found");
    if (!user) throw new Error("user not found");
    const comment = new Comment();
    (comment.body = data.body),
      (comment.article = article),
      // article.tags= data.tags,
      (comment.user = sanitizeFeilds(user));

    await commentRepo.save(comment);
    return comment as commentData;
  } catch (error) {
    throw error;
  }
}

// export async function getArticleComment(slug: string): Promise<commentData> {
//     try {
        
//     } catch (error) {
        
//     }

// }
