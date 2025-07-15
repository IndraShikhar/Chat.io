import userReducer from "./features/userSlice.js";
import currentChatReducer from "./features/currentChatSlice.js";
import chatsReducer from "./features/chatsSlice.js";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
    currentChat: currentChatReducer,
  },
});

export default store;
