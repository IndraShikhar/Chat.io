import { addMessage } from "../features/currentChatSlice";
import store from "../store";
import { joinSocket } from "./apiChatIO";

let socket = null;
export async function connectSocket(user) {
  socket = await joinSocket(user);

  socket.on("receiveMessage", ({ roomId, user, message }) => {
    console.log({ roomId, user, message });
    store.dispatch(addMessage(message));
  });
}

export function joinRoom(room) {
  console.log("join Room:", room);
  socket.emit("joinRoom", room);
  console.log("Joined Room:", room);
}

export function getSocket() {
  return socket;
}
