import express from "express";
import * as path from "path";
import GroupRouter from "./controller/groupRouter";
import { AddressInfo } from "net";
import MockGroupRepo from "./__mocks__/mockGroupRepo";
import MockGroupService from "./__mocks__/mockGroupService";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const app = express();
export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST, // hentes fra process.env
  username: process.env.DB_USERNAME, // hentes fra process.env
  password: process.env.DB_PASSWORD, // hentes fra process.env
  database: process.env.DB_DATABASE, // hentes fra process.env,
  synchronize: true,
});
console.info(process.env.USERNAME);
AppDataSource.initialize()
  .then((r) => {
    console.info("Connected to db");

    const server = app.listen(process.env.PORT || 8345, () => {
      // const criteriaRepo = CriteriaRepo;
      // criteriaRepo
      //   .save(
      //     new CriteriaEntity(
      //       GradeGoal.A,
      //       WorkFrequency.W1,
      //       WorkType.HYBRID,
      //       5,
      //       "Norsk",
      //       "Oslo",
      //       [new SubjectEntity("test")],
      //       new SchoolEntity("HK")
      //     )
      //   )
      //   .then((r) => console.log(r.uuid));
      console.log(
        `Server started at http://localhost:${
          (server.address() as AddressInfo).port
        }`
      );
    });
  })
  .catch((e) => console.log(e));

const dummyRepo = new MockGroupRepo();
const groupService = new MockGroupService(dummyRepo);
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
