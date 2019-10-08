import { Subject } from "rxjs";
import { serialPortList } from "./interface";
import { log } from "console";
import { selectCorrectComPort } from "./util";
import { verifyComPort } from "./questions";

export const ReadParser = new Subject();
export const WriteParser = new Subject();

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const ArduinoOperation = async () => {
  const ports: serialPortList[] = await SerialPort.list();

  let comPort = selectCorrectComPort(ports);

  const port = new SerialPort(comPort, {
    autoOpen: true,
    baudRate: 9600
  });

  comPort = await verifyComPort(comPort);

  const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

  port.on("open", function() {
    console.log("port opened");
  });

  port.on("error", function(e: any) {
    console.log("port error", e);
  });

  parser.on("readable", (e: any) => {
    const read = parser.read();
    console.log("data", read);
    ReadParser.next(read);
  });

  WriteParser.subscribe(data => {
    writeAndDrain(data);
  });

  function writeAndDrain(data: any, callback = () => {}) {
    parser.write(data);
    parser.drain(callback);
  }
};

ArduinoOperation();
