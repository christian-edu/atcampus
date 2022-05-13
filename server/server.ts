import express from "express";
import * as path from "path";
import GroupService from "./service/groupService";
import GroupRouter from "./controller/groupRouter";
import { AddressInfo } from "net";
import DummyGroupRepo from "./repo/DummyGroupRepo";
import { DataSource } from "typeorm";

const app = express();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "placeholder", // hentes fra process.env
  username: "placeholder", // hentes fra process.env
  password: "placeholder", // hentes fra process.env
  database: "placeholder", // hentes fra process.env
});
const dummyRepo = new DummyGroupRepo();
const groupService = new GroupService(dummyRepo);
const groupRoutes = new GroupRouter(groupService, express.Router());

// TODO: Fjerne allow js når migrert

app.use(express.json());

app.use("/api/v1/groups", groupRoutes.fetchRoutes());

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
