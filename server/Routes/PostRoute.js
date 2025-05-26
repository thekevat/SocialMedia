import express from "express";
import { createPost, deletePost, getPost, getTimeLinePosts, reactPost, updatePost } from "../Contollers/PostController.js";

const router =express.Router();

router.post('/',createPost);
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.put('/:id/react',reactPost);
router.get('/:id/timeline',getTimeLinePosts);
export default router;