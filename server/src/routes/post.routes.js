// server/src/routes/post.routes.js
//
// Wires PostService's publish() and listPublished() to
// the API contract's POST /api/posts and GET /api/posts (Lecture 4).
// Same thin-route discipline as auth.routes.js: no businessrules here.
import { Router } from "express";
import { PostService } from "../services/post.service.js";
import { PostStats } from "../events/listeners/stats.listener.js";
const router = Router();
router.post("/posts", async (req, res) => {
    try {
        const { authorId, title, body } = req.body;
        const post = await PostService.publish({ authorId, title, body });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({
            error: { code: err.code || "VALIDATION_ERROR", message:err.message },
        });
    }
});
router.get("/posts", async (req, res) => {
    const { page = 1, search } = req.query;
    const result = search
        ? await PostService.search({ query: search, page: Number(page) })
        : await PostService.listPublished({ page: Number(page) });
    res.status(200).json(result);
});
router.get("/stats", (req, res) => {
  res.status(200).json(PostStats.get());
});
export default router;