import { IGroupRepo } from "../repo/IGroupRepo";
import { GroupDto } from "../dto/groupDto";
import HttpException from "../util/httpException";
import { UserDto } from "../dto/userDto";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupService, searchResult } from "../service/IGroupService";
import { groups, users } from "./mockData";
import { Repository } from "typeorm";
import { GroupEntity } from "../entity/GroupEntity";

export default class MockGroupService {
  constructor(public groupRepo: Repository<GroupEntity>) {}

  async fetchAllGroups(): Promise<GroupDto[]> {
    return groups;
  }

  async addGroup(group: GroupDto): Promise<GroupDto> {
    return group;
  }

  async fetchGroupById(groupId: string): Promise<GroupDto> {
    return groups[0];
  }

  async deleteMember(groupId: string, userId: string): Promise<GroupDto> {
    return groups[0];
  }

  async addMember(groupId: string, userId: string): Promise<GroupDto> {
    return groups[0];
  }

  async fetchGroupMembers(groupId: string): Promise<UserDto[]> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    return users;
  }

  async updateGroup(group: GroupDto): Promise<GroupDto> {
    if (!group)
      throw new HttpException(
        "No group found in body. Expected {\ngroup: groupName\n}",
        400
      );
    return group;
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    if (!groupId)
      throw new HttpException(
        "No groupId found. Expected {\ngroupId: id\n}",
        400
      );
    return true;
  }

  async searchGroup(searchDto: SearchDTO): Promise<GroupDto[]> {
    //if (!searchDto) throw new HttpException("No searchDto provided", 400);

    return groups;
  }
}
