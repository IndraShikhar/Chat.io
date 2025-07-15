import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    chatUser: {},
    messages: [],
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.chatUser = action.payload.user;
      state.messages = action.payload.messages;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setCurrentChat, addMessage } = currentChatSlice.actions;
export default currentChatSlice.reducer;
