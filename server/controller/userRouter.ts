import UserService from "../service/userService";
import { IRouter } from "express";
import HttpException from "../util/httpException";
import { ServerRouter } from "./serverRouter";

export default class UserRouter extends ServerRouter {
  constructor(private userService: UserService, private router: IRouter) {
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
