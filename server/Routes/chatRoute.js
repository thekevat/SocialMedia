import express from "express";
import { createChat, findChat, userChats } from "../Contollers/chatController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
const router=express.Router();

router.post('/',createChat);
router.get('/:userId',verifyToken,userChats)
router.get('/find/:firstId/:secondId',findChat)

export default router;