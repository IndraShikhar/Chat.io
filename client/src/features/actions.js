import { login, updateChat } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { connectSocket, getSocket, joinRoom } from "./socket";
import { addChat } from "./chatsSlice";
import { setCurrentChat } from "./currentChatSlice";
import { getMessages } from "../services/apiChatIO";

const socket = getSocket();

export const loginAndJoinSocket = createAsyncThunk(
  "app/loginAndJoinSocket",
  async (user, { dispatch }) => {
    dispatch(login(user));
    await connectSocket(user);
  }
);

export const logout = createAsyncThunk(
  "app/logoutAndLeaveSocket",
  async (_, { dispatch }) => {
    dispatch(logout());
    socket.disconnect();
  }
);

export const onAddChat = createAsyncThunk(
  "app/onAddChat",
  async ({ chatUser, conversationId }, { dispatch }) => {
    // dispatch(login(user));
    dispatch(updateChat({ chatUser, conversationId }));
    dispatch(addChat(chatUser));
    dispatch(
      setCurrentChat({
        user: { chatUser, lastMessage: "", lastMessageAt: Date.now() },
        messages: [],
      })
    );
  }
);

export const onSetCurrentChat = createAsyncThunk(
  "app/onSetCurrentChat",
  async ({ user, chatUser }, { dispatch }) => {
    joinRoom(user.chats[chatUser._id].id);
    const data = await getMessages({ chatId: chatUser._id });
    dispatch(setCurrentChat({ user: chatUser, messages: data.messages }));
  }
);
