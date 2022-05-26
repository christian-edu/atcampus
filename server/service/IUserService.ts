import { UserDto } from "../dto/userDto";
import { UserOutDto } from "../dto/UserInOutDto";

export interface IUserService {
  addUser(userDto: UserDto): Promise<UserOutDto | undefined>;

  findUserById(userId: string): Promise<UserOutDto>;
}
