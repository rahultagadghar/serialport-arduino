const inquirer = require("inquirer");
import { questions } from "./interface";

export async function verifyComPort(defaultComName = "COM3") {
  const questions = [
    {
      type: "input",
      name: "PORT_NUMBER",
      message: "Enter port number?",
      default: function() {
        return defaultComName;
      },
      validate: function(value = "") {
        return true;
      }
    }
  ];
  const answersRaw = await inquirer.prompt(questions);
  let answersString = JSON.stringify(answersRaw, null, "  ");
  const answers: questions = JSON.parse(answersString);
  const comPort = answers.PORT_NUMBER;
  return comPort;
}
