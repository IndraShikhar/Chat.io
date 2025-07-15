import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";
const router = express.Router();

// Protected routes
router.use(authMiddleware.protect);

router.get("/me", userController.me);
router.get("/search/:username", userController.searchUsers);
router.get("/chats", userController.getChats);

export default router;
