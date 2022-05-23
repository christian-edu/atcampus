import { IRouter, Response } from "express";
import HttpException from "../util/httpException";

export abstract class ServerRouter {
  sendError(res: Response, e: unknown) {
    if (!(e instanceof HttpException)) {
      res.status(500);
      res.send("Something went wrong!");
      return;
    }
    const httpException = e as HttpException;

    res.status(httpException.status);
    res.send({ message: httpException.message });
  }

  abstract fetchRoutes(): IRouter;
}
