import express from "express";
import { createPost, deletePost, getPost, getTimeLinePosts, reactPost, updatePost } from "../Contollers/PostController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
const router =express.Router();

router.post('/',verifyToken,createPost);
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.delete('/:id',verifyToken,deletePost);
router.put('/:id/react',verifyToken,reactPost);
router.get('/:id/timeline',verifyToken,getTimeLinePosts);
export default router;