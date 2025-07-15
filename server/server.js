import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import registerSocketEvents from "./sockets/index.js";

const DB = process.env.DATABASE.replaceAll(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  });

const server = createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  registerSocketEvents(io, socket);
});
