import express from "express";
import { deleteUser, followUser, getAllUsers, getUser, unFollowUser, updateUser } from "../Contollers/UserController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express();
router.get('/',verifyToken,getAllUsers)
router.get('/:id',getUser);
router.put('/:id',verifyToken,updateUser);
router.delete('/:id',deleteUser);
router.put('/:id/follow',verifyToken,followUser);
router.put('/:id/unfollow',verifyToken,unFollowUser)
export default router;