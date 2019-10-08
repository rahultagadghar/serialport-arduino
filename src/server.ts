import { config } from "dotenv";
config();

import express from "express";
import { DbConnection } from "./db/dbConnect";
import { createServer } from "http";
import { log } from "console";

const app = express();
const port = process.env.PORT;

const http = createServer(app);

http.listen(port, () => log(`Server is up on port : ${port}`));

const io = require("socket.io")(http);

(async () => {
  await DbConnection();

  const { socketInstance } = require("./socket");
  const { UserRoutes } = require("./routes");

  app.use("/", UserRoutes);

  io.on("connection", function(socket: any) {
    socketInstance(socket);
  });
})();
