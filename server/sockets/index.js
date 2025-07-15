import chatHandlers from "./handlers/chats.js";
import userHandlers from "./handlers/user.js";

const registerSocketEvents = (io, socket) => {
  console.log("User connected:", socket.id);

  userHandlers(io, socket);
  chatHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

export default registerSocketEvents;
