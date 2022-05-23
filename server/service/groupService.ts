import HttpException from "../util/httpException";
import { groups } from "../__mocks__/mockData";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupService, searchResult } from "./IGroupService";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";
import { Repository } from "typeorm";
import { GroupEntity } from "../entity/GroupEntity";
import { SubjectEntity } from "../entity/SubjectEntity";
import { UserEntity } from "../entity/UserEntity";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import { groupDtoToEntity, groupEntityToDto } from "../dto/utils/groupMappers";
import { userEntityToDto } from "../dto/utils/userMappers";
import { SchoolEntity } from "../entity/SchoolEntity";

export default class GroupService implements IGroupService {
  constructor(
    private groupRepo: Repository<GroupEntity>,
    private groupMemberRepo: Repository<GroupMemberEntity>,
    private schoolRepo: Repository<SchoolEntity>,
    private subjectRepo: Repository<SubjectEntity>,
    private userRepo: Repository<UserEntity>
  ) {}

  async fetchAllGroups(): Promise<GroupDto[]> {
    return await this.groupRepo
      .find()
      .then((entities) => {
        return entities.map((entity) => {
          return groupEntityToDto(entity);
        });
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async addGroup(group: GroupDto): Promise<GroupDto> {
    const groupEntity = await this.checkSubjectsAndSchool(group);
    return await this.groupRepo
      .save(groupEntity)
      .then((entity) => groupEntityToDto(entity))
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async fetchGroupById(groupId: string): Promise<GroupDto> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    return await this.groupRepo
      .findOneBy({ uuid: groupId })
      .then((entity) => {
        if (!entity) throw new HttpException("Group not found", 404);
        return groupEntityToDto(entity);
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async deleteMember(groupId: string, userId: string): Promise<GroupDto> {
    const { user, group } = await this.fetchUserAndGroup(userId, groupId).catch(
      (ex: HttpException) => {
        throw ex;
      }
    );

    const rowsAffected = await this.groupMemberRepo
      .delete({
        user: user,
        group: group,
      })
      .then((response) => {
        return response.affected;
      })
      .catch(() => {
        throw new HttpException("Deletion failed", 500);
      });

    if (!rowsAffected) {
      throw new HttpException("Deletion failed. No such user or group", 404);
    }
    return this.groupRepo
      .findOneBy({ uuid: groupId })
      .then((group) => {
        if (!group) {
          throw new HttpException("Database connection lost", 500);
        }
        return groupEntityToDto(group);
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async addMember(groupId: string, userId: string): Promise<GroupDto> {
    const { user, group } = await this.fetchUserAndGroup(userId, groupId).catch(
      (ex: HttpException) => {
        throw ex;
      }
    );

    const newMember = new GroupMemberEntity(user, group, false);

    return await this.groupMemberRepo
      .save(newMember)
      .then((gme) => {
        return groupEntityToDto(gme.group);
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
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
      if (!group) throw new HttpException("Group not found", 404);

      await this.groupMemberRepo
        .find({
          where: { group },
          relations: ["user"],
        })
        .then((it) => {
          if (!it) throw new HttpException("Users not found", 404);
          it.forEach((memberRow) => {
            members.push(userEntityToDto(memberRow.user));
          });
        })
        .catch(() => {
          throw new HttpException("Database connection lost", 500);
        });
    });
    if (members.length > 0) {
      return members;
    } else {
      throw new HttpException("Users not found", 404);
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
      .then((entity) => groupEntityToDto(entity))
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async deleteGroup(groupId: string): Promise<boolean> {
    if (!groupId)
      throw new HttpException(
        "No groupId found. Expected {\ngroupId: id\n}",
        400
      );
    await this.groupRepo
      .delete({ uuid: groupId })
      .then((result) => {
        return result.affected;
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
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
      const checked = await this.subjectRepo
        .findOrCreate(subjects[i])
        .catch(() => {
          throw new HttpException("Database connection lost", 500);
        });
      checkedSubjects.push(checked);
    }
    return checkedSubjects;
  }

  private async fetchUserAndGroup(userId: string, groupId: string) {
    let user: UserEntity | null = null;
    let group: GroupEntity | null = null;

    await this.userRepo
      .findOneBy({ uuid: userId })
      .then((it) => {
        if (it) user = it;
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
    await this.groupRepo
      .findOneBy({ uuid: groupId })
      .then((it) => {
        if (it) group = it;
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });

    if (!user || !group)
      throw new HttpException("User or group not found", 404);

    return { user, group };
  }

  private async checkSubjectsAndSchool(
    groupDto: GroupDto
  ): Promise<GroupEntity> {
    const groupEntity = groupDtoToEntity(groupDto);
    groupEntity.criteria.subjects = await this.checkSubjects(
      groupEntity.criteria.subjects
    ).catch((ex: HttpException) => {
      throw ex;
    });
    groupEntity.criteria.school = await this.schoolRepo
      .findOrCreate(groupEntity.criteria.school)
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
    return groupEntity;
  }
}
