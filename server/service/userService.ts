import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { UserDto } from "../dto/userDto";
import bcrypt from "bcrypt";
import { SchoolEntity } from "../entity/SchoolEntity";
import { userEntityToDto } from "../dto/utils/userMappers";
import { GroupEntity } from "../entity/GroupEntity";
import { groupEntityToDto } from "../dto/utils/groupMappers";
import { UserOutDto } from "../dto/UserInOutDto";
import { GroupOutDto } from "../dto/GroupInOutDto";
import HttpException, { queryFailedGuard } from "../util/errorUtils";

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
      const hash = await bcrypt.hash(
        userDto.password,
        parseInt(process.env.SALT_ROUNDS!)
      );

      const user = this.mapUserEntity(userDto, hash, schoolEntity!);

      try {
        return userEntityToDto(await this.userRepo.save(user));
      } catch (e: unknown) {
        if (queryFailedGuard(e) && e.code === "ER_DUP_ENTRY") {
          throw new HttpException("User already exists", 409);
        } else this.handleException(e);
      }
    }
  }

  private handleException(e: unknown) {
    if (queryFailedGuard(e)) {
      throw new HttpException(e.message, 500);
    }
    throw new HttpException("Something went wrong", 500);
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

  public async findUserById(userId: string): Promise<UserOutDto> {
    let user;
    try {
      user = await this.userRepo.findOneBy({
        uuid: userId,
      });
    } catch (e) {
      this.handleException(e);
    }
    if (!user) throw new HttpException("Could not get user", 204);
    return userEntityToDto(user);
  }

  public async fetchGroupsByUserId(userId: string): Promise<GroupOutDto[]> {
    const groups = await this._fetchGroupsByUserId(userId);
    if (!groups || groups.length === 0)
      throw new HttpException("No groups found", 204);
    return Promise.all(
      groups.map(async (group) => await groupEntityToDto(group))
    );
  }

  private async _fetchGroupsByUserId(userId: string) {
    try {
      return await this.groupRepo.find({
        where: {
          users: {
            user: {
              uuid: userId,
            },
          },
        },
      });
    } catch (e) {
      this.handleException(e);
    }
  }
}
