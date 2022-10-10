import { Request, Response, Router } from "express";
import { createComment } from "../controllers/comments";
import { auth } from "../middleware/auth";

const route = Router();
export const commentRoute = route;


// // article comments
// route.get("/article-comments/:slug", auth, async (req: Request, res: Response) => {
//     try {
//         const comments = await getArticleComment(req.params.slug);
//         return res.status(201).json(comments);
//       } catch (error) {
//         return res.status(422).send({
//           errors: {
//             body: "Could not find comments",
//           },
//         });
//       }

// })
// post comments
route.post("/:slug", auth, async (req: Request, res: Response) => {
    try {
        const comment = await createComment(
          req.body.comment,
          (req as any).user.email,
          req.params.slug
        );
    
        return res.status(201).json(comment);
      } catch (error) {
        return res.status(422).send({
          errors: {
            body: "Could not create comment",
          },
        });
      }

})
