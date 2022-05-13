import { IGroupRepo } from "../repo/IGroupRepo";
import { SearchDTO } from "../dto/searchDTO";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";

export type searchResult = {
  [key: string]: {
    group: GroupDto;
    score: number;
  };
};
export interface IGroupService {
  groupRepo: IGroupRepo;

  fetchAllGroups(): Promise<GroupDto[]>;

  addGroup(group: GroupDto): Promise<GroupDto>;

  fetchGroupById(groupId: string): Promise<GroupDto>;

  deleteMember(groupId: string, userId: string): Promise<GroupDto>;

  addMember(group: GroupDto, user: UserDto): Promise<GroupDto>;

  fetchGroupMembers(groupId: string): Promise<UserDto[]>;

  updateGroup(group: GroupDto): Promise<GroupDto>;

  deleteGroup(group: string): Promise<boolean>;

  searchGroup(searchDto: SearchDTO): Promise<searchResult>;
}