import { Request, Response, Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/comments";
import { auth } from "../middleware/auth";

const route = Router();
export const commentRoute = route;


// // article comments
// route.get("/:slug", auth, async (req: Request, res: Response) => {
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
route.patch("/:id", auth, async (req: Request, res: Response) => {
  try {
    const comment = await updateComment(req.params.id, req.body.comment);

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not update comment",
      },
    });
  }
});


// delete an comment
route.delete("/:id", async (req: Request, res: Response) => {
  try {
    await deleteComment(req.params.id);

    return res.status(201).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(422).send({
      errors: {
        body: "Could not delete comment",
      },
    });
  }
});
