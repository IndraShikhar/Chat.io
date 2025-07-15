import User from "../models/userSchema.js";
import { catchAsync } from "../utils/errorHelper.js";

const userController = {
  me: catchAsync(async function (req, res, next) {
    const user = req.user;

    // await user.select("+chats");

    res.status(200).json({
      status: "success",
      message: "User details fetched successfully",
      user,
    });
  }),

  searchUsers: catchAsync(async function (req, res, next) {
    const { username } = req.params;

    console.log(username);

    const users = (
      await User.find({
        username: { $regex: username, $options: "i" },
      })
    ).filter((user) => user.id !== req.user.id);

    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      results: users,
    });
  }),

  getChats: catchAsync(async function (req, res, next) {
    const user = req.user;
    const conversations = Object.keys(user.chats);
    let chats = await Promise.all(
      conversations.map(async (id) => {
        const chat = await User.findOne({ _id: id }).select("username avatar");
        return chat;
      })
    );

    chats = chats.map((chat) => {
      return {
        chatUser: chat,
        lastMessage: user.chats[chat._id].lastMessage,
        lastMessageAt: user.chats[chat._id].lastMessageAt,
      };
    });

    res.status(200).json({
      status: "success",
      message: "Conversations fetched successfully",
      chats: chats || [],
    });
  }),
};

export default userController;
