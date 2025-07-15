export default function chatHandlers(io, socket) {
  socket.on("sendMessage", ({ roomId, user }) => {
    console.log("Send Message:", { roomId, user });
    io.to(roomId).emit("receiveMessage", { roomId, user });
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.userId} joined room ${roomId}`);
  });
}
