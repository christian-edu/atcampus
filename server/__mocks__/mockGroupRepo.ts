import { IGroupRepo } from "../repo/IGroupRepo";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";
import { groups, users } from "./mockData";
import { SearchDTO } from "../dto/searchDTO";

export default class MockGroupRepo implements IGroupRepo {
  async addGroup(group: GroupDto): Promise<GroupDto> {
    return group;
  }

  async addMember(groupId: string, memberId: string): Promise<GroupDto> {
    return groups[0];
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    return false;
  }

  async deleteMember(groupId: string, memberId: string): Promise<GroupDto> {
    return groups[0];
  }

  async fetchAllGroups(): Promise<GroupDto[]> {
    return groups;
  }

  async fetchGroupById(groupId: string): Promise<GroupDto> {
    return groups[0];
  }

  async fetchGroupMembers(groupId: string): Promise<UserDto[]> {
    return users;
  }

  async searchGroup(searchDto: SearchDTO): Promise<GroupDto[]> {
    return groups;
  }

  async updateGroup(group: GroupDto): Promise<GroupDto> {
    return group;
  }
}
