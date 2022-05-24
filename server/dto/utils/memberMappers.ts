import { GroupMemberEntity } from "../../entity/GroupMemberEntity";
import {
  GroupMemberDto_both,
  GroupMemberDto_group,
  GroupMemberDto_user,
} from "../groupMemberDto";

export function memberEntityToDto_both(
  entity: GroupMemberEntity
): GroupMemberDto_both {
  return new GroupMemberDto_both(
    entity.user.uuid,
    entity.user.userName,
    entity.group.uuid,
    entity.group.name,
    entity.is_admin
  );
}

export function memberEntityToDto_user(
  entity: GroupMemberEntity
): GroupMemberDto_user {
  return new GroupMemberDto_user(
    entity.user.uuid,
    entity.user.userName,
    entity.is_admin
  );
}

export function memberEntityToDto_group(
  entity: GroupMemberEntity
): GroupMemberDto_group {
  return new GroupMemberDto_group(
    entity.group.uuid,
    entity.group.name,
    entity.is_admin
  );
}
