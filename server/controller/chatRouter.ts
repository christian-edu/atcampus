import { ServerRouter } from "./serverRouter";
import ChatService from "../service/chatService";
import { IRouter } from "express";

export default class ChatRouter extends ServerRouter {
  constructor(private chatService: ChatService, private router: IRouter) {
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
