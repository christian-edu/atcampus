import { Error } from "sequelize";

export default class HttpException implements Error {
  constructor(
    public message: string,
    public status: number,
    public name: string = ""
  ) {}
}
