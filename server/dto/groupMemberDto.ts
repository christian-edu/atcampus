import { UserDto } from "./userDto";
import { GroupDto } from "./groupDto";

export class GroupMemberDto {
  constructor(
    public user: UserDto,
    public group: GroupDto,
    public isAdmin: boolean,
    public uuid?: string
  ) {}
}
