import HttpException from "../httpException";
import { groups } from "../mockData";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupRepo } from "../repo/IGroupRepo";
import { IGroupService, searchResult } from "./IGroupService";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";

export default class GroupService implements IGroupService {
  constructor(public groupRepo: IGroupRepo) {}

  async fetchAllGroups(): Promise<GroupDto[]> {
    return groups;
  }

  async addGroup(group: GroupDto): Promise<GroupDto> {
    groups.push(group);
    return group;
  }

  async fetchGroupById(groupId: string): Promise<GroupDto> {
    throw new HttpException("Not implemented!", 500);
  }

  async deleteMember(groupId: string, userId: string): Promise<GroupDto> {
    throw new HttpException("Not implemented!", 500);
  }

  async addMember(group: GroupDto, user: UserDto): Promise<GroupDto> {
    throw new HttpException("Not implemented", 500);
  }

  async fetchGroupMembers(groupId: string): Promise<UserDto[]> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    throw new HttpException("Not implemented", 500);
  }

  async updateGroup(group: GroupDto): Promise<GroupDto> {
    if (!group)
      throw new HttpException(
        "No group found in body. Expected {\ngroup: groupName\n}",
        400
      );
    throw new HttpException("Not implemented", 500);
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    if (!groupId)
      throw new HttpException(
        "No groupId found. Expected {\ngroupId: id\n}",
        400
      );
    throw new HttpException("Not implemented", 500);
  }

  async searchGroup(searchDto: SearchDTO): Promise<searchResult> {
    if (!searchDto) throw new HttpException("No searchDto provided", 400);

    let results: searchResult = {};

    for (const group of groups) {
      let score = 0;
      if (!group.uuid) continue; // TODO: Fjerne denne når vi har entities på plass.
      //const intersection = group.filter(element => searchDto.includes(element));
      // TODO: Lage en group entity / dto så jeg ikke bruker searchDto der..
      // if (
      //   group?.criteria?.subject?.toLowerCase() !==
      //   searchDto?.subject?.toLowerCase()
      // )
      //   continue;
      if (
        group.criteria?.gradeGoal?.toLowerCase() ===
        searchDto?.gradeGoal?.toLowerCase()
      )
        score++;
      if (group.criteria?.maxSize === searchDto?.maxSize) score++;
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
    return results;
  }
}
