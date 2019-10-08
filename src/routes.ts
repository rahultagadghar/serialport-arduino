import { Router } from "express";

export const UserRoutes = Router();

UserRoutes.route("/").get((req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});
