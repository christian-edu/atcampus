import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { UserDto } from "../dto/userDto";
import bcrypt from "bcrypt";
import HttpException from "../util/httpException";
import { SchoolEntity } from "../entity/SchoolEntity";
import { userEntityToDto } from "../dto/utils/userMappers";
import { GroupEntity } from "../entity/GroupEntity";

export default class UserService {
  constructor(
    private userRepo: Repository<UserEntity>,
    private schoolRepo: Repository<SchoolEntity>,
    private groupRepo: Repository<GroupEntity>
  ) {}

  public async addUser(userDto: UserDto) {
    let schoolEntity: SchoolEntity | null;
    try {
      schoolEntity = await this.schoolRepo.findOneBy({ uuid: userDto.school });
    } catch (e: any) {
      throw Error(e);
    }
    if (schoolEntity) {
      return bcrypt
        .hash(userDto.password, parseInt(process.env.SALT_ROUNDS!))
        .then(async (hash) => {
          const user = this.mapUserEntity(userDto, hash, schoolEntity!);

          try {
            return await this.userRepo.save(user);
          } catch (e: any) {
            if (e.code === "ER_DUP_ENTRY") {
              throw new HttpException("User already exists", 409);
            }
            throw new HttpException("Something went wrong", 500);
          }
        });
    }
  }

  private mapUserEntity(
    userDto: UserDto,
    hash: string,
    schoolEntity: SchoolEntity
  ) {
    return new UserEntity(
      userDto.username,
      userDto.email,
      hash,
      schoolEntity as SchoolEntity,
      userDto.firstName,
      userDto.lastName
    );
  }

  public async findUserById(userId: string) {
    // legge til DTO.
    try {
      const user = await this.userRepo.findOneBy({
        uuid: userId,
      });
      if (!user) throw new HttpException("Could not get user", 400);
      return userEntityToDto(user);
    } catch (e) {
      throw new HttpException("Something went wrong!", 500);
    }
  }

  public async getGroupsByUserId(userId: string) {
    try {
      const groups = await this.groupRepo.find({
        where: {
          users: {
            uuid: userId,
          },
        },
      });
    } catch (e) {}
  }
  // getGroupsByUserId
}
