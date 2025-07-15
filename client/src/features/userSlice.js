import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    updateChat: (state, action) => {
      console.log("Update Chat:", action.payload);
      state.user.chats[action.payload.chatUser._id] =
        action.payload.conversationId;
    },
    login: (state, action) => {
      console.log("Login:", action.payload);

      state.user = { ...action.payload };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, startLoading, stopLoading, updateChat } =
  userSlice.actions;
export default userSlice.reducer;
