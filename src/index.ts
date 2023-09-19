import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT: string = process.env.PORT || "8000";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const id = socket.id;
  console.log("connected: ", id);
  socket.emit("new-user", "new User connected with Id " + id);

  socket.on("message", (msg) => {
    //console.log("Received message: ", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("disconnected: ", id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`litening on home:${PORT} ...`);
});
