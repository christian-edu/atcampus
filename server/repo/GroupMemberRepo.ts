import { AppDataSource } from "../server";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";

export const GroupMemberRepo = AppDataSource.getRepository(
  GroupMemberEntity
).extend({
  // custom metoder settes her
});
