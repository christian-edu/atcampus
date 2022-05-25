import { GroupDto } from "../dto/groupDto";
import { CriteriaDto } from "../dto/criteriaDto";
import { UserDto } from "../dto/userDto";
import { GroupMemberDto } from "../dto/groupMemberDto";
import { GradeGoal } from "../entity/enums/GradeGoal";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";

export const users = [
  new UserDto("Christian", "Gregersen", "chgr", "chgr007@egms.no", "drowssap"),
  new UserDto("Roman", "Morso", "romo", "roman@morso.no", "drowssap"),
];

export const groups = [
  new GroupDto(
    true,
    "Groyp",
    new CriteriaDto(
      GradeGoal.A,
      WorkFrequency.W1,
      "Norsk",
      8,
      "Oslo",
      ["PG2351"],
      WorkType.HYBRID,
      "HK"
    ),
    "Rules"
  ),
];

export const groupMembers = [
  new GroupMemberDto(users[0], groups[0], true),
  new GroupMemberDto(users[1], groups[0], false),
];
