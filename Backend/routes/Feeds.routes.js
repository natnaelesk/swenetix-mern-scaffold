import { Router } from "express";
import { createPost, getPosts, deletePost, updatePost , likePost}  from "../controllers/Feeds.controllers.js";

const FeedsRoutes = Router();


FeedsRoutes.get("/", getPosts)
FeedsRoutes.post("/", createPost)
FeedsRoutes.delete("/:id", deletePost)
FeedsRoutes.put("/:id", updatePost)
FeedsRoutes.post("/:id/like", likePost)


export default FeedsRoutes;