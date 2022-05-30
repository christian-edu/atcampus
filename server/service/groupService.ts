import { IGroupService, searchResult } from "./IGroupService";
import { Like, QueryFailedError, Repository } from "typeorm";
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
import { GroupInDto, GroupOutDto } from "../dto/GroupInOutDto";
import { UserOutDto } from "../dto/UserInOutDto";
import { CriteriaDto } from "../dto/criteriaDto";
import { MaxSize } from "../entity/enums/MaxSize";
import HttpException, { queryFailedGuard } from "../util/errorUtils";
import { CriteriaEntity } from "../entity/CriteriaEntity";
import { GradeGoal } from "../entity/enums/GradeGoal";
import Logger from "../util/logger";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";

export default class GroupService implements IGroupService {
  constructor(
    private groupRepo: Repository<GroupEntity>,
    private groupMemberRepo: Repository<GroupMemberEntity>,
    private schoolRepo: Repository<SchoolEntity>,
    private subjectRepo: Repository<SubjectEntity>,
    private userRepo: Repository<UserEntity>,
    private criteriaRepo: Repository<CriteriaEntity>,
    private chatMessageRepo: Repository<ChatMessageEntity>
  ) {}

  // Testet manuelt, virker som den skal
  async fetchAllGroups(groupName?: string): Promise<GroupOutDto[]> {
    if (groupName) {
      return await this.findGroupByName(groupName);
    }
    return await this.groupRepo
      .findBy({ isPrivate: false })
      .then(async (array) => {
        return await Promise.all(
          array.map(async (entity) => {
            return await groupEntityToDto(entity);
          })
        );
      });
  }

