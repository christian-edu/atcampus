import UserService from "../service/userService";
import { IRouter } from "express";

export default class UserRouter {
  constructor(private userService: UserService, private router: IRouter) {}

  public getRoutes() {
    this.router.get("/", async () => {});

    return this.router;
  }
}
