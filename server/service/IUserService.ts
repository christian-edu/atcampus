import { UserDto } from "../dto/userDto";
import { UserOutDto } from "../dto/UserInOutDto";

export interface IUserService {
  addUser(userDto: UserDto): Promise<UserOutDto | undefined>;

  findUserById(userId: string): Promise<UserOutDto>;

  findUserByEmailOrUserName({
    userName,
    email,
  }: {
    userName: string;
    email: string;
  }): Promise<UserOutDto[]>;
}
