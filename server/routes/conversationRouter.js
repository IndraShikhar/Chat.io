import express from "express";

import conversationController from "../controllers/conversationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(conversationController.getConversation)
  .post(conversationController.createConversation);

router
  .route("/:chatId/messages")
  .get(conversationController.getMessages)
  .post(conversationController.addMessage);

export default router;
