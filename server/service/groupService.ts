import HttpException from "../util/httpException";
import { groups } from "../__mocks__/mockData";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupRepo } from "../repo/IGroupRepo";
import { IGroupService, searchResult } from "./IGroupService";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";

export default class GroupService implements IGroupService {
  constructor(public groupRepo: IGroupRepo) {}

  async fetchAllGroups(): Promise<GroupDto[]> {
    return this.groupRepo.fetchAllGroups();
  }

  async addGroup(group: GroupDto): Promise<GroupDto> {
    return this.groupRepo.addGroup(group);
  }

  async fetchGroupById(groupId: string): Promise<GroupDto> {
    return this.groupRepo.fetchGroupById(groupId);
  }

  async deleteMember(groupId: string, userId: string): Promise<GroupDto> {
    return this.groupRepo.deleteMember(groupId, userId);
  }

  async addMember(groupId: string, userId: string): Promise<GroupDto> {
    return this.groupRepo.addMember(groupId, userId);
  }

  async fetchGroupMembers(groupId: string): Promise<UserDto[]> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    return this.groupRepo.fetchGroupMembers(groupId);
  }

  async updateGroup(group: GroupDto): Promise<GroupDto> {
    if (!group)
      throw new HttpException(
        "No group found in body. Expected {\ngroup: groupName\n}",
        400
      );
    return this.groupRepo.updateGroup(group);
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    if (!groupId)
      throw new HttpException(
        "No groupId found. Expected {\ngroupId: id\n}",
        400
      );
    return this.groupRepo.deleteGroup(groupId);
  }

  async searchGroup(searchDto: SearchDTO): Promise<searchResult> {
    if (!searchDto) throw new HttpException("No searchDto provided", 400);

    let results: searchResult = {};

    for (const group of groups) {
      let score = 0;
      if (!group.uuid) continue; // TODO: Fjerne denne når vi har entities på plass.
      const intersection = group.criteria?.subject?.filter((element) =>
        searchDto.subject?.includes(element)
      );
      if (!intersection || intersection.length === 0) continue;
      if (
        group.criteria?.gradeGoal?.toLowerCase() ===
        searchDto?.gradeGoal?.toLowerCase()
      )
        score++;
      if (
        searchDto?.maxSize &&
        group.criteria?.maxSize === parseInt(searchDto.maxSize!)
      )
        score++;
      if (
        group.criteria?.location?.toLowerCase() ===
        searchDto.location?.toLowerCase()
      )
        score++;
      if (
        group.criteria?.workFrequency?.toLowerCase() ===
        searchDto.workFrequency?.toLowerCase()
      )
        score++;
      if (
        group.criteria?.language?.toLowerCase() ===
        searchDto.language?.toLowerCase()
      )
        score++;
      if (
        group.criteria?.school?.toLowerCase() ===
        searchDto.school?.toLowerCase()
      )
        score++;
      if (
        group.criteria?.workType?.toLowerCase() ===
        searchDto.workType?.toLowerCase()
      )
        score++;
      results[group.uuid] = {
        group,
        score,
      };
    }
    if (Object.keys(results).length === 0)
      throw new HttpException("No matching groups", 204);
    return results;
  }
}
