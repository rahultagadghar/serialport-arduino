import { Socket } from "socket.io";
import { ReadParser } from "./arudino";

export const socketInstance = (socket: Socket) => {
  console.log("a user connected");

  ReadParser.subscribe(r => {
    socket.emit("gotData", "parser" + r);
  });

  socket.emit("gotData", "Fristime");
};
