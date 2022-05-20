import { GroupMemberEntity } from "../../entity/GroupMemberEntity";
import { GroupMemberDto } from "../groupMemberDto";
import { userDtoToEntity, userEntityToDto } from "./userMappers";
import { groupDtoToEntity, groupEntityToDto } from "./groupMappers";

export function memberEntityToDto(entity: GroupMemberEntity): GroupMemberDto {
  return new GroupMemberDto(
    userEntityToDto(entity.user),
    groupEntityToDto(entity.group),
    entity.is_admin,
    entity.uuid
  );
}

export function memberDtoToEntity(dto: GroupMemberDto): GroupMemberEntity {
  return new GroupMemberEntity(
    userDtoToEntity(dto.user),
    groupDtoToEntity(dto.group),
    dto.isAdmin,
    dto.uuid
  );
}
