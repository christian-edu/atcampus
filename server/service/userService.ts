import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { UserDto } from "../dto/userDto";
import bcrypt from "bcrypt";
import HttpException from "../util/httpException";
import { SchoolEntity } from "../entity/SchoolEntity";

export default class UserService {
  constructor(private userRepo: Repository<UserEntity>) {}

  public async addUser(userDto: UserDto, school: string) {
    const saltRounds = 10;
    bcrypt
      .hash(userDto.password, saltRounds)
      .then((hash) => {
        const userEntity = new UserEntity(
          userDto.username,
          userDto.email,
          hash
        );
        try {
          this.userRepo.save(userEntity);
        } catch (e: any) {
          if (e.code === "ER_DUP_ENTRY") {
            throw new HttpException("User already exists", 409);
          }
          throw new HttpException("Something went wrong", 500);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async findUserById(userId: string) {
    return await this.userRepo.findOneBy({ uuid: userId });
  }
}
