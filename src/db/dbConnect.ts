import { connect, connection } from "mongoose";
import { log } from "console";
const url = process.env.DB_URL as string;

export const DbConnection = () => {
  connection.on("connecting", () => log(`Connecting to MongoDb Server`));
  connection.on("open", () => log(`connected to MongoDb Server`));
  connection.on("reconnected", () => log(`reconnected to MongoDb Server`));
  connection.on("close", () => log(`Closed from MongoDb Server`));
  connection.on("error", err => log(`Error from MongoDb Server ${err}`));

  return connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

