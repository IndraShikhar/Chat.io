import { joinSocket } from "../services/apiChatIO";

let socket = null;
export async function connectSocket(user) {
  socket = await joinSocket(user);
}

export function joinRoom(room) {
  console.log("join Room:", room);
  socket.emit("joinRoom", room);
  console.log("Joined Room:", room);
}

export function getSocket() {
  return socket;
}
