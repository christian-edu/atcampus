import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { UserDto } from "../dto/userDto";
import bcrypt from "bcrypt";
import HttpException from "../util/httpException";
import { SchoolEntity } from "../entity/SchoolEntity";

export default class UserService {
  constructor(
    private userRepo: Repository<UserEntity>,
    private schoolRepo: Repository<SchoolEntity>
  ) {}

  public async addUser(userDto: UserDto) {
    const saltRounds = 10;
    let schoolEntity: SchoolEntity | null;
    try {
      schoolEntity = await this.schoolRepo.findOneBy({ uuid: userDto.school });
    } catch (e: any) {
      throw Error(e);
    }
    if (schoolEntity) {
      return bcrypt
        .hash(userDto.password, saltRounds)
        .then((hash) => this._addUser(userDto, hash, schoolEntity));
    }
  }

  private async _addUser(
    userDto: UserDto,
    hash: string,
    schoolEntity: SchoolEntity | null
  ) {
    const partialUserEntity = new UserEntity(
      userDto.username,
      userDto.email,
      hash,
      schoolEntity as SchoolEntity,
      userDto.firstName,
      userDto.lastName
    );
    try {
      if (schoolEntity && partialUserEntity) {
        return await this.userRepo.save(partialUserEntity);
      }
    } catch (e: any) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new HttpException("User already exists", 409);
      }
      throw new HttpException("Something went wrong", 500);
    }
  }

  public async findUserById(userId: string) {
    return await this.userRepo.findOneBy({ uuid: userId });
  }
}
