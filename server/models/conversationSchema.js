import mongoose from "mongoose";
import { getDB } from "../utils/dbHelper.js";

const db = await getDB("Conversation");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function getConversationModal(chatId) {
  // Sanitize chatId if needed
  return db.models?.[chatId] || db.model(chatId, messageSchema, chatId); // third param sets collection name
}

export default getConversationModal;

export function alreadyExists(chatId) {
  return db.models?.[chatId] ? true : false;
}
