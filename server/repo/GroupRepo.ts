import { AppDataSource } from "../server";
import { GroupEntity } from "../entity/GroupEntity";

export const GroupRepo = AppDataSource.getRepository(GroupEntity).extend({
  // custom metoder settes her
});
