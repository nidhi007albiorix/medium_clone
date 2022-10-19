import { getRepository } from "typeorm";
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { sanitizeFeilds } from "../utils/security";
import { slugify } from "../utils/slugify";

interface ArticleData {
  title: string;
  description: string;
  //   tags: [string];
  body: string;
  author: User;
}

interface ArticleDataUpdate {
  title?: string;
  description?: string;
  //   tags: [string];
  body?: string;
}
export async function createArticle(
  data: ArticleData,
  email: string
): Promise<Article> {
  if (!data.title) throw new Error("Article title absent");
  if (!data.description) throw new Error("Article description absent");
  if (!data.body) throw new Error("Article body absent");
  const articleRepo = getRepository(Article);
  const userRepo = getRepository(User);
  try {
    const user = await userRepo.findOne({ where: { email: email } });
    if (!user) throw new Error("User not found");
    const article = new Article();
    (article.slug = slugify(data.title)),
      (article.title = data.title),
      (article.description = data.description),
      (article.body = data.body),
      // article.tags= data.tags,
      (article.author = sanitizeFeilds(user));
    await articleRepo.save(article);
    return article;
  } catch (error) {
    throw error;
  }
}

export async function updateArticle(
  slug: string,
  data: ArticleDataUpdate
): Promise<ArticleData> {
  const articleRepo = getRepository(Article);
  try {
    const property = await articleRepo.findOne({
      where: { slug: slug },
    });

    const article = await articleRepo.save({ ...property, ...data });
    if (!article) throw new Error("User does not exist");
    return article as ArticleData;
  } catch (error) {
    throw error;
  }
}
export async function deleteArticle(slug: string): Promise<Boolean> {
  const articleRepo = getRepository(Article);
  try {
    const article = await articleRepo.delete(slug);
    if (!article) throw new Error("User does not exist");

    return true;
  } catch (error) {
    throw error;
  }
}
export async function getAllArticles(): Promise<ArticleData[]> {
  const articleRepo = getRepository(Article);
  try {
    const article = await articleRepo.find();
    if (!article) throw new Error("User does not exist");

    return article as ArticleData[];
  } catch (error) {
    throw error;
  }
}
export async function getFeedArticles(email: string): Promise<ArticleData[]> {
  const articleRepo = getRepository(Article);
  try {
    const article = await articleRepo.find({
      where: {
        author: { email: email },
      },
    });
    // article.totalComments=length(article.comments)
    if (!article) throw new Error("User does not exist");

    return article as ArticleData[];
  } catch (error) {
    throw error;
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleData> {
  const articleRepo = getRepository(Article);
  try {
    const article = await articleRepo.findOne({
      where: { slug: slug },
      relations: ["author"],
    });
    if (!article) throw new Error("User does not exist");
    article.author = sanitizeFeilds(article.author);
    return article as ArticleData;
  } catch (error) {
    throw error;
  }
}
