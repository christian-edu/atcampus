import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";

export interface IGroupRepo {
  fetchAllGroups(): GroupDto[];

  addGroup(): GroupDto;

  fetchGroupById(): GroupDto;

  deleteMember(): boolean;

  addMember(): boolean;

  fetchGroupMembers(): UserDto[];

  updateGroup(): boolean;

  deleteGroup(): boolean;

  searchGroup(): GroupDto[];
}
