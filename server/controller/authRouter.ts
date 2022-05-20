import { IGroupService } from "../service/IGroupService";
import { IRouter } from "express";
import jwt from "jsonwebtoken";
import { ServerRouter } from "./serverRouter";
import dotenv from "dotenv";

export default class AuthRouter extends ServerRouter {
  constructor(private groupService: IGroupService, private router: IRouter) {
    super();
  }

  public fetchRoutes() {
    this.router.post("/api/v1/login", async (req, res) => {
      const token = jwt.sign(
        { userId: "dsa89dsa" },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );
      res.cookie("auth_token", token, { sameSite: true });
      res.json(token);
    });

    this.router.get("/api/v1/login", (req, res) => {
      const token = jwt.sign(
        { userId: "dsa89dsa" },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );
      res.cookie("auth_token", token, { sameSite: true });
      res.json(token);
    });
    return this.router;
  }
}
