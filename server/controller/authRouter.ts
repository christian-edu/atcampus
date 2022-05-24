import { IRouter } from "express";
import jwt from "jsonwebtoken";
import { ServerRouter } from "./serverRouter";
import IAuthService from "../service/IAuthService";

export default class AuthRouter extends ServerRouter {
  constructor(private authService: IAuthService, private router: IRouter) {
    super();
  }

  public fetchRoutes() {
    this.router.post("/api/v1/login", async (req, res) => {
      const { userName, email, password } = req?.body;

      try {
        const jwt = this.authService.authenticateUser(
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

    this.router.get("/api/v1/login", (req, res) => {
      const token = jwt.sign(
        { userId: "dsa89dsa" },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );

      res.cookie("auth_token", token, { sameSite: true, signed: true });
      res.json(token);
    });
    return this.router;
  }
}
