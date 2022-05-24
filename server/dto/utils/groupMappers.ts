import { GroupEntity } from "../../entity/GroupEntity";
import { criteriaDtoToEntity, criteriaEntityToDto } from "./criteriaMappers";
import { memberEntityToDto_user } from "./memberMappers";
import { GroupInDto, GroupOutDto } from "../GroupInOutDto";
import { UserEntity } from "../../entity/UserEntity";
import { GroupMemberEntity } from "../../entity/GroupMemberEntity";

export function groupEntityToDto(entity: GroupEntity): GroupOutDto {
  const members = entity.users.map((entity) => {
    return memberEntityToDto_user(entity);
  });

  return new GroupOutDto(
    entity.uuid,
    entity.isPrivate,
    entity.name,
    criteriaEntityToDto(entity.criteria),
    members,
    entity.rules
  );
}

export function newGroupEntityFromDto(dto: GroupInDto, admin: UserEntity) {
  const initialMember = new GroupMemberEntity();
  initialMember.user = admin;
  initialMember.is_admin = true;

  const newGroup = new GroupEntity(
    dto.name,
    criteriaDtoToEntity(dto.criteria),
    dto.isPrivate,
    [initialMember],
    dto.rules
  );

  initialMember.group = newGroup;

  return newGroup;
}
