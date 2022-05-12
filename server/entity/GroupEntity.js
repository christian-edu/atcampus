import { EntitySchema } from "typeorm";
import { CriteriaEntity } from "./CriteriaEntity.js";
import { GroupMemberEntity } from "./GroupMemberEntity.js";

export const GroupEntity = new EntitySchema({
  name: "GroupEntity",
  tableName: "group",
  columns: {
    uuid: {
      primary: true,
      type: "uuid",
      generated: true,
    },
    name: {
      type: "string",
      nullable: false, // kan kanskje være NULL før man får mer enn ett medlem?
      unique: true, // ...men da blir dette et problem
    },
    open_for_membership: {
      type: "bool",
      default: true,
      nullable: false,
    },
    public: {
      type: "bool",
      nullable: false,
    },
  },
  relations: {
    group_members: {
      target: GroupMemberEntity,
      type: "one-to-many",
      cascade: true,
      // joinColumn: "user_uuid",
    },
    group_requests: {
      target: "group_request",
      type: "one-to-many",
      cascade: true,
    },
    criteria: {
      target: CriteriaEntity,
      type: "one-to-one",
      cascade: true,
      // joinColumn: "uuid",
    },
  },
});
