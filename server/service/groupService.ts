import HttpException from "../httpException";
import { groups } from "../__mocks__/mockData";
import { SearchDTO } from "../dto/searchDTO";
import { searchResult } from "./IGroupService";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";
import { Repository } from "typeorm";
import { GroupEntity } from "../entity/GroupEntity";
import { SubjectRepo } from "../repo/SubjectRepo";
import { SubjectEntity } from "../entity/SubjectEntity";
import { SchoolRepo } from "../repo/SchoolRepo";
import { UserRepo } from "../repo/UserRepo";
import { GroupMemberRepo } from "../repo/GroupMemberRepo";
import { UserEntity } from "../entity/UserEntity";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import { groupDtoToEntity, groupEntityToDto } from "../dto/utils/groupMappers";
import { userEntityToDto } from "../dto/utils/userMappers";

export default class GroupService /*implements IGroupService*/ {
  constructor(public groupRepo: Repository<GroupEntity>) {}

  async fetchAllGroups(): Promise<GroupDto[]> {
    return await this.groupRepo.find().then((entities) => {
      return entities.map((entity) => {
        return groupEntityToDto(entity);
      });
    });
  }

  async addGroup(group: GroupDto): Promise<GroupDto> {
    const groupEntity = await this.checkSubjectsAndSchool(group);
    return await this.groupRepo
      .save(groupEntity)
      .then((entity) => groupEntityToDto(entity));
  }

  async fetchGroupById(groupId: string): Promise<GroupDto> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    return await this.groupRepo.findOneBy({ uuid: groupId }).then((entity) => {
      if (!entity) throw new Error("Group not found");
      return groupEntityToDto(entity);
    });
  }

  async deleteMember(groupId: string, userId: string): Promise<GroupDto> {
    const { user, group } = await this.fetchUserAndGroup(userId, groupId);

    const rowsAffected = await GroupMemberRepo.delete({
      user: user,
      group: group,
    }).then((response) => {
      return response.affected;
    });

    if (!rowsAffected) {
      throw new Error("Deletion failed");
    }
    return this.groupRepo.findOneBy({ uuid: groupId }).then((group) => {
      if (!group) {
        throw new Error("This error really shouldn't happen. Idk, aliens?");
      }
      return groupEntityToDto(group);
    });
  }

  async addMember(groupId: string, userId: string): Promise<GroupDto> {
    const { user, group } = await this.fetchUserAndGroup(userId, groupId);

    const newMember = new GroupMemberEntity(user, group, false);

    return await GroupMemberRepo.save(newMember).then((gme) => {
      return groupEntityToDto(gme.group);
    });
  }

  async fetchGroupMembers(groupId: string): Promise<UserDto[]> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    const members = new Array<UserDto>();
    await this.groupRepo.findOneBy({ uuid: groupId }).then(async (group) => {
      if (!group) throw new Error("Group not found");

      await GroupMemberRepo.find({
        where: { group },
        relations: ["user"],
      }).then((it) => {
        if (!it) throw new Error("Users not found");
        it.forEach((memberRow) => {
          members.push(userEntityToDto(memberRow.user));
        });
      });
    });
    if (members.length > 0) {
      return members;
    } else {
      throw new Error("Idk, aliens?");
    }
  }

  async updateGroup(group: GroupDto): Promise<GroupDto> {
    if (!group.uuid)
      throw new HttpException(
        "No group uuid found in body. Expected {\ngroup: groupName\n}",
        400
      );

    const groupEntity = await this.checkSubjectsAndSchool(group);
    return await this.groupRepo
      .save(groupEntity)
      .then((entity) => groupEntityToDto(entity));
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    if (!groupId)
      throw new HttpException(
        "No groupId found. Expected {\ngroupId: id\n}",
        400
      );
    await this.groupRepo.delete({ uuid: groupId }).then((result) => {
      return result.affected;
    });
    return false;
  }

  async searchGroup(searchDto: SearchDTO): Promise<searchResult> {
    if (!searchDto) throw new HttpException("No searchDto provided", 400);

    let results: searchResult = {};

    for (const group of groups) {
      let score = 0;
      if (!group.uuid) continue; // TODO: Fjerne denne når vi har entities på plass.
      // const intersection = group.criteria?.subject?.filter((element) =>
      //   searchDto.subject?.includes(element)
      // );
      // if (!intersection || intersection.length === 0) continue;
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
      // if (
      //   group.criteria?.school?.toLowerCase() ===
      //   searchDto.school?.toLowerCase()
      // )
      //   score++;
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

  private async checkSubjects(
    subjects: SubjectEntity[]
  ): Promise<SubjectEntity[]> {
    const checkedSubjects = new Array<SubjectEntity>();

    for (let i = 0; i < subjects.length; i++) {
      const checked = await SubjectRepo.findOrCreate(subjects[i]);
      checkedSubjects.push(checked);
    }
    return checkedSubjects;
  }

  private async fetchUserAndGroup(userId: string, groupId: string) {
    let user: UserEntity | null = null;
    let group: GroupEntity | null = null;

    await UserRepo.findOneBy({ uuid: userId }).then((it) => {
      if (it) user = it;
    });
    await this.groupRepo.findOneBy({ uuid: groupId }).then((it) => {
      if (it) group = it;
    });

    if (!user || !group) throw Error("Idk, aliens?");

    return { user, group };
  }

  private async checkSubjectsAndSchool(
    groupDto: GroupDto
  ): Promise<GroupEntity> {
    const groupEntity = groupDtoToEntity(groupDto);
    groupEntity.criteria.subjects = await this.checkSubjects(
      groupEntity.criteria.subjects
    );
    groupEntity.criteria.school = await SchoolRepo.findOrCreate(
      groupEntity.criteria.school
    );
    return groupEntity;
  }
}
