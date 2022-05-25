import { IRouter } from "express";
import jwt from "jsonwebtoken";
import { ServerRouter } from "./serverRouter";
import IAuthService from "../service/IAuthService";
import dotenv from "dotenv";

dotenv.config();
export default class AuthRouter extends ServerRouter {
  constructor(private authService: IAuthService, private router: IRouter) {
    super();
  }

  public fetchRoutes() {
    this.router.post("/api/v1/login", async (req, res) => {
      const { userName, email, password } = req?.body;

      try {
        const jwt = await this.authService.authenticateUser(
          userName,
          email,
          password
        );
        res.cookie("auth_token", jwt, { sameSite: true, signed: true });
        res.sendStatus(200);
      } catch (e) {
        this.sendError(res, e);
      }
    });
    this.router.delete("/api/v1/logout", async (req, res) => {
      res.clearCookie("auth_token");
      res.sendStatus(200);
    });

    return this.router;
  }
}
