import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import IAuthService from "./IAuthService";
import dotenv from "dotenv";
import HttpException from "../util/errorUtils";
import { v4 as uuid } from "uuid";

dotenv.config();
export default class AuthService implements IAuthService {
  constructor(private userRepo: Repository<UserEntity>) {}

  public async authenticateUser(
    userName: string | undefined,
    email: string | undefined,
    password: string
  ): Promise<string> {
    if (!userName && !email) {
      throw new HttpException("Username or email must be provided!", 400);
    }
    if (!password) throw new HttpException("Password must be provided!", 400);

    const userFromDb = await this.userRepo.findOne({
      where: { userName },
    });
    if (!userFromDb)
      throw new HttpException("Details provided did not match any user", 400);

    const user = userFromDb as UserEntity;
    const passwordsMatches = await bcrypt.compare(password, user.password);
    if (!passwordsMatches)
      throw new HttpException("Details provided did not match any user", 400);

    return AuthService.generateToken(user);
  }

  private static generateToken(user: UserEntity) {
    return jwt.sign(
      { userId: user.uuid, sessionId: uuid() },
      process.env.JWT_KEY as string,
      {
        expiresIn: "1h",
      }
    ); //
  }
}
