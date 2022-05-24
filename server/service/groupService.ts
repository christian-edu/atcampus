import HttpException from "../util/httpException";
import { SearchDTO } from "../dto/searchDTO";
import { IGroupService, searchResult } from "./IGroupService";
import { GroupDto } from "../dto/groupDto";
import { DeleteResult, Repository } from "typeorm";
import { GroupEntity } from "../entity/GroupEntity";
import { SubjectEntity } from "../entity/SubjectEntity";
import { UserEntity } from "../entity/UserEntity";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import {
  groupEntityToDto,
  newGroupEntityFromDto,
} from "../dto/utils/groupMappers";
import { userEntityToDto } from "../dto/utils/userMappers";
import { SearchWeightValues } from "./enums/SearchWeightValues";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";
import { SchoolEntity } from "../entity/SchoolEntity";
import { GroupInDto, GroupOutDto, GroupUpdateDto } from "../dto/GroupInDto";
import { UserOutDto } from "../dto/UserInDto";

export default class GroupService implements IGroupService {
  constructor(
    private groupRepo: Repository<GroupEntity>,
    private groupMemberRepo: Repository<GroupMemberEntity>,
    private schoolRepo: Repository<SchoolEntity>,
    private subjectRepo: Repository<SubjectEntity>,
    private userRepo: Repository<UserEntity>
  ) {}

  async fetchAllGroups(): Promise<GroupOutDto[]> {
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

  async addGroup(group: GroupInDto): Promise<GroupDto> {
    const admin = await this.userRepo
      .findOneBy({ uuid: group.admin_uuid })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });

    let groupEntity: GroupEntity;
    if (admin != null) {
      groupEntity = newGroupEntityFromDto(group, admin);
      const { subjects, school } = await this.createOrFetchSubjectsAndSchool(
        groupEntity.criteria.school,
        groupEntity.criteria.subjects
      );
      groupEntity.criteria.school = school;
      groupEntity.criteria.subjects = subjects;
    } else {
      throw new HttpException("User not found", 404);
    }

