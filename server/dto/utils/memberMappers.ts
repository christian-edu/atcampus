import { GroupMemberEntity } from "../../entity/GroupMemberEntity";
import {
  GroupMemberDtoBoth,
  GroupMemberDtoGroup,
  GroupMemberDtoUser,
} from "../groupMemberDto";

export function memberEntityToDto_both(
  entity: GroupMemberEntity
): GroupMemberDtoBoth {
  return new GroupMemberDtoBoth(
    entity.user.uuid,
    entity.user.userName,
    entity.group.uuid,
    entity.group.name,
    entity.is_admin
  );
}

export function memberEntityToDto_user(
  entity: GroupMemberEntity
): GroupMemberDtoUser {
  return new GroupMemberDtoUser(
    entity.user.uuid,
    entity.user.userName,
    entity.is_admin
  );
}

export function memberEntityToDto_group(
  entity: GroupMemberEntity
): GroupMemberDtoGroup {
  return new GroupMemberDtoGroup(
    entity.group.uuid,
    entity.group.name,
    entity.is_admin
  );
}
