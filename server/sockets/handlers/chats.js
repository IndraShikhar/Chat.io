import getConversationModal from "../../models/conversationSchema.js";

export default function chatHandlers(io, socket) {
  socket.on("sendMessage", ({ roomId, user, messageId }) => {
    (async function () {
      const conversation = getConversationModal(roomId);
      const message = await conversation.findOne({ _id: messageId });
      io.to(roomId).emit("receiveMessage", { roomId, user, message });
    })();
  });

  socket.on("joinRoom", (roomId) => {
    console.log(socket);
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });
    socket.join(roomId);

    // socket.join(roomId);
    console.log(`Socket ${socket.userId} joined room ${roomId}`);
  });
}
