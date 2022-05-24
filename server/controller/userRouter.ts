import UserService from "../service/userService";
import { IRouter } from "express";
import HttpException from "../util/httpException";

export default class UserRouter {
  constructor(private userService: UserService, private router: IRouter) {}

  public getRoutes() {
    this.router.get("/", async (req, res) => {
      try {
        return this.userService.findUserById(req.userId);
      } catch (e) {
        throw new HttpException("Something went wrong!", 500);
      }
    });

    return this.router;
  }
}
