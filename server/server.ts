import express from "express";
import { AddressInfo } from "net";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { UserDto } from "./dto/userDto";
import UserService from "./service/userService";
import { UserRepo } from "./repo/UserRepo";
import { SubjectEntity } from "./entity/SubjectEntity";
import { GroupEntity } from "./entity/GroupEntity";
import { ChatMessageEntity } from "./entity/ChatMessageEntity";
import { CriteriaEntity } from "./entity/CriteriaEntity";
import { GroupMemberEntity } from "./entity/GroupMemberEntity";
import { GroupRequestEntity } from "./entity/GroupRequestEntity";
import { SchoolEntity } from "./entity/SchoolEntity";
import { UserEntity } from "./entity/UserEntity";
import { userDtoToEntity } from "./dto/utils/userMappers";
import {repositories} from "./repositories";

dotenv.config();
const app = express();

const repo  = repositories;

repo.then((repos) => {
    const server = app.listen(process.env.PORT || 8345, async () => {
      const schoolEntity = new SchoolEntity("HK");
      const schoolRepo = repos.schoolRepo;
      await schoolRepo.save(schoolEntity);
      const user = new UserDto(
        "christian",
        "chgr007@egms.no",
        "pirate",
        "a88493c3-263d-4aa6-808f-ace53f8e1eb7"
      );
      const userService = new UserService(
        repos.userRepo
      );
      //const res = await userService.addUser(user);
      //console.info(res);
      console.info("Connected to db ");
      // const groupService = new GroupService(GroupRepo);
      // const groupRoutes = new GroupRouter(groupService, express.Router());
      // const authRouter = new AuthRouter(groupService, express.Router());

      //
      // app.use(express.json());
      // app.use(cookieParser(process.env.COOKIE_SECRET || "SuperSecret"));
      // app.use("/api/v1/groups", groupRoutes.fetchRoutes());
      //
      // app.use(authRouter.fetchRoutes());
      //
      // app.use(verifyToken);
      //
      // app.use(express.static("../client/dist"));
      //
      // app.use((req, res, next) => {
      //   if (req.method === "GET" && !req.path.startsWith("/api")) {
      //     res.sendFile(path.resolve("../client/dist/index.html"));
      //   } else {
      //     next();
      //   }
      // });
      //
      // websockets(server, new ChatService(ChatMessageRepo));
      console.log(
        `Server started at http://localhost:${
          (server.address() as AddressInfo).port
        }`
      );
    });
  })
  .catch((e) => console.log(e));
