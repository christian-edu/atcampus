import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { UserDto } from "./dto/userDto";
import UserService from "./service/userService";
import { repositories } from "./repo/repositories";
import GroupService from "./service/groupService";
import GroupRouter from "./controller/groupRouter";
import AuthRouter from "./controller/authRouter";
import cookieParser from "cookie-parser";
import { setProtectedRoutes, verifyToken } from "./util/authUtils";
import path from "path";
import ChatService from "./service/chatService";
import WebSocketServer from "./websockets/webSocketServer";
import AuthService from "./service/authService";
import UserRouter from "./controller/userRouter";
import Logger from "./util/logger";
import ChatRouter from "./controller/chatRouter";

dotenv.config();
const app = express();

const repo = repositories;

repo
  .then((repos) => {
    const server = app.listen(process.env.PORT || 8345, async () => {
      Logger.info("Server", "Connected to db ");
      // const schoolEntity = new SchoolEntity("Kristiania");
      // const schoolRepo = repos.schoolRepo;
      // console.log(await schoolRepo.save(schoolEntity));
      const user = new UserDto(
        "jimbob",
        "jim@bob.no",
        "pirate",
        "$2b$10$io2NKvQX3TN.ULzd.FxhW.F0rQE57HUbcvl0muVYJgTem3uZzJAZ6"
      );
      const userService = new UserService(
        repos.userRepo,
        repos.schoolRepo,
        repos.groupRepo
      );
      const userRouter = new UserRouter(userService, express.Router());
      // const res = await userService.addUser(user);
      // console.info(res);
      const groupService = new GroupService(
        repos.groupRepo,
        repos.groupMemberRepo,
        repos.schoolRepo,
        repos.subjectRepo,
        repos.userRepo,
        repos.criteriaRepo,
        repos.chatMessageRepo
      );
      const groupRoutes = new GroupRouter(groupService, express.Router());
      const authRouter = new AuthRouter(
        new AuthService(repos.userRepo),
        express.Router()
      );

      const chatService = new ChatService(
        repos.chatMessageRepo,
        repos.userRepo,
        repos.groupRepo
      );
      const chatRouter = new ChatRouter(chatService, express.Router());
      app.use(express.json());
      app.use(cookieParser(process.env.COOKIE_SECRET));
      app.use(verifyToken);
      app.use(setProtectedRoutes);
      app.use("/api/v1/chat", chatRouter.fetchRoutes());
      app.use("/api/v1/groups", groupRoutes.fetchRoutes());
      app.use("/api/v1/user", userRouter.fetchRoutes());
      app.use(authRouter.fetchRoutes());

      app.use(express.static("../client/dist"));

      app.use((req, res, next) => {
        if (req.method === "GET" && !req.path.startsWith("/api")) {
          res.sendFile(path.resolve("../client/dist/index.html"));
        } else {
          next();
        }
      });

      WebSocketServer(server, chatService, userService);
      Logger.info(
        "server",
        `Server started at http://localhost:${
          (server.address() as AddressInfo).port
        }`
      );
    });
  })
  .catch((e) => console.log(e));
