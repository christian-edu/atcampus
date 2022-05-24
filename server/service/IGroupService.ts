import { GroupDto } from "../dto/groupDto";
import { GroupInDto, GroupOutDto } from "../dto/GroupInDto";
import { UserOutDto } from "../dto/UserInDto";
import { SearchDTO } from "../dto/searchDTO";
import { SubjectEntity } from "../entity/SubjectEntity";

export type searchResult = {
  [key: string]: {
    group: GroupDto;
    score: number;
  };
};
export interface IGroupService {
  fetchAllGroups(): Promise<GroupOutDto[]>;

  addGroup(group: GroupInDto): Promise<GroupDto>;

  fetchGroupById(groupId: string, userId: string): Promise<GroupOutDto>;

  deleteMember(groupId: string, userId: string): Promise<GroupDto>;

  addMember(group: string, user: string): Promise<GroupDto>;

  fetchGroupMembers(groupId: string): Promise<UserOutDto[]>;

  updateGroup(group: GroupInDto): Promise<GroupOutDto>;

  deleteGroup(group: string): Promise<boolean>;

  searchGroup(searchDto: SearchDTO): Promise<searchResult>;

  //createOrFetchSubjects(subjects: SubjectEntity[]): Promise<SubjectEntity[]>;
}
