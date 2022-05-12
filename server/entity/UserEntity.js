import { EntitySchema } from "typeorm";
import { SchoolEntity } from "./SchoolEntity.js";
import { GroupMemberEntity } from "./GroupMemberEntity.js";

export const UserEntity = new EntitySchema({
  name: "UserEntity",
  tableName: "user",
  columns: {
    uuid: {
      type: "uuid",
      primary: true,
      generated: true,
    },
    username: {
      type: "string",
      nullable: false,
      unique: true,
    },
    email: {
      type: "string",
      email: true,
      nullable: false,
    },
    password: {
      type: "string",
      nullable: false,
    },
    first_name: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
  },
  relations: {
    school: {
      target: SchoolEntity,
      type: "many-to-one",
      cascade: false,
    },
    groups: {
      target: GroupMemberEntity,
      type: "one-to-many",
    },
  },
});
