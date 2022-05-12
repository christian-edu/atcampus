import { EntitySchema } from "typeorm";
import { UserEntity } from "./UserEntity.js";
import { GroupEntity } from "./GroupEntity.js";

export const GroupMemberEntity = new EntitySchema({
  name: "GroupMemberEntity",
  tableName: "group_member",
  columns: {
    uuid: {
      primary: true,
      type: "string",
      nullable: false,
    },
    user_uuid: {
      type: "string",
      nullable: false,
    },
    group_uuid: {
      type: "string",
      nullable: false,
    },
    is_admin: {
      type: "boolean",
      nullable: false,
    },
  },
  relations: {
    users: {
      target: UserEntity,
      type: "many-to-one",
      cascade: false,
    },
    groups: {
      target: GroupEntity,
      type: "many-to-one",
      cascade: false,
    },
  },
});
