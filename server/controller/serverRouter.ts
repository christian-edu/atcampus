import { IRouter, Response } from "express";
import HttpException, { queryFailedGuard } from "../util/errorUtils";
import Logger from "../util/logger";

export abstract class ServerRouter {
  sendError(res: Response, e: unknown) {
    if (queryFailedGuard(e)) {
      Logger.error("server", e.message);
      res.status(500).json(JSON.stringify({ message: e.message }));
      return;
    }
    if (!(e instanceof HttpException)) {
      res
        .status(500)
        .json(JSON.stringify({ message: "Something went wrong!" }));
      Logger.error("server", e as string);
      return;
    }
    const httpException = e as HttpException;
    Logger.error("server", e.message);
    res
      .status(httpException.status)
      .send(JSON.stringify({ message: httpException.message }));
  }

  abstract fetchRoutes(): IRouter;
}
