import express from "express";
import * as path from "path";
import { groupNames, subjectQuestions } from "./mockData.js";
import GroupService from "./service/groupService.js";
import GroupRouter from "./controller/groupRouter.js";
import { AddressInfo } from "net";

const app = express();
const groupService = new GroupService();
const groupRoutes = new GroupRouter(groupService, express.Router());

// TODO: Fjerne allow js når migrert

app.use(express.json());

app.use("/api/v1/groups", groupRoutes.fetchRoutes());

app.get("/api/questions", (req, res) => {
  console.log("U hit the right spot");

  res.json(subjectQuestions);
});

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server started at http://localhost:${
      (server.address() as AddressInfo).port
    }`
  );
});
