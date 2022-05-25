import { QueryFailedError } from "typeorm";
import { Error } from "sequelize";

export const queryFailedGuard = (
  err: any
): err is QueryFailedError & { code: string } & { message: string } =>
  err instanceof QueryFailedError;

export default class HttpException implements Error {
  constructor(
    public message: string,
    public status: number,
    public name: string = ""
  ) {}
}
