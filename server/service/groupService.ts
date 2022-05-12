import HttpException from "../httpException.js";
import { groupNames, groups } from "../mockData.js";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupRepo } from "../repo/IGroupRepo";
import { IGroupService, searchResult } from "./IGroupService";

export class GroupCriteriaDto {
  constructor(
    public school: string | null,
    public gradeWanted: string | null,
    public frequency: string | null,
    public language: string | null,
    public maxGroupSize: number | null,
    public location: string | null,
    public subject: string | null,
    public workMethod: string | null
  ) {}
}

export class UserDto {
  constructor(
    public firstName: string,
    public lastName: string | null,
    public username: string,
    public email: string,
    public password: string
  ) {}
}

export class GroupDto {
  constructor(
    public isOpen: boolean | null,
    public groupCriteria: GroupCriteriaDto | null,
    public groupId: string | null,
    public groupMembers: UserDto[] | null
  ) {}
}

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

  async deleteMember(group: GroupDto, user: UserDto): Promise<boolean> {
    throw new HttpException("Not implemented!", 500);
  }

  async addMember(group: GroupDto, user: UserDto): Promise<boolean> {
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

  async updateGroup(group: GroupDto): Promise<boolean> {
    if (!group)
      throw new HttpException(
        "No group found in body. Expected {\ngroup: groupName\n}",
        400
      );
    throw new HttpException("Not implemented", 500);
  }

  async deleteGroup(group: GroupDto): Promise<boolean> {
    if (!group)
      throw new HttpException(
        "No group found in body. Expected {\ngroup: groupName\n}",
        400
      );
    throw new HttpException("Not implemented", 500);
  }

  async searchGroup(searchDto: SearchDTO): Promise<searchResult> {
    if (!searchDto) throw new HttpException("No searchDto provided", 400);

    let results: searchResult = {};

    for (const group of groups) {
      let score = 0;
      if (!group.groupId) continue; // TODO: Fjerne denne når vi har entities på plass.
      //const intersection = group.filter(element => searchDto.includes(element));
      // TODO: Lage en group entity / dto så jeg ikke bruker searchDto der..
      if (
        group?.groupCriteria?.subject?.toLowerCase() !==
        searchDto?.subject?.toLowerCase()
      )
        continue;
      if (
        group.groupCriteria?.gradeWanted?.toLowerCase() ===
        searchDto?.gradeGoal?.toLowerCase()
      )
        score++;
      if (group.groupCriteria?.maxGroupSize === searchDto?.size) score++;
      if (
        group.groupCriteria?.location?.toLowerCase() ===
        searchDto.place.toLowerCase()
      )
        score++;
      if (
        group.groupCriteria?.frequency?.toLowerCase() ===
        searchDto.frequency.toLowerCase()
      )
        score++;
      if (
        group.groupCriteria?.language?.toLowerCase() ===
        searchDto.language.toLowerCase()
      )
        score++;
      if (
        group.groupCriteria?.school?.toLowerCase() ===
        searchDto.school.toLowerCase()
      )
        score++;
      if (
        group.groupCriteria?.workMethod?.toLowerCase() ===
        searchDto?.workMethod.toLowerCase()
      )
        score++;
      results[group.groupId] = {
        group,
        score,
      };
    }
    return results;
  }
}
