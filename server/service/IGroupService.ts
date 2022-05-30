import { GroupInDto, GroupOutDto } from "../dto/GroupInOutDto";
import { UserOutDto } from "../dto/UserInOutDto";
import { CriteriaDto } from "../dto/criteriaDto";

export type searchResult = {
  [key: string]: {
    group: GroupOutDto;
    score: number;
  };
};
export interface IGroupService {
  fetchAllGroups(groupName?: string): Promise<GroupOutDto[]>;

  addGroup(group: GroupInDto, adminUuid: string): Promise<GroupOutDto>;

  fetchGroupById(groupId: string): Promise<GroupOutDto>;

  deleteMember(groupId: string, userId: string): Promise<GroupOutDto>;

  addMember(group: string, user: string): Promise<GroupOutDto>;

  fetchGroupMembers(groupId: string): Promise<UserOutDto[]>;

  updateGroup(group: GroupInDto): Promise<GroupOutDto>;

  deleteGroup(group: string): Promise<boolean>;

  searchGroup(
    searchDto: CriteriaDto,
    groupName?: string
  ): Promise<GroupOutDto[] | searchResult>;
}
