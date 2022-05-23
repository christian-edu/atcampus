import { UserDto } from "./userDto";
import { GroupDto } from "./groupDto";

export class GroupMemberDto {
  constructor(
    public user: string,
    public group: string,
    public isAdmin: boolean
  ) {}
}
