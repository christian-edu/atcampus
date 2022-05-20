import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { UserDto } from "../dto/userDto";
import bcrypt from "bcrypt";
import HttpException from "../util/httpException";

export default class UserService {
  constructor(private userRepo: Repository<UserEntity>) {}

  public async addUser(userDto: UserDto) {
    const saltRounds = 10;
    bcrypt
      .hash(userDto.password, saltRounds)
      .then((hash) => {
        const userEntity = new UserEntity(
          userDto.username,
          userDto.email,
          hash
        );
      })
      .catch((e) => {
        throw new HttpException("Something went wrong", 500);
      });
  }

  public async findUserById(userId: string) {
    return await this.userRepo.findOneBy({ uuid: userId });
  }
}
