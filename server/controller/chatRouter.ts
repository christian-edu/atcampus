import { ServerRouter } from "./serverRouter";
import { IRouter } from "express";
import { IChatService } from "../service/IChatService";

export default class ChatRouter extends ServerRouter {
  constructor(private chatService: IChatService, private router: IRouter) {
    super();
  }
  fetchRoutes(): IRouter {
    this.router.get("/", async (req, res) => {
      const { group_id } = req?.query;

      try {
        res.json(
          await this.chatService.getMessages(group_id as string, req.userId)
        );
      } catch (e) {
        this.sendError(res, e);
      }
    });

    return this.router;
  }
}
