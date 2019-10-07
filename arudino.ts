import { Subject } from "rxjs";
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

export const ReadParser = new Subject();
export const WriteParser = new Subject();

const port = new SerialPort("/dev/ttyACM0", {
  autoOpen: true,
  baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

port.on("open", function() {
  console.log("port opened");
});

port.on("error", function() {
  console.log("port error");
});

parser.on("readable", (e: any) => {
  const read = parser.read();
  console.log("data", read);
  ReadParser.next(read);
});

WriteParser.subscribe(data => {
  parser.write(data);
});
