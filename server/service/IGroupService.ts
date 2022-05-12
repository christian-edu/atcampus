import { IGroupRepo } from "../repo/IGroupRepo";
import { SearchDTO } from "../dto/searchDTO";
import { GroupDto, UserDto } from "./groupService";

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

  deleteMember(group: GroupDto, user: UserDto): Promise<boolean>;

  addMember(group: GroupDto, user: UserDto): Promise<boolean>;

  fetchGroupMembers(groupId: string): Promise<UserDto[]>;

  updateGroup(group: GroupDto): Promise<boolean>;

  deleteGroup(group: GroupDto): Promise<boolean>;

  searchGroup(searchDto: SearchDTO): Promise<searchResult>;
}
