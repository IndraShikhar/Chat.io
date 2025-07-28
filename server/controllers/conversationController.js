import crypto from "crypto";

import getConversationModal, {
  alreadyExists,
} from "../models/conversationSchema.js";
import { catchAsync } from "../utils/errorHelper.js";
import User from "../models/userSchema.js";
import AppError from "../utils/appError.js";

const conversationController = {
  createConversation: catchAsync(async (req, res, next) => {
    const members = [req.user.id, req.body.member];

    if (!members) {
      throw new AppError(400, "Members are required");
    }

    const user = await User.findOne({ _id: members[0] }).select("+chats");

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (user.chats[members[1]])
      return res.status(200).json({
        status: "exists",
        message: "Conversation already exists",
        conversationId: user.chats[members[1]],
      });

    let convId = crypto.randomBytes(16).toString("hex");
    while (alreadyExists(convId)) {
      convId = crypto.randomBytes(16).toString("hex");
    }

    const conversation = await getConversationModal(`${convId}`);

    for (const memberId of members) {
      const otherId = members.filter((m) => m !== memberId)[0];
      const updateFields = {};

      //   for (const otherId of otherMembers) {
      updateFields[`chats.${otherId}`] = {
        id: convId,
        lastMessage: "",
        lastMessageAt: Date.now(),
        newMessages: 0,
      };
      //   }

      await User.updateOne({ _id: memberId }, { $set: updateFields });
    }

    // await User.updateMany(
    //   { _id: { $in: members } },
    //   {
    //     $set: {
    //       [`chats.${
    //         members.filter((m) => {
    //           console.log(this);
    //           return m !== `${this.id}`;
    //         })[0]
    //       }`]: conversation._id,
    //     },
    //   }
    // );

    res.status(200).json({
      status: "success",
      message: "Conversation created successfully",
      conversationId: convId,
    });
  }),

  getConversation: catchAsync(async (req, res, next) => {
    res.status(200).json({
      status: "success",
      message: "Conversation fetched successfully",
      conversations: req.user.chats,
    });
  }),

  getMessages: catchAsync(async (req, res, next) => {
    const user = req.user;

    if (!user.chats[req.params.chatId]) {
      throw new AppError(404, "Conversation does not exists");
    }

    const conversation = await getConversationModal(
      user.chats[req.params.chatId].id
    );
    const messages = await conversation.find();

    res.status(200).json({
      status: "success",
      message: "Messages fetched successfully",
      messages,
    });
  }),

  addMessage: catchAsync(async (req, res, next) => {
    const user = req.user;

    if (!user.chats[req.params.chatId]) {
      throw new AppError(404, "Conversation does not exists");
    }

    const conversation = await getConversationModal(
      user.chats[req.params.chatId].id
    );

    // Adding message to conversation
    const { id } = await conversation.create({
      sender: user.id,
      reciver: req.params.chatId,
      message: req.body.message,
    });

    //Updating both users last messages
    {
      await User.updateOne(
        { _id: req.params.chatId },
        {
          $set: {
            [`chats.${user.id}.lastMessageAt`]: Date.now(),
            [`chats.${user.id}.lastMessage`]: req.body.message,
          },
        }
      );

      await User.updateOne(
        { _id: user.id },
        {
          $set: {
            [`chats.${req.params.chatId}.lastMessageAt`]: Date.now(),
            [`chats.${req.params.chatId}.lastMessage`]: req.body.message,
          },
        }
      );
    }

    res.status(200).json({
      status: "success",
      message: "Message sent successfully",
      data: {
        id,
      },
    });
  }),
};

export default conversationController;
