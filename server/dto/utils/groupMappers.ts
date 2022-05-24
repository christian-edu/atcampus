import { GroupEntity } from "../../entity/GroupEntity";
import { criteriaDtoToEntity, criteriaEntityToDto } from "./criteriaMappers";
import { memberEntityToDto_user } from "./memberMappers";
import { GroupInDto, GroupOutDto } from "../GroupInOutDto";
import { UserEntity } from "../../entity/UserEntity";
import { GroupMemberEntity } from "../../entity/GroupMemberEntity";
import { GroupMemberDto_user } from "../groupMemberDto";
import HttpException from "../../util/httpException";

export async function groupEntityToDto(
  entity: GroupEntity
): Promise<GroupOutDto> {
  let members: GroupMemberDto_user[];
  const fetchedUsers = await entity.users
    ?.then((it) => {
      if (!it) throw new HttpException("Users not found", 404);
      return it;
    })
    .catch((ex) => {
      if (ex instanceof HttpException) throw ex;
      throw new HttpException("Database error occurred", 500);
    });
  if (fetchedUsers !== undefined) {
    members = fetchedUsers.map((entity) => {
      return memberEntityToDto_user(entity);
    });
  } else {
    throw new HttpException("Database error occurred", 500);
  }

  return new GroupOutDto(
    entity.uuid,
    entity.isPrivate,
    entity.name,
    criteriaEntityToDto(entity.criteria),
    members,
    entity.rules
  );
}

export function newGroupEntityFromDto(dto: GroupInDto /*, admin: UserEntity*/) {
  // const initialMember = new GroupMemberEntity();
  // initialMember.user = admin;
  // initialMember.is_admin = true;

  const newGroup = new GroupEntity(
    dto.name,
    criteriaDtoToEntity(dto.criteria),
    dto.isPrivate,
    // [initialMember],
    dto.rules
  );

  // initialMember.group = newGroup;

  return newGroup;
}
