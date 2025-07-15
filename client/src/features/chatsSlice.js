import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    originalChats: [],
    chats: [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
      state.originalChats = action.payload;
    },
    addChat: (state, action) => {
      state.originalChats.push(action.payload);
      state.chats.push(action.payload);
    },
    searchChat: (state, action) => {
      state.chats = state.originalChats.filter((chat) =>
        chat.username.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    removeChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
      state.originalChats = state.originalChats.filter(
        (chat) => chat._id !== action.payload
      );
    },
  },
});

export const { setChats, addChat, removeChat, searchChat } = chatsSlice.actions;
export default chatsSlice.reducer;
