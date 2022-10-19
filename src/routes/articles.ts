import { Router, Request, Response } from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleBySlug,
  getFeedArticles,
  updateArticle,
} from "../controllers/articles";
import { auth } from "../middleware/auth";
const route = Router();
export const articleRoute = route;

// list articles
route.get("/", async (req: Request, res: Response) => {
  try {
    const articles = await getAllArticles();

    return res.status(201).json(articles);
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not find articles",
      },
    });
  }
});

// feed articles
route.get("/feeds", auth, async (req: Request, res: Response) => {
  try {
    const article = await getFeedArticles((req as any).user.email);
    return res.status(201).json(article);
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not find articles",
      },
    });
  }
});

// article by slug
route.get("/:slug", async (req: Request, res: Response) => {
  try {
    const article = await getArticleBySlug(req.params.slug);
    return res.status(201).json(article);
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not find articles",
      },
    });
  }
});

// create an article
route.post("/", auth, async (req: Request, res: Response) => {
  try {
    const article = await createArticle(
      req.body.article,
      (req as any).user.email
    );

    return res.status(201).json(article);
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not create article",
      },
    });
  }
});

// update an article
route.patch("/:slug", auth, async (req: Request, res: Response) => {
  try {
    const article = await updateArticle(req.params.slug, req.body.article);

    return res.status(201).json(article);
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not update article",
      },
    });
  }
});

// delete an article
route.delete("/:slug", async (req: Request, res: Response) => {
  try {
    await deleteArticle(req.params.slug);

    return res.status(201).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not delete article",
      },
    });
  }
});