    return await this.groupRepo
      .save(groupEntity)
      .then((entity) => groupEntityToDto(entity))
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async fetchGroupById(groupId: string): Promise<GroupOutDto> {
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

  async deleteMember(groupId: string, userId: string): Promise<GroupOutDto> {
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
      .then((response: DeleteResult) => {
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

  async addMember(groupId: string, userId: string): Promise<GroupOutDto> {
    const { user, group } = await this.fetchUserAndGroup(userId, groupId).catch(
      (ex: HttpException) => {
        throw ex;
      }
    );

    const newMember = new GroupMemberEntity();
    newMember.user = user;
    newMember.group = group;
    newMember.is_admin = false;

    return await this.groupMemberRepo
      .save(newMember)
      .then((gme: GroupMemberEntity) => {
        return groupEntityToDto(gme.group);
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
  }

  async fetchGroupMembers(groupId: string): Promise<UserOutDto[]> {
    if (!groupId)
      throw new HttpException(
        "group_id request parameter must be specified",
        400
      );
    const members = new Array<UserOutDto>();
    await this.groupRepo.findOneBy({ uuid: groupId }).then(async (group) => {
      if (!group) throw new HttpException("Group not found", 404);

      await this.groupMemberRepo
        .find({
          where: { group },
          relations: ["user"],
        })
        .then((it: GroupMemberEntity[]) => {
          if (!it) throw new HttpException("Users not found", 404);
          it.forEach((memberRow: GroupMemberEntity) => {
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

  async updateGroup(group: GroupInDto): Promise<GroupOutDto> {
    if (!group.uuid)
      throw new HttpException(
        "No group uuid found in body. Expected {\ngroup: groupName\n}",
        400
      );

    const groupEntity = await this.groupRepo
      .findOneBy({ uuid: group.uuid })
      .then((it) => {
        if (!it) throw new HttpException("Group not found", 404);
        return it;
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });

    // TODO: finish this travesty
    if (group.name && group.name !== groupEntity.name) {
      groupEntity.name = group.name;
    }

    if (group.rules && group.rules !== groupEntity.rules) {
      groupEntity.rules = group.rules;
    }

    if (
      group.isPrivate !== undefined &&
      group.isPrivate !== groupEntity.isPrivate
    ) {
      groupEntity.isPrivate = group.isPrivate;
    }

    if (
      group.criteria.gradeGoal &&
      group.criteria.gradeGoal !== groupEntity.criteria.grade_goal
    ) {
      groupEntity.criteria.grade_goal = group.criteria.gradeGoal;
    }

    if (
      group.criteria.workFrequency &&
      group.criteria.workFrequency !== groupEntity.criteria.work_frequency
    ) {
      groupEntity.criteria.work_frequency = group.criteria.workFrequency;
    }

    if (
      group.criteria.language &&
      group.criteria.language !== groupEntity.criteria.language
    ) {
      groupEntity.criteria.language = group.criteria.language;
    }

    if (
      group.criteria.maxSize &&
      group.criteria.maxSize !== groupEntity.criteria.max_size
    ) {
      groupEntity.criteria.max_size = group.criteria.maxSize;
    }

    if (
      group.criteria.location &&
      group.criteria.location !== groupEntity.criteria.location
    ) {
      groupEntity.criteria.location = group.criteria.location;
    }

    if (
      group.criteria.workType &&
      group.criteria.workType !== groupEntity.criteria.work_type
    ) {
      groupEntity.criteria.work_type = group.criteria.workType;
    }

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

    const allGroups = await this.fetchAllGroups().catch((ex) => {
      throw ex;
    });

    const tempResult: searchResult = {};

    function checkGradeGoal(group: GroupDto, score: number) {
      if (group.criteria.gradeGoal === searchDto.gradeGoal) {
        score =
          score +
          Math.round(
            SearchWeightValues.GRADE_GOAL / SearchWeightValues.MAX / 100
          );
      }
      return score;
    }

    function checkWorkFrequency(group: GroupDto, score: number) {
      if (group.criteria.workFrequency === searchDto.workFrequency) {
        score =
          score +
          Math.round(
            SearchWeightValues.WORK_FREQUENCY / SearchWeightValues.MAX / 100
          );
      } else if (
        searchDto.workFrequency === WorkFrequency.ANY ||
        !group.criteria.workFrequency
      ) {
        score =
          score +
          Math.round(
            SearchWeightValues.WORK_FREQUENCY / SearchWeightValues.MAX / 100
          ) /
            2;
      }
      return score;
    }

    function checkWorkMethod(group: GroupDto, score: number) {
      if (group.criteria.workType === searchDto.workType) {
        score =
          score +
          Math.round(
            SearchWeightValues.WORK_TYPE / SearchWeightValues.MAX / 100
          );
      } else if (
        searchDto.workType === WorkType.ANY ||
        !group.criteria.workType
      ) {
        score =
          score +
          Math.round(
            SearchWeightValues.WORK_TYPE / SearchWeightValues.MAX / 100
          ) /
            2;
      }
      return score;
    }

    function checkSize(group: GroupDto, score: number) {
      if (group.criteria.maxSize === searchDto.maxSize) {
        score =
          score +
          Math.round(
            SearchWeightValues.MAX_SIZE / SearchWeightValues.MAX / 100
          );
      }
      return score;
    }

    function checkLanguage(group: GroupDto, score: number) {
      if (group.criteria.language === searchDto.language) {
        score =
          score +
          Math.round(
            SearchWeightValues.LANGUAGE / SearchWeightValues.MAX / 100
          );
      } else if (!searchDto.language || group.criteria.language === "") {
        score =
          score +
          Math.round(
            SearchWeightValues.LANGUAGE / SearchWeightValues.MAX / 100
          ) /
            2;
      }
      return score;
    }

    function checkLocation(group: GroupDto, score: number) {
      if (group.criteria.location === searchDto.location) {
        score =
          score +
          Math.round(
            SearchWeightValues.LOCATION / SearchWeightValues.MAX / 100
          );
      } else if (!searchDto.location || group.criteria.location === "") {
        score =
          score +
          Math.round(
            SearchWeightValues.LOCATION / SearchWeightValues.MAX / 100
          ) /
            2;
      }
      return score;
    }

    function checkSchool(group: GroupDto, score: number) {
      if (group.criteria.school === searchDto.school) {
        score =
          score +
          Math.round(SearchWeightValues.SCHOOL / SearchWeightValues.MAX / 100);
      } else if (!searchDto.school || group.criteria.school === "Ikke satt") {
        score =
          score +
          Math.round(SearchWeightValues.SCHOOL / SearchWeightValues.MAX / 100) /
            2;
      }
      return score;
    }

    function checkSubjects(group: GroupDto, score: number) {
      if (searchDto.subject) {
        const scorePerSubject =
          Math.round(
            SearchWeightValues.SUBJECTS / SearchWeightValues.MAX / 100
          ) / searchDto.subject?.length;
        searchDto.subject.forEach((sub) => {
          if (group.criteria.subject) {
            if (group.criteria.subject.includes(sub)) {
              score = score + scorePerSubject;
            }
          }
        });
      }
      return score;
    }

    // kanskje bedre med vanlig for-loop pga effektivitet?
    allGroups.forEach((group) => {
      let score = 0;

      //Karaktermål
      // Burde være mulig å sette opp lavere poengsum om man er 1 karakter unna
      score = checkGradeGoal(group, score);

      // Arbeidsfrekvens
      score = checkWorkFrequency(group, score);

      // Arbeidsmetode
      score = checkWorkMethod(group, score);

      // Maks gruppestørrelse
      // Foreløpig versjon, må være mer forseggjort
      score = checkSize(group, score);

      // Språk
      score = checkLanguage(group, score);

      // Sted
      score = checkLocation(group, score);

      // Skole
      score = checkSchool(group, score);

      // Emner
      score = checkSubjects(group, score);

      // Tar høyde for avrundingsfeil
      if (score > 100) score = 100;

      if (!group.uuid) {
        // Dette kan aldri skje, men TypeScript
        // blir sint på meg om jeg ikke har det med
        tempResult[group.name] = { group, score };
      } else {
        tempResult[group.uuid] = { group, score };
      }
    });

    // Dette er en hacky løsning, og MÅ refaktoreres
    const resultArray = Object.entries(tempResult)
      .sort(([, a], [, b]) => a.score - b.score)
      .slice(0, 20); // tar bare de 20 beste resultatene

    const actualResult: searchResult = {};

    resultArray.forEach((element) => {
      actualResult[element[0]] = element[1];
    });

    return actualResult;
  }

  private async createOrFetchSubjects(
    subjects: SubjectEntity[]
  ): Promise<SubjectEntity[]> {
    const checkedSubjects = new Array<SubjectEntity>();

    for (let i = 0; i < subjects.length; i++) {
      const checked = await this.subjectRepo
        .findOneByOrFail({ name: subjects[i].name })
        .then(async (foundSubject) => {
          if (!foundSubject) {
            return await this.subjectRepo
              .save(subjects[i])
              .then((savedSubject) => {
                return savedSubject;
              });
          }
          return foundSubject;
        })
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
      .then((it: UserEntity | null) => {
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

  private async createOrFetchSubjectsAndSchool(
    school: SchoolEntity,
    subjects?: SubjectEntity[]
  ) {
    if (subjects) {
      subjects = await this.createOrFetchSubjects(subjects).catch(
        (ex: HttpException) => {
          throw ex;
        }
      );
    }
    school = await this.schoolRepo
      .findOneByOrFail({ name: school.name })
      .then(async (foundSchool) => {
        if (!foundSchool) {
          return this.groupRepo.save(school).then((savedSchool) => {
            return savedSchool;
          });
        }
        return foundSchool;
      })
      .catch(() => {
        throw new HttpException("Database connection lost", 500);
      });
    return { subjects, school };
  }
}
