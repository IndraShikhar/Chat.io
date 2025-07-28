import mongoose from "mongoose";
import { getDB } from "../utils/dbHelper.js";

const db = await getDB("ChatIO");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email already exists"],
    //   validate: {
    //     validator: (value) => {
    //       const re =
    //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //       return re.test(String(value).toLowerCase());
    //     },
    //     message: "Please provide a valid email",
    //   },
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  chats: {
    type: Object,
    //  {
    //   id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Conversation",
    //   },
    //   lastMessage: {
    //     type: String,
    //   },
    //   lastMessageAt: {
    //     type: Date,
    //   },
    //   newMessages:{
    //     type: Number,
    //     default: 0
    //   }
    // },
    default: {},
    select: false,
  },
});

userSchema.pre(/^find/, function (next) {
  // this.select("-chats");
  next();
});

const User = db.models?.User || db.model("User", userSchema);

export default User;

// export default (db) => db.model("User", userSchema);

// function getUserModal(chatId) {
//   // Sanitize chatId if needed
//   return db.models[chatId] || db.model(chatId, userSchema, chatId); // third param sets collection name
// }

// export default getUserModal;
