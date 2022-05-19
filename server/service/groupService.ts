import HttpException from "../httpException";
import { groups } from "../__mocks__/mockData";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupRepo } from "../repo/IGroupRepo";
import { IGroupService, searchResult } from "./IGroupService";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";
import { DeepPartial, Repository } from "typeorm";
import { GroupEntity } from "../entity/GroupEntity";
import { CriteriaEntity } from "../entity/CriteriaEntity";
import { SubjectRepo } from "../repo/SubjectRepo";
import { SubjectEntity } from "../entity/SubjectEntity";
import { SchoolRepo } from "../repo/SchoolRepo";
import { SchoolEntity } from "../entity/SchoolEntity";
import { UserRepo } from "../repo/UserRepo";
import { GroupCriteriaDto } from "../dto/groupCriteriaDto";
import { GroupMemberRepo } from "../repo/GroupMemberRepo";
import { UserEntity } from "../entity/UserEntity";

export default class GroupService /*implements IGroupService*/ {
  constructor(public groupRepo: Repository<GroupEntity>) {}

  async fetchAllGroups(): Promise<GroupEntity[]> {
    return await this.groupRepo.find();
  }

  async addGroup(group: GroupDto, user_uuid: string): Promise<GroupEntity> {
    this.createGroupEntityFromDto(group, user_uuid).then(async (group) => {
      return await this.groupRepo.save(group);
    });
    throw new Error("Something went wrong during saving");
  }

  async fetchGroupById(groupId: string): Promise<GroupEntity | null> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    return this.groupRepo.findOneBy({ uuid: groupId });
  }

  async deleteMember(groupId: string, userId: string): Promise<GroupEntity> {
    let user: UserEntity | null = null;
    let group: GroupEntity | null = null;

    await UserRepo.findOneBy({ uuid: userId }).then((it) => {
      if (it) user = it;
    });
    await this.groupRepo.findOneBy({ uuid: groupId }).then((it) => {
      if (it) group = it;
    });

    if (!user || !group) throw Error("Idk, aliens?");

    await GroupMemberRepo.delete({ user: user, group: group }).then(
      (response) => {
        if (response) {
          return group;
        } else {
          throw new Error("Idk, aliens?");
        }
      }
    );
    throw new Error("Idk, aliens?");
  }

  async addMember(groupId: string, userId: string): Promise<GroupDto> {
    return this.groupRepo.addMember(groupId, userId);
  }

  async fetchGroupMembers(groupId: string): Promise<UserEntity[]> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    const members = new Array<UserEntity>();
    await this.groupRepo.findOneBy({ uuid: groupId }).then(async (group) => {
      if (group) {
        await GroupMemberRepo.find({
          where: { group },
          relations: ["user"],
        }).then((it) => {
          it.forEach((memberRow) => {
            members.push(memberRow.user);
          });
        });
      }
    });
    if (members.length > 0) {
      return members;
    } else {
      throw new Error("Idk, aliens");
    }
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

  private async createGroupEntityFromDto(
    dto: GroupDto,
    user_uuid: string
  ): Promise<GroupEntity> {
    let newSchool: SchoolEntity;
    if (dto.criteria.school) {
      newSchool = await SchoolRepo.findOrCreate(
        new SchoolEntity(dto.criteria.school)
      );
    } else {
      newSchool = await SchoolRepo.findOrCreate(new SchoolEntity());
    }

    let newGroupSubjects: SubjectEntity[];
    if (dto.criteria.subject) {
      newGroupSubjects = this.createNewSubjects(dto.criteria.subject);
    } else {
      newGroupSubjects = new Array<SubjectEntity>();
    }

    const newCriteria = new CriteriaEntity(
      dto.criteria.gradeGoal,
      dto.criteria?.workFrequency,
      dto.criteria?.workType,
      dto.criteria?.maxSize,
      dto.criteria?.language,
      dto.criteria?.location,
      newGroupSubjects,
      newSchool
    );

    const admin = await UserRepo.findOne({ where: { uuid: user_uuid } });

    if (admin) {
      return new GroupEntity(dto.name, newCriteria, dto.isPrivate, admin);
    } else {
      throw new Error("No user with given ID found");
    }
  }

  private createNewSubjects(subjectStrings: string[]) {
    const newSubjectEntities = new Array<SubjectEntity>();

    subjectStrings.forEach(async (subject) => {
      const newSubject = await SubjectRepo.findOrCreate(
        new SubjectEntity(subject)
      );
      newSubjectEntities.push(newSubject);
    });

    return newSubjectEntities;
  }
}
