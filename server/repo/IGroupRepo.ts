import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";
import { SearchDTO } from "../dto/searchDTO";
import { GroupEntity } from "../entity/GroupEntity";
import { Repository } from "typeorm";

export interface IGroupRepo extends Repository<GroupEntity> {
  fetchAllGroups(): Promise<GroupDto[]>; // innebygd - find()

  addGroup(group: GroupDto): Promise<GroupDto>; // innebygd - save(GroupEntity)

  fetchGroupById(groupId: string): Promise<GroupDto>; // innebygd - findOneById()

  deleteMember(groupId: string, memberId: string): Promise<GroupDto>; // kan ligge i GroupMembersRepo?

  addMember(groupId: string, memberId: string): Promise<GroupDto>; // kan ligge i GroupMembersRepo?

  fetchGroupMembers(groupId: string): Promise<UserDto[]>; // kan ligge i GroupMembersRepo?

  updateGroup(group: GroupDto): Promise<GroupDto>; // innebygd - save(GroupEntity)

  deleteGroup(groupId: string): Promise<boolean>; // deleteGroup(group_uuid: string)

  searchGroup(searchDto: SearchDTO): Promise<GroupDto[]>; // Kanskje service burde ta seg av denne?
}
