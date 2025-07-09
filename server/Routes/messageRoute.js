import express from "express"
import { addMessage, getMessages } from "../Contollers/messageController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";
const router=express.Router();

router.post('/',verifyToken,addMessage);
router.get('/:chatId',getMessages);

export default router;