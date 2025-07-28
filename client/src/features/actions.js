import { login, updateChat } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectSocket, getSocket, joinRoom } from "../services/socket";
import { logout } from "./userSlice";
import { addChat } from "./chatsSlice";
import { setCurrentChat } from "./currentChatSlice";
import { getMessages } from "../services/apiChatIO";

export const loginAndJoinSocket = createAsyncThunk(
  "app/loginAndJoinSocket",
  async (user, { dispatch }) => {
    dispatch(login(user));
    await connectSocket(user);
  }
);

export const logoutAndLeaveSocket = createAsyncThunk(
  "app/logoutAndLeaveSocket",
  async (_, { dispatch }) => {
    dispatch(logout());
    getSocket().disconnect();
  }
);

export const onAddChat = createAsyncThunk(
  "app/onAddChat",
  async ({ chatUser, conversationId }, { dispatch }) => {
    // dispatch(login(user));
    const chat = {
      chatUser,
      lastMessage: "",
      lastMessageAt: Date.now(),
      newMessages: 0,
    };
    dispatch(updateChat({ chatUser, conversationId }));
    dispatch(addChat(chat));
    dispatch(
      onSetCurrentChat({
        user: { chats: { [chatUser._id]: { id: conversationId } } },
        chatUser,
      })
    );
  }
);

export const onSetCurrentChat = createAsyncThunk(
  "app/onSetCurrentChat",
  async ({ user, chatUser }, { dispatch, getState }) => {
    // Ensure user.chats is correctly accessed, especially after a new chat is added
    const currentUser = getState().user.user;
    const roomId =
      currentUser.chats[chatUser._id]?.id || user.chats[chatUser._id]?.id;

    joinRoom(roomId);
    const data = await getMessages({ chatId: chatUser._id });
    dispatch(setCurrentChat({ user: chatUser, messages: data.messages }));
  }
);
