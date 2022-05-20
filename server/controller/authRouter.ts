import { IGroupService } from "../service/IGroupService";
import { IRouter } from "express";
import jwt from "jsonwebtoken";

export default class authRouter {
  constructor(private groupService: IGroupService, private router: IRouter) {}

  fetchRoutes() {
    this.router.post("/api/v1/login", async (req, res) => {
      const token = jwt.sign(
        { userId: "dsa89dsa" },
        process.env.JWT_KEY || "aaaa",
        { expiresIn: "1h" }
      );
      res.cookie("auth_token", token, { sameSite: true });
      res.json(token);
    });

    return this.router;
  }
}
