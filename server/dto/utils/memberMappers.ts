import { GroupMemberEntity } from "../../entity/GroupMemberEntity";
import { GroupMemberDto } from "../groupMemberDto";
import { userEntityToDto } from "./userMappers";
import { groupEntityToDto } from "./groupMappers";

export function memberEntityToDto(entity: GroupMemberEntity): GroupMemberDto {
  return new GroupMemberDto(
    userEntityToDto(entity.user),
    groupEntityToDto(entity.group),
    entity.is_admin
  );
}