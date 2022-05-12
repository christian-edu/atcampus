import { GroupDto, UserDto } from "../service/groupService";

export interface IGroupServiceRepo {
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
