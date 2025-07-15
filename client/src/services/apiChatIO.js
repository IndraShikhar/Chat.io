import { io } from "socket.io-client";

const API = import.meta.env.VITE_CHAT_API;

export const attemptLogin = async (username, password) => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  return data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const searchUsers = async (username) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/users/search/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const joinSocket = async (user) => {
  const socket = io("http://localhost:3000", {
    query: { userId: user._id },
  });

  socket.connect();

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  return socket;
};

export const getChats = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/users/chats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const createConversation = async (member) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      member: member._id,
      content:
        "Hey this is a test text message to create different chats for different users from my client side. Please Work!!",
    }),
  });
  const data = await response.json();
  return data;
};

export const getMessages = async ({ chatId }) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API}/conversations/${chatId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const sendMessage = async ({ chatId, message }) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/conversations/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data;
};
