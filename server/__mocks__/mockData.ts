import { GradeGoal } from "../entity/enums/GradeGoal";
import { UserEntity } from "../entity/UserEntity";
import { CriteriaEntity } from "../entity/CriteriaEntity";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";
import { SubjectEntity } from "../entity/SubjectEntity";
import { SchoolEntity } from "../entity/SchoolEntity";
import { GroupEntity } from "../entity/GroupEntity";
import { GroupInDto, GroupOutDto } from "../dto/GroupInOutDto";
import { CriteriaDto } from "../dto/criteriaDto";
import { MaxSize } from "../entity/enums/MaxSize";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import { UserOutDto } from "../dto/UserInOutDto";
import { criteriaEntityToDto } from "../dto/utils/criteriaMappers";
import { GroupMemberDtoUser } from "../dto/groupMemberDto";

export const userEntitiesWithoutGroups = () => {
  const jimbob = new UserEntity("jimbob", "jim@bob.com", "password");
  const joebob = new UserEntity("joebob", "joe@bob.com", "password");
  jimbob.uuid = "1";
  joebob.uuid = "2";

  return [jimbob, joebob];
};

export const userDTOs = [
  new UserOutDto("1", "jimbob", "jim@bob.com"),
  new UserOutDto("2", "joebob", "joe@bob.com"),
];

export const criteriaDtos = [
  new CriteriaDto(GradeGoal.A, WorkFrequency.W1, "Norsk", MaxSize.ANY),
];

export const groupDTOs = [
  new GroupOutDto(
    "1",
    false,
    "A group",
    criteriaDtos[0],
    [new GroupMemberDtoUser("1", "jimbob", true)],
    "Anarchy"
  ),
];

export const userEntitiesWithGroups = () => {
  const users = userEntitiesWithoutGroups();
  users[0].groups = Promise.all([groupMemberEntities()[0]]);
  users[1].groups = Promise.all([groupMemberEntities()[1]]);

  return [users[0], users[1]];
};
export const subjectEntities = [new SubjectEntity("PG2000")];
export const schoolEntities = [new SchoolEntity("HK")];
export const criteriaEntities = [
  new CriteriaEntity(
    GradeGoal.A,
    WorkFrequency.W1,
    WorkType.HYBRID,
    MaxSize.ANY,
    "Norsk",
    "Oslo",
    schoolEntities[0],
    [subjectEntities[0]]
  ),
];

export const groupMemberEntities = () => {
  const members1 = new GroupMemberEntity();
  members1.user = userEntitiesWithoutGroups()[0];
  members1.group = groupEntitiesWithoutUsers()[0];
  members1.is_admin = true;
  members1.uuid = "1";

  const members2 = new GroupMemberEntity();
  members2.user = userEntitiesWithoutGroups()[1];
  members2.group = groupEntitiesWithoutUsers()[0];
  members2.is_admin = false;
  members2.uuid = "2";

  return [members1, members2];
};

export const groupEntitiesWithoutUsers = () => {
  return [
    new GroupEntity("A group", criteriaEntities[0], false, "Anarchy", "1"),
  ];
};

export const groupEntitiesWithUsers = () => {
  const group1 = groupEntitiesWithoutUsers()[0];
  group1.users = Promise.all(groupMemberEntities());
  return [group1];
};

export const groupInDtos = [
  new GroupInDto(false, "A group", criteriaDtos[0], "No rules", "1"),
];
