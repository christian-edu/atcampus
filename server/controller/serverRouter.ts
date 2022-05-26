import { IRouter, Response } from "express";
import HttpException, { queryFailedGuard } from "../util/errorUtils";
import Logger from "../util/logger";

export abstract class ServerRouter {
  sendError(res: Response, e: unknown) {
    if (queryFailedGuard(e)) {
      res.status(500);
      Logger.error("server", e.message);
      res.send(e.message);
      return;
    }
    if (!(e instanceof HttpException)) {
      res.status(500);
      Logger.error("server", e as string);
      res.send("Something went wrong!");
      return;
    }
    const httpException = e as HttpException;
    Logger.error("server", e.message);
    res.status(httpException.status);
    res.send({ message: httpException.message });
  }

  abstract fetchRoutes(): IRouter;
}
