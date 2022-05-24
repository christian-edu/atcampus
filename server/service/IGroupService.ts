import { GroupInDto, GroupOutDto } from "../dto/GroupInOutDto";
import { UserOutDto } from "../dto/UserInDto";
import { SearchDTO } from "../dto/searchDTO";

export type searchResult = {
  [key: string]: {
    group: GroupOutDto;
    score: number;
  };
};
export interface IGroupService {
  fetchAllGroups(): Promise<GroupOutDto[]>;

  addGroup(group: GroupInDto): Promise<GroupOutDto>;

  fetchGroupById(groupId: string): Promise<GroupOutDto>;

  deleteMember(groupId: string, userId: string): Promise<GroupOutDto>;

  addMember(group: string, user: string): Promise<GroupOutDto>;

  fetchGroupMembers(groupId: string): Promise<UserOutDto[]>;

  updateGroup(group: GroupInDto): Promise<GroupOutDto>;

  deleteGroup(group: string): Promise<boolean>;

  searchGroup(searchDto: SearchDTO): Promise<GroupOutDto[] | searchResult>;
}
