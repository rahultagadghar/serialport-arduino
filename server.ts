import { socketInstance } from "./socket";
import express from "express";
const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);

import { UserRoutes } from "./routes";

app.use("/", UserRoutes);

io.on("connection", function(socket: any) {
  socketInstance(socket);
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
