import { serialPortList } from "./interface";

export const selectCorrectComPort = (list: serialPortList[]) => {
  for (let i of list) {
    if (i.manufacturer.search("Arduino") !== -1) {
      return i.comName;
    }
  }

  throw new Error("Invalid com port");
};
