import { GroupEntity } from "../../entity/GroupEntity";
import { GroupDto } from "../groupDto";
import { criteriaDtoToEntity, criteriaEntityToDto } from "./criteriaMappers";
import { memberDtoToEntity, memberEntityToDto } from "./memberMappers";

export function groupEntityToDto(entity: GroupEntity): GroupDto {
  const members = entity.users.map((entity) => {
    return memberEntityToDto(entity);
  });

  return new GroupDto(
    entity.isPrivate,
    entity.name,
    criteriaEntityToDto(entity.criteria),
    members,
    entity.rules,
    entity.uuid
  );
}

export function groupDtoToEntity(dto: GroupDto): GroupEntity {
  const members = dto.groupMembers.map((member) => {
    return memberDtoToEntity(member);
  });

  return new GroupEntity(
    dto.name,
    criteriaDtoToEntity(dto.criteria),
    dto.isPrivate,
    members,
    dto.rules,
    dto.uuid
  );
}
