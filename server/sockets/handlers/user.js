export default function userHandlers(io, socket) {
  socket.userId = socket.handshake.query.userId;
  console.log("User ID:", socket.userId);

  // socket.on("userid", (userId) => {
  //   console.log("User ID:", userId);
  //   socket.userId = userId;
  //   console.log(socket.userId);
  // });
}
