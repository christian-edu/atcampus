import { UserDto } from "../dto/userDto";
import { UserOutDto } from "../dto/UserInOutDto";
import { GroupOutDto } from "../dto/GroupInOutDto";

export interface IUserService {
  addUser(userDto: UserDto): Promise<UserOutDto | undefined>;

  findUserById(userId: string): Promise<UserOutDto>;
  fetchGroupsByUserId(groupId: string): Promise<GroupOutDto[]>;
  findUserByEmailOrUserName({
    userName,
    email,
  }: {
    userName: string;
    email: string;
  }): Promise<UserOutDto[]>;
}
