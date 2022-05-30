import UserService from "../service/userService";
import { IRouter } from "express";
import { ServerRouter } from "./serverRouter";
import { UserDto } from "../dto/userDto";
import { IUserService } from "../service/IUserService";

export default class UserRouter extends ServerRouter {
  constructor(private userService: IUserService, private router: IRouter) {
    super();
  }

  public fetchRoutes() {
    this.router.get("/", async (req, res) => {
      try {
        res.json(await this.userService.findUserById(req.userId));
      } catch (e) {
        this.sendError(res, e);
      }
    });
    this.router.post("/", async (req, res) => {
      const { userName, email, password } = req.body;

      try {
        const savedUser = this.userService.addUser(
          new UserDto(userName, email, password)
        );
        res.json(savedUser);
      } catch (e) {
        this.sendError(res, e);
      }
    });
    this.router.post("/search", async (req, res) => {
      const { userName, email } = req?.body;

      try {
        res.json(
          await this.userService.findUserByEmailOrUserName({ userName, email })
        );
      } catch (e) {
        this.sendError(res, e);
      }
    });
    this.router.get("/groups", async (req, res) => {
      try {
        const groups = await this.userService.fetchGroupsByUserId(req.userId);
        console.log(groups);
        res.json(groups);
      } catch (e) {
        this.sendError(res, e);
      }
    });

    return this.router;
  }
}
