import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";
import { SearchDTO } from "../dto/searchDTO";

export interface IGroupRepo {
  fetchAllGroups(): Promise<GroupDto[]>;

  addGroup(group: GroupDto): Promise<GroupDto>;

  fetchGroupById(groupId: string): Promise<GroupDto>;

  deleteMember(groupId: string, memberId: string): Promise<GroupDto>;

  addMember(groupId: string, memberId: string): Promise<GroupDto>;

  fetchGroupMembers(groupId: string): Promise<UserDto[]>;

  updateGroup(group: GroupDto): Promise<GroupDto>;

  deleteGroup(groupId: string): Promise<boolean>;

  searchGroup(searchDto: SearchDTO): Promise<GroupDto[]>;
}