  // Testet manuelt, virker som den skal
  async addGroup(group: GroupInDto, adminUuid: string): Promise<GroupOutDto> {
    const admin = await this.userRepo
      .findOneBy({ uuid: adminUuid })
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        Logger.error("group_service", (ex as QueryFailedError).message);

        throw new HttpException("Database connection lost", 500);
      });
    let groupEntity: GroupEntity;
    if (admin != null) {
      groupEntity = newGroupEntityFromDto(group);
      const { subjects, school } = await this.createOrFetchSubjectsAndSchool(
        groupEntity.criteria.school,
        groupEntity.criteria.subjects
      ).catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        Logger.error("group_service", (ex as QueryFailedError).message);

        throw new HttpException("Database connection lost", 500);
      });
      groupEntity.criteria.school = school;
      groupEntity.criteria.subjects = subjects;
      let groupCriteriaRes = await this._saveGroupCriteria(
        groupEntity.criteria
      );

      let groupEntityRes = await this._saveGroupEntity(
        groupCriteriaRes,
        groupEntity
      );

      await this._saveGroupMemberEntity(groupEntityRes, admin);
    } else {
      throw new HttpException("User not found", 404);
    }

    return await this.groupRepo
      .save(groupEntity)
      .then((entity) => groupEntityToDto(entity))
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        Logger.error("group_service", (ex as QueryFailedError).message);
        throw new HttpException("Database connection lost", 500);
      });
  }

  // Testet manuelt, virker som den skal
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
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        Logger.error("GroupService", ex);
        throw new HttpException("Database connection lost", 500);
      });
  }

  // Testet manuelt, virker som den skal
  async deleteMember(groupId: string, userId: string): Promise<GroupOutDto> {
    return await this.fetchUserAndGroup(userId, groupId)
      .then(async ({ foundUser: user, foundGroup: group }) => {
        return await this.groupMemberRepo.findOneBy({
          user: { uuid: user.uuid },
          group: { uuid: group.uuid },
        });
      })
      .then(async (memberEntity) => {
        if (!memberEntity) {
          throw new HttpException(
            "Deletion failed. No such user or group",
            404
          );
        }
        return await this.groupMemberRepo.remove(memberEntity);
      })
      .then((response) => {
        if (!response)
          throw new HttpException("Deletion failed. No rows affected", 500);
        return this.groupRepo
          .findOneBy({ uuid: groupId })
          .then(async (group) => {
            if (!group) {
              throw new HttpException(
                "Database connection lost, group not retrieved",
                500
              );
            }
            return await groupEntityToDto(group);
          })
          .catch((ex) => {
            if (ex instanceof HttpException) throw ex;
            Logger.error("GroupService", ex);
            throw new HttpException("Database connection lost", 500);
          });
      });
  }

  // Testet manuelt, virker som den skal
  async addMember(groupId: string, userId: string): Promise<GroupOutDto> {
    return await this.fetchUserAndGroup(userId, groupId).then(
      async ({ foundUser: user, foundGroup: group }) => {
        const newMember = new GroupMemberEntity();
        newMember.user = user;
        newMember.group = group;
        newMember.is_admin = false;

        return await this.groupMemberRepo
          .save(newMember)
          .then((gme: GroupMemberEntity) => {
            return groupEntityToDto(gme.group);
          })
          .catch((ex) => {
            if (ex instanceof HttpException) throw ex;
            Logger.error("GroupService", ex);
            throw ex;
          });
      }
    );
  }

  // Testet manuelt, virker som den skal
  async fetchGroupMembers(groupId: string): Promise<UserOutDto[]> {
    if (!groupId)
      throw new HttpException(
        "groupId request parameter must be specified",
        400
      );

    return await this.groupRepo
      .findOneBy({ uuid: groupId })
      .then(async (group) => {
        if (!group) throw new HttpException("Group not found", 404);
        if (!group.users)
          throw new HttpException("GroupMemberEntities not found", 404);
        return await group.users.then((users) => {
          return users.map((user) => {
            return userEntityToDto(user.user);
          });
        });
      });
  }

  // Virker IKKE
  async updateGroup(group: GroupInDto): Promise<GroupOutDto> {
    if (!group.uuid) throw new HttpException("No group uuid found", 400);

    return await this.groupRepo
      .findOneBy({ uuid: group.uuid })
      .then(async (groupEntity) => {
        if (!groupEntity) throw new HttpException("Group not found", 404);
        group.criteria.uuid = groupEntity.criteria.uuid;
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
        if (
          group.criteria.school &&
          group.criteria.school !== groupEntity.criteria.school.name
        ) {
          groupEntity.criteria.school = await this.createOrFetchSchool(
            new SchoolEntity(group.criteria.school)
          )
            .then((it) => {
              if (it instanceof SchoolEntity) return it;
              throw new HttpException("ORM error", 500);
            })
            .catch((ex) => {
              if (ex instanceof HttpException) throw ex;
              throw new HttpException("Database connection lost", 500);
            });
        }

        if (group.criteria.subjects) {
          const subjectsToCheck = group.criteria.subjects.map((subject) => {
            return new SubjectEntity(subject);
          });
          if (!groupEntity.criteria.subjects) {
            groupEntity.criteria.subjects = await this.createOrFetchSubjects(
              subjectsToCheck
            ).catch((ex) => {
              if (ex instanceof HttpException) throw ex;
              throw new HttpException("Database connection lost", 500);
            });
          } else {
            const oldSubjects = groupEntity.criteria.subjects.map((subject) => {
              return subject.name;
            });
            if (
              group.criteria.subjects.sort().join(",") !==
              oldSubjects.sort().join(",")
            ) {
              groupEntity.criteria.subjects = await this.createOrFetchSubjects(
                subjectsToCheck
              ).catch((ex) => {
                if (ex instanceof HttpException) throw ex;
                throw new HttpException("Database connection lost", 500);
              });
            }
          }
        }
        return groupEntity;
      })
      .then((entity) => {
        return this.groupRepo.save(entity);
      })
      .then(async (savedEntity) => {
        return await groupEntityToDto(savedEntity);
      })
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        throw new HttpException("Database connection lost", 500);
      });
  }

  // Testet manuelt, virker som den skal
  async deleteGroup(groupId: string): Promise<boolean> {
    if (!groupId)
      throw new HttpException(
        "No groupId found. Expected {\ngroupId: id\n}",
        400
      );

    return await this.groupRepo
      .findOneBy({ uuid: groupId })
      .then((group) => {
        if (!group)
          throw new HttpException("Group not found, deletion failed", 400);
        return group;
      })
      .then(async (group) => {
        await this.chatMessageRepo
          .delete({
            group: { uuid: group.uuid },
          })
          .then((delRes) => {
            if (!delRes)
              Logger.info("Chat Message Repo", "No chat messages to delete");
            Logger.info(
              "Chat Message Repo",
              `${delRes.affected} message(s) deleted`
            );
          });
        const users = await group.users;
        if (!users)
          throw new HttpException(
            "Group members not found, database error",
            500
          );
        return await this.groupMemberRepo.remove(users);
      })
      .then((delRes) => {
        if (!delRes) {
          throw new HttpException("Deletion of members failed", 500);
        }
        return;
      })
      .then(async () => {
        return await this.groupRepo.delete({ uuid: groupId });
      })
      .then((result) => {
        if (!result.affected || result.affected == 0)
          throw new HttpException("Deletion of group failed", 400);
        return true;
      })
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        Logger.error("GroupService", ex);
        throw new HttpException("Database connection lost", 500);
      });
  }

  // Testet manuelt, virker som den skal
  async searchGroup(
    searchDto: CriteriaDto,
    groupName?: string
  ): Promise<searchResult> {
    if (!searchDto) throw new HttpException("No searchDto provided", 400);
    return await this.fetchAllGroups(groupName)
      .then((groupDtoArray) => {
        const resultArray: any[] = [];

        // Bruker vanlig for-loop for effektivitet
        for (let i = 0; i < groupDtoArray.length; i++) {
          let score = 0;

          score = checkGradeGoal(groupDtoArray[i], score);
          score = checkWorkFrequency(groupDtoArray[i], score);
          score = checkWorkMethod(groupDtoArray[i], score);
          score = checkSize(groupDtoArray[i], score);
          score = checkLanguage(groupDtoArray[i], score);
          score = checkLocation(groupDtoArray[i], score);
          score = checkSchool(groupDtoArray[i], score);
          score = checkSubjects(groupDtoArray[i], score);

          // Tar høyde for avrundingsfeil
          if (score > 100) score = 100;

          // Avrunder til nærmeste hele
          score = Math.round(score);

          resultArray.push([groupDtoArray[i], score]);
        }

        resultArray.sort((a, b) => b[1] - a[1]).slice(0, 20);

        const resultObject: searchResult = {};

        resultArray.forEach((element) => {
          resultObject[element[0].uuid] = {
            group: element[0],
            score: element[1],
          };
        });

        return resultObject;
      })
      .catch((ex) => {
        throw ex;
      });

    // Regner denne delen som ferdig
    function checkGradeGoal(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.GRADE_GOAL /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );

      switch (searchDto.gradeGoal) {
        case GradeGoal.A:
          if (group.criteria.gradeGoal === GradeGoal.A) {
            score = score + full;
          } else if (group.criteria.gradeGoal === GradeGoal.B) {
            score = score + full / 2;
          }
          break;
        case GradeGoal.B:
          if (group.criteria.gradeGoal === GradeGoal.B) {
            score = score + full;
          } else if (
            group.criteria.gradeGoal === GradeGoal.A ||
            group.criteria.gradeGoal === GradeGoal.C
          ) {
            score = score + full / 2;
          }
          break;
        case GradeGoal.C:
          if (group.criteria.gradeGoal === GradeGoal.C) {
            score = score + full;
          } else if (
            group.criteria.gradeGoal === GradeGoal.B ||
            group.criteria.gradeGoal === GradeGoal.D
          ) {
            score = score + full / 2;
          }
          break;
        case GradeGoal.D:
          if (group.criteria.gradeGoal === GradeGoal.D) {
            score = score + full;
          } else if (
            group.criteria.gradeGoal === GradeGoal.C ||
            group.criteria.gradeGoal === GradeGoal.PASS
          ) {
            score = score + full / 2;
          }
          break;
        case GradeGoal.PASS:
          if (group.criteria.gradeGoal === GradeGoal.PASS) {
            score = score + full;
          } else if (group.criteria.gradeGoal === GradeGoal.D) {
            score = score + full / 2;
          }
      }

      return score;
    }

    // Regner denne delen som ferdig
    function checkWorkFrequency(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.WORK_FREQUENCY /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );
      if (group.criteria.workFrequency === searchDto.workFrequency) {
        score = score + full;
      } else if (
        searchDto.workFrequency === WorkFrequency.ANY ||
        group.criteria.workFrequency === WorkFrequency.ANY
      ) {
        score = score + full / 2;
      }
      return score;
    }

    // Regner denne delen som ferdig
    function checkWorkMethod(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.WORK_TYPE /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );
      if (group.criteria.workType === searchDto.workType) {
        score = score + full;
      } else if (
        searchDto.workType === WorkType.ANY ||
        group.criteria.workType === WorkType.ANY
      ) {
        score = score + full / 2;
      }
      return score;
    }

    // Regner denne delen som ferdig
    function checkSize(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.MAX_SIZE /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );
      if (group.criteria.maxSize === searchDto.maxSize) {
        score = score + full;
      } else if (
        searchDto.maxSize === MaxSize.ANY ||
        group.criteria.maxSize === MaxSize.ANY
      ) {
        score = score + full / 2;
      }
      return score;
    }

    // Regner denne delen som ferdig
    function checkLanguage(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.LANGUAGE /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );
      if (group.criteria.language === searchDto.language) {
        score = score + full;
      } else if (
        !searchDto.language ||
        searchDto.language === "" ||
        group.criteria.language === ""
      ) {
        score = score + full / 2;
      }
      return score;
    }

    // Regner denne delen som ferdig
    function checkLocation(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.LOCATION /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );
      if (group.criteria.location === searchDto.location) {
        score = score + full;
      } else if (
        !searchDto.location ||
        searchDto.location === "" ||
        group.criteria.location === ""
      ) {
        score = score + full / 2;
      }
      return score;
    }

    // Regner denne delen som ferdig
    function checkSchool(group: GroupOutDto, score: number) {
      const full = Math.round(
        SearchWeightValues.SCHOOL /
          (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
      );
      if (group.criteria.school === searchDto.school) {
        score = score + full;
      } else if (
        !searchDto.school ||
        searchDto.school === "" ||
        group.criteria.school === "Ikke satt"
      ) {
        score = score + full / 2;
      }
      return score;
    }

    // Regner denne delen som ferdig
    function checkSubjects(group: GroupOutDto, score: number) {
      if (searchDto.subjects) {
        const numberOfSubjects = searchDto.subjects.length;
        const scorePerSubject =
          Math.round(
            SearchWeightValues.SUBJECTS /
              (SearchWeightValues.MAX_POSSIBLE_SCORE / 100)
          ) / numberOfSubjects;
        searchDto.subjects.forEach((sub) => {
          if (group.criteria.subjects) {
            if (group.criteria.subjects.includes(sub)) {
              score = score + scorePerSubject;
            }
          }
        });
      }
      return score;
    }
  }

  // Testet manuelt gjennom andre metoder, fungerer
  private async createOrFetchSubjects(
    subjects: SubjectEntity[]
  ): Promise<SubjectEntity[]> {
    return await Promise.all(
      subjects.map(async (subject) => {
        return await this.subjectRepo
          .findOneBy({ name: subject.name })
          .then(async (foundSubject) => {
            if (!foundSubject) {
              return await this.subjectRepo
                .save(subject)
                .then((savedSubject) => savedSubject);
            }
            return foundSubject;
          });
      })
    );
  }

  // Virker som den skal, ifølge deleteMember og addMember
  private async fetchUserAndGroup(userId: string, groupId: string) {
    return await this.userRepo
      .findOneBy({ uuid: userId })
      .then((foundUser) => {
        if (!foundUser) throw new HttpException("User not found", 404);
        return foundUser;
      })
      .then((foundUser) => {
        return this.groupRepo
          .findOneBy({ uuid: groupId })
          .then((foundGroup) => {
            if (!foundGroup) throw new HttpException("Group not found", 404);
            return { foundUser, foundGroup };
          });
      })
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        throw ex;
      });
  }

  // Testet manuelt gjennom andre metoder
  private async createOrFetchSubjectsAndSchool(
    school: SchoolEntity,
    subjects?: SubjectEntity[]
  ) {
    if (subjects) {
      subjects = await this.createOrFetchSubjects(subjects).catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        Logger.error(
          "create_or_fetch_sub_school",
          (ex as QueryFailedError).message
        );
        throw new HttpException("Database connection lost", 500);
      });
    }
    school = await this.createOrFetchSchool(school);
    return { subjects, school };
  }

  // Testet manuelt gjennom andre metoder
  private async createOrFetchSchool(school: SchoolEntity) {
    return await this.schoolRepo
      .findOneBy({ name: school.name })
      .then(async (foundSchool) => {
        if (!foundSchool) {
          return this.schoolRepo.save(school).then((savedSchool) => {
            return savedSchool;
          });
        }
        return foundSchool;
      })
      .catch((ex) => {
        if (ex instanceof HttpException) throw ex;
        throw new HttpException("Database connection lost", 500);
      });
  }

  // Testet manuelt gjennom andre metoder
  private async _saveGroupCriteria(criteria: CriteriaEntity) {
    try {
      return await this.criteriaRepo.save(criteria);
    } catch (e) {
      if (queryFailedGuard(e)) {
        throw new HttpException(e.message, 500);
      } else throw new HttpException("Something went wrong!", 500);
    }
  }

  private async _saveGroupMemberEntity(
    groupEntityRes: GroupEntity | undefined,
    admin: UserEntity
  ) {
    const groupMemberEntity = new GroupMemberEntity();

    if (groupEntityRes) {
      groupMemberEntity.group = groupEntityRes;
      groupMemberEntity.user = admin;
      groupMemberEntity.is_admin = true;
      await this.groupMemberRepo.save(groupMemberEntity).catch((ex) => {
        console.error(ex);
        throw ex;
      });
    } else throw new HttpException("Could not store the group", 500);
  }

  private async _saveGroupEntity(
    groupCriteria: CriteriaEntity,
    groupEntity: GroupEntity
  ) {
    if (groupCriteria) {
      try {
        return await this.groupRepo.save(groupEntity);
      } catch (e: unknown) {
        if (queryFailedGuard(e)) {
          throw new HttpException(e.message, 500);
        }
      }
    } else throw new HttpException("Could not store the criterias!", 500);
  }

  private async _getGroupById(uuid: string) {
    try {
      return await this.groupRepo.findOneBy({ uuid: uuid });
    } catch (e) {
      if (queryFailedGuard(e)) {
        throw new HttpException(e.message, 500);
      }
      throw new HttpException("Something went wrong", 500);
    }
  }

  private async findGroupByName(groupName: string): Promise<GroupOutDto[]> {
    let groups: GroupEntity[];
    try {
      groups = await this.groupRepo.findBy({
        name: Like(`%${groupName}%`),
        isPrivate: false,
      });
    } catch (e) {
      if (queryFailedGuard(e)) {
        throw new HttpException(e.message, 500);
      } else throw e;
    }
    if (groups.length === 0)
      throw new HttpException("No matching group(s)", 204);
    return Promise.all(groups.map((group) => groupEntityToDto(group)));
  }
}
